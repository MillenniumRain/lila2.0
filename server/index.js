const { json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
const WServer = require('express-ws')(app);
const aWss = WServer.getWss();

const PORT = process.env.PORT || 5000;
const password = 'ec5ea8ada90cdfb2c4d6cfded6b804e0';
const sessions = {};
app.ws('/', (ws, req) => {
	ws.on('close', (msg) => {
		let { player, index } = findPlayer(ws);
		if (player) {
			player.disconnected = true;
			if (player.turn /*&& aWss.clients.size > 1*/) {
				let size = 0;
				aWss.clients.forEach((client) => {
					if (client.sessionId == ws.sessionId) {
						size++;
					}
				});
				if (size > 1) {
					sessions[ws.sessionId].players.forEach((player) => {
						player.turn = false;
					});

					index = checkNextPLayer(ws, index);
					if (index >= 0) {
						sessions[ws.sessionId].players[index].turn = true;
					}
				}
			}
			broadcastUpdate(ws);
		}
	});

	ws.on('message', async (msg) => {
		msg = JSON.parse(msg);
		switch (msg.method) {
			case 'connect': {
				let gameMaster = false;
				if (msg.password) {
					if (msg.password != password) {
						ws.send(
							JSON.stringify({
								message: 'Неправильный пароль',
								method: 'authasmaster',
								correct: false,
							})
						);
						return ws.close();
					} else {
						ws.send(
							JSON.stringify({
								message: 'Авторизован',
								method: 'authasmaster',
								correct: true,
							})
						);
						gameMaster = true;
					}
				}
				ws.sessionId = msg.sessionId;
				if (!sessions[ws.sessionId]) {
					let fileContent;
					try {
						if (fs.existsSync(`./sessions/${ws.sessionId}.txt`)) {
							fileContent = JSON.parse(fs.readFileSync(`./sessions/${ws.sessionId}.txt`, 'utf8'));
						}
					} catch (error) {}
					if (!fileContent) {
						fileContent = { players: [] };
					}
					sessions[ws.sessionId] = fileContent;
				}
				const session = sessions[ws.sessionId];
				const index = session.players.findIndex((player) => player.id == msg.lastGamePlayer?.id);
				if (index == -1) {
					const playerId = createNewPLayer(session, msg.initialPLayer, gameMaster);
					ws.id = playerId;
					ws.send(
						JSON.stringify({
							message: 'Создан новый игрок',
							method: 'connected',
							playerId: playerId,
							players: session.players,
						})
					);
				} else {
					ws.id = msg.lastGamePlayer.id;
				}
				const { player } = findPlayer(ws);
				if (!checkTurn(ws)) {
					player.turn = true;
				}
				if (player.master) {
					if (player.ignored) {
						player.turn = false;
					}
					ws.send(
						JSON.stringify({
							message: 'Авторизован',
							method: 'authasmaster',
							correct: true,
						})
					);
				}
				player.disconnected = false;
				break;
			}
			case 'setposition_history': {
				const { player } = findPlayer(ws, msg.playerId);
				player.position = msg.position;
				if (msg.playerId == ws.id) {
					const lastId = player.history.lastId;
					player.history.list.push({
						id: lastId + 1,
						cardId: msg.history.cardId,
						thoughtId: msg.history.thoughtId,
					});
					player.history.lastId = lastId + 1;
				} else {
				}

				break;
			}
			case 'setthought': {
				let { player } = findPlayer(ws, msg.playerId);
				const id = msg.history.id || player.history.lastId;
				const history = player.history.list.find((thought) => thought.id === id);
				if (history) history.thoughtId = msg.history.thoughtId;
				break;
			}
			case 'setdice': {
				const { player } = findPlayer(ws);
				player.dice = msg.dice;
				player.disconnected = false;
				break;
			}

			case 'completemove': {
				let { player, index } = findPlayer(ws);
				player.disconnected = false;
				sessions[ws.sessionId].players.forEach((player) => {
					player.turn = false;
					player.dice = null;
				});

				index = checkNextPLayer(ws, index);
				if (index >= 0) {
					sessions[ws.sessionId].players[index].turn = true;
				}
				break;
			}
			case 'setturn': {
				let { player } = findPlayer(ws, msg.playerId);
				// player.disconnected = false;
				sessions[ws.sessionId].players.forEach((player) => {
					player.turn = false;
					player.dice = null;
				});
				player.turn = true;
				break;
			}
			case 'mastersetname': {
				let { player } = findPlayer(ws, msg.playerId);
				player.name = msg.name;
				break;
			}
			case 'mastersetnewgame': {
				let { player } = findPlayer(ws, msg.playerId);
				player.position = 0;
				player.history = { lastId: 0, list: [] };
				player.purpose = '';
				player.dice = null;
				break;
			}
			case 'mastersetignore': {
				const { player, index } = findPlayer(ws, msg.playerId);
				player.ignored = msg.ignored;
				player.turn = false;

				break;
			}
			case 'mastersetdisappointments': {
				const { player, index } = findPlayer(ws, msg.playerId);
				player.disappointments = msg.disappointments;

				break;
			}
			case 'masterdeletethought': {
				const { player, index } = findPlayer(ws, msg.playerId);
				const indexTh = player?.history?.list?.findIndex((thought) => thought.id == msg.thoughtId);
				player.history.list.splice(indexTh, 1);
				break;
			}
			case 'setpurpose': {
				const { player } = findPlayer(ws, msg.playerId);
				player.purpose = msg.purpose;
				break;
			}
		}

		broadcastUpdate(ws, msg);
	});
});

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
const checkTurn = (ws) => {
	let flag = false;
	aWss.clients.forEach((client) => {
		if (client.sessionId == ws.sessionId) {
			const { player } = findPlayer(client);
			if (player.turn) flag = true;
		}
	});
	return flag;
};
const findPlayer = (ws, id = '') => {
	const playerId = id || ws.id;
	const index = sessions[ws.sessionId]?.players?.findIndex((player) => player.id == playerId);
	return { player: sessions[ws.sessionId]?.players[index], index };
};
const checkNextPLayer = (ws, index = 0, loops = 0) => {
	if (index >= sessions[ws.sessionId]?.players?.length - 1) {
		index = -1;
	}
	index += 1;
	if (
		!sessions[ws.sessionId]?.players[index]?.disconnected &&
		!sessions[ws.sessionId]?.players[index]?.ignored &&
		!sessions[ws.sessionId]?.players[index]?.winner
	) {
		return index;
	}
	if (loops >= 2) return null;

	return checkNextPLayer(ws, index, loops + 1);
};
const createNewPLayer = (session, initialPlayer, gameMaster) => {
	const id = `${initialPlayer.name.trim()}${(+new Date()).toString(16)}`;
	let turn = session.players.length == 0 ? true : false;
	if (gameMaster) {
		turn = false;
	}
	session.players.push({
		...initialPlayer,
		id: id,
		turn,
		ignored: gameMaster,
		master: gameMaster,
	});
	return id;
};
const broadcastUpdate = (ws) => {
	aWss.clients.forEach((client) => {
		if (client.sessionId == ws.sessionId) {
			const { player } = findPlayer(ws, client.id);
			player.disconnected = client.readyState == client.CLOSED;
			client.send(
				JSON.stringify({
					message: 'Обновление списка игроков',
					method: 'update',
					playerId: client.id,
					players: sessions[ws.sessionId].players,
				})
			);
		}
	});
	const output = JSON.stringify(sessions[ws.sessionId], false, 3);
	let buffer = new Buffer.from(output);
	fs.writeFileSync(`./sessions/${ws.sessionId}.txt`, buffer);
};
