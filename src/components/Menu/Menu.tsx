import React, { createRef, ReactNode, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import SynchronizationPopup from '../SynchronizationPopup';
import MenuItem from './MenuItem';

interface MenuProp {
	children?: ReactNode;
}

const Menu = ({}: MenuProp) => {
	const dispatch = useAppDispatch();
	const players = useAppSelector((player) => player.game.players);
	const id = useAppSelector((player) => player.game.id);
	const [visiblePopup, setVisiblePopup] = useState(false);

	const { name } = players.find((player) => player.turn) || {};
	return (
		<div className='fixed left-0 top-0 z-20 flex flex-col h-screen w-[300px] bg-black/50'>
			<button
				className='bg-slate-400  py-2  hover:bg-slate-200 cursor-pointer opacity-50 font-russo '
				onClick={() => {
					dispatch(interfaceSlice.actions.setHistoryPopup({ visible: true }));
				}}>
				История ходов
			</button>

			{players.map((player) => {
				return <MenuItem player={player} key={player.id} />;
			})}
			<div className=' absolute bottom-0 w-full'>
				<div className='text-white  text-[12px]'> Ход игрока: {name}</div>
				<div className='text-white mb-1 text-[12px]'> Количество игроков: {players.length}</div>
				<button
					className='bg-slate-400  py-2 w-full font-russo hover:bg-slate-200 cursor-pointer opacity-50 font-'
					onClick={() => {
						setVisiblePopup(true);
					}}>
					Синхронизироваться с полем
				</button>
			</div>

			{visiblePopup && <SynchronizationPopup onClose={() => setVisiblePopup(false)} />}
		</div>
	);
};

export default Menu;
