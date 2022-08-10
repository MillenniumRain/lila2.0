import React, { ReactNode, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { interfaceSlice } from '../store/reducers/InterfaceSlice';
import Figure from './Figure';
import SynchronizationPopup from './SynchronizationPopup';

interface MenuProp {
	children?: ReactNode;
}

const Menu = ({}: MenuProp) => {
	const dispatch = useAppDispatch();
	const player = useAppSelector((player) => player.game.players);
	const [visiblePopup, setVisiblePopup] = useState(false);
	return (
		<div className='fixed left-0 top-0 z-20 flex flex-col h-screen w-[300px] bg-black/50'>
			<button
				className='bg-slate-400  py-2  mb-4  hover:bg-slate-200 cursor-pointer opacity-50'
				onClick={() => {
					dispatch(interfaceSlice.actions.setHistoryPopup({ visible: true }));
				}}>
				История ходов
			</button>

			{player.map((player) => {
				return (
					<div
						className={`flex  justify-between border-b-2  text-white px-2 ${
							player.turn ? 'bg-white/20' : ''
						}`}
						key={player.id}>
						<span className='mr-4'>{player.name}</span>
						<span className='flex'>
							<span className='mr-2'>{player.position}</span>
							<Figure animation={false} className='w-[30px]' id={player.figure - 1} />
						</span>
					</div>
				);
			})}
			<div className=' absolute bottom-0 w-full'>
				<div className='text-white py-2 text-[12px]'> Количество игроков: {player.length}</div>
				<button
					className='bg-slate-400  py-2 w-full  hover:bg-slate-200 cursor-pointer opacity-50'
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
