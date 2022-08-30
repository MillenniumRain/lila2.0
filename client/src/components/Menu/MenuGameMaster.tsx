import React, { forwardRef, ReactNode, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { gameSlice, IPlayer } from '../../store/reducers/GameSlice';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';

interface MenuGameMasterProp {
	children?: ReactNode;
	player: IPlayer;
	current: HTMLDivElement | null;
}

const MenuGameMaster = forwardRef<HTMLDivElement, MenuGameMasterProp>(({ player, current }, ref) => {
	const dispatch = useAppDispatch();
	const [inputName, setInputName] = useState(player.name || '');
	const masterMoveId = useAppSelector((state) => state.game.masterMoveId);
	const [visibleInput, setVisibleInput] = useState(false);
	// const [disappointment, setDisappointment] = useState(0);
	return (
		<div ref={ref} className='flex flex-col bg-black/70  h-[0] transition-all  overflow-hidden text-sm select-none'>
			<div
				className='px-2 py-1 text-white hover:opacity-50 cursor-pointer'
				onClick={() => {
					dispatch(interfaceSlice.actions.setActivePlayerId(player.id));
					dispatch(interfaceSlice.actions.setHistoryPopup({ visible: true }));
					current && current.classList.remove('active');
				}}>
				Посмотреть историю
			</div>
			<div
				className={`px-2 py-1  hover:opacity-50 cursor-pointer ${
					masterMoveId === player.id ? 'text-green-500' : 'text-white'
				}`}
				onClick={() => {
					let id = player.id;
					if (masterMoveId === player.id) {
						id = '';
					}
					if (masterMoveId && masterMoveId !== player.id) {
						id = player.id;
					}
					dispatch(gameSlice.actions.setMasterMovePlayer(id));
				}}>
				Передвинуть
			</div>
			<div
				className='px-2 py-1 text-white hover:opacity-50 cursor-pointer'
				onClick={() => {
					player.id && dispatch(gameSlice.actions.setTurn(player.id));
					current && current.classList.remove('active');
				}}>
				Передать ход
			</div>
			<div className='px-2 py-1 text-white cursor-pointer flex justify-between items-baseline'>
				<div>Разочарования</div>
				<div className='flex'>
					<div
						className='text-sm mr-1 hover:opacity-80'
						onClick={() => {
							if (player.disappointments === 0) return;
							dispatch(
								gameSlice.actions.masterSetDisappointments({
									disappointments: player.disappointments - 1,
									playerId: player.id,
								})
							);
						}}>
						➖
					</div>
					<div className='text-[18px] bold mr-1 text-center align-bottom'>{player.disappointments}</div>
					<div
						className='text-sm hover:opacity-50'
						onClick={() => {
							dispatch(
								gameSlice.actions.masterSetDisappointments({
									disappointments: player.disappointments + 1,
									playerId: player.id,
								})
							);
						}}>
						➕
					</div>
				</div>
			</div>
			{!visibleInput && (
				<div
					className={`px-2 py-1 text-white hover:opacity-50 cursor-pointer `}
					onClick={() => {
						setVisibleInput(true);
					}}>
					Переименовать
				</div>
			)}
			{visibleInput && (
				<form
					className='px-2 py-1 text-white cursor-pointer flex'
					onSubmit={() => {
						dispatch(gameSlice.actions.masterSetName({ name: inputName, playerId: player.id }));
						setVisibleInput(false);
						current && current.classList.remove('active');
					}}>
					<input
						autoFocus
						onChange={(e) => {
							setInputName(e.target.value);
						}}
						value={inputName}
						className='w-full bg-black/0 border-[1px] border-white py-1 px-1 focus:outline-none mr-1 h-[22px]'
						type='text'
					/>
					<button
						type='submit'
						className='px-2 flex items-center text-green-500 border-[1px] border-green-500 mr-1 hover:text-black hover:bg-green-500'>
						Да
					</button>
					<button
						className='px-2 flex items-center text-red-500 border-[1px] border-red-500  hover:text-black hover:bg-red-500'
						onClick={() => {
							setVisibleInput(false);
						}}>
						Нет
					</button>
				</form>
			)}

			<div
				className='px-2 py-1 text-white hover:opacity-50 cursor-pointer'
				onClick={() => {
					dispatch(gameSlice.actions.masterSetNewGame(player.id));
					current && current.classList.remove('active');
				}}>
				Новая игра
			</div>
			<div
				className='px-2 py-1 text-white hover:opacity-50 cursor-pointer '
				onClick={() => {
					dispatch(gameSlice.actions.masterSetIgnore({ playerId: player.id, ignored: !player.ignored }));
					current && current.classList.remove('active');
				}}>
				{player.ignored ? (
					<div className='text-green-500/70'>Отобразить игрока</div>
				) : (
					<div className='text-red-500/70'>Скрыть игрока</div>
				)}
			</div>

			{/* <div className='px-2 py-1 text-white hover:opacity-50 cursor-pointer text-red-700/70'>
					Удалить игрока
				</div> */}
		</div>
	);
});

export default MenuGameMaster;
