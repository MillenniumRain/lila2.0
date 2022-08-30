import React, { createRef, ReactNode, useEffect, useRef, useState } from 'react';
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
	const master = useAppSelector((player) => player.game.master);
	const [visiblePopup, setVisiblePopup] = useState(false);
	const synchronizationPopup = useAppSelector((state) => state.interface.synchronizationPopup);

	const { name } = players.find((player) => player.turn) || {};

	return (
		<div className='fixed left-0 top-0  flex flex-col h-screen w-[300px] bg-black/50 '>
			<button
				className='bg-[#4a545f]  py-2  hover:bg-slate-200 cursor-pointer  font-russo '
				onClick={() => {
					dispatch(interfaceSlice.actions.setHistoryPopup({ visible: true }));
				}}>
				История ходов
			</button>

			<div className='h-[calc(100%_-_120px)] overflow-y-auto'>
				{players.map((player) => {
					if (!master) {
						if (player.ignored || player.disconnected) return null;
					}

					return <MenuItem player={player} key={player.id} />;
				})}
			</div>
			<div className=' absolute bottom-0 w-full'>
				<div className='text-white  text-[12px]'> Ход игрока: {name}</div>
				{/* <div className='text-white mb-1 text-[12px]'> Количество игроков: {players.length}</div> */}
				<button
					className='bg-[#4a545f] py-2 w-full font-russo hover:bg-slate-200 cursor-pointer font-'
					onClick={() => {
						dispatch(interfaceSlice.actions.setSynchronizationPopup(true));
					}}>
					Синхронизироваться с полем
				</button>
			</div>

			{synchronizationPopup && <SynchronizationPopup />}
		</div>
	);
};

export default Menu;
