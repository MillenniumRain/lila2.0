import React, { ReactNode, useEffect, useState } from 'react';
import Popup from '../common/Popup';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { gameSlice } from '../store/reducers/GameSlice';
import { interfaceSlice } from '../store/reducers/InterfaceSlice';

interface HistoryPopupProp {
	children?: ReactNode;
}
const HistoryPopup = ({}: HistoryPopupProp) => {
	const id = useAppSelector((state) => state.game.id);
	const players = useAppSelector((state) => state.game.players);
	const gameMap = useAppSelector((state) => state.game.gameMap);
	const activePlayerId = useAppSelector((state) => state.interface.activePlayerId);
	const index = players.findIndex((player) => player.id == (activePlayerId || id));
	const history = players[index].history || { list: [], maxId: 1 };

	const [visibleInput, setVisibleInput] = useState(false);
	const [purpose, setPurpose] = useState(players[index].purpose);

	const dispatch = useAppDispatch();

	let input = [];
	const output = [];
	const count = 10;

	for (let i = 0; i < Math.ceil(history.list.length / count); i++) {
		input.push(
			<div className='flex flex-col ' key={-1}>
				<div className={`border border-slate-200 flex py-1 px-1 justify-center items-center`}>№ поля</div>{' '}
				<div className={`border border-slate-200 flex py-1 px-1  justify-center items-center`}>№ позиции</div>
			</div>
		);
		for (let ii = 0; ii < count; ii++) {
			const number = ii + count * i;
			const thought = history.list[number];

			if (thought) {
				input.push(
					<div
						className='flex flex-col cursor-pointer group hover:opacity-80'
						style={{ background: gameMap[thought.cardId || 0].bg + 'cf' }}
						onClick={() => {
							dispatch(
								interfaceSlice.actions.setThoughtsPopup({
									visible: true,
									activeCard: thought.cardId,
									pickedIdThought: thought.id,
								})
							);
						}}
						key={thought.id}>
						<div className='border border-slate-200 flex py-1 px-4 min-w-[52px] justify-center items-center '>
							{thought.cardId}
						</div>
						<div className='border border-slate-200 flex py-1 px-4   min-w-[52px] justify-center items-center '>
							{thought.thoughtId}&nbsp;
						</div>
					</div>
				);
			} else {
				break;
			}
		}
		output.push(
			<div className='flex mb-2' key={i + 'o'}>
				{input}
			</div>
		);
		input = [];
	}

	return (
		<div className=''>
			<Popup
				onClose={() => {
					dispatch(interfaceSlice.actions.setHistoryPopup({ visible: false }));
				}}>
				<div className='bg-white  w-[800px] h-2/3 z-10 py-10 px-20 overflow-x-auto'>
					<div className=''>
						<div
							className={`px-2 py-1 mb-2 text-lg  ${
								!visibleInput && 'hover:bg-slate-200'
							} cursor-pointer group flex justify-between items-center`}
							onClick={() => {
								setVisibleInput(true);
							}}>
							<div className=''>
								<span className='font-bold mr-2'>Цель:</span>
								{!visibleInput && purpose}
							</div>
							{visibleInput ? (
								<form
									className='w-full flex'
									onSubmit={(e) => {
										e.preventDefault();

										setVisibleInput(false);
										setPurpose(purpose);
										dispatch(gameSlice.actions.setPurpose(purpose));
									}}>
									<input
										value={purpose}
										onChange={(e) => {
											setPurpose(e.target.value);
										}}
										autoFocus
										type='text'
										className='w-full border-b-2 focus:outline-none focus:border-green-500 mr-2'
									/>
									<button
										type='submit'
										className='px-2 flex items-center text-green-500  border-2 border-green-500 mr-1 hover:text-black hover:bg-green-500 font-bold'>
										OK
									</button>
								</form>
							) : (
								<span className=' opacity-0 text-slate-500 font-normal text-sm group-hover:opacity-100'>
									изменить
								</span>
							)}
						</div>

						{<div className=' px-2 text-lg font-bold mb-2'>История</div>}
						{output.length === 0 ? <div className='px-2'>Истории нет</div> : output}
					</div>
				</div>
			</Popup>
		</div>
	);
};

export default HistoryPopup;
