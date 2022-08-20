import React, { forwardRef, MutableRefObject, ReactNode, Ref, useRef } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { gameSlice, IPLayer } from '../../store/reducers/GameSlice';

interface MenuGameMasterProp {
	children?: ReactNode;
	player: IPLayer;
	current: HTMLDivElement | null;
}

const MenuGameMaster = forwardRef<HTMLDivElement, MenuGameMasterProp>(({ player, current }, ref) => {
	const dispatch = useAppDispatch();
	return (
		<div ref={ref} className='flex flex-col bg-black/70  transition-all h-[0]  overflow-hidden text-sm'>
			<div className='px-2 py-1 text-white hover:opacity-50 cursor-pointer'>Передвинуть</div>
			<div
				className='px-2 py-1 text-white hover:opacity-50 cursor-pointer'
				onClick={() => {
					player.id && dispatch(gameSlice.actions.setTurn(player.id));
					current && current.classList.remove('active');
				}}>
				Передать ход
			</div>
			<div className='px-2 py-1 text-white hover:opacity-50 cursor-pointer'>Переименовать</div>
			<div className='px-2 py-1 text-white hover:opacity-50 cursor-pointer'>Посмотреть историю</div>
			<div className='px-2 py-1 text-white hover:opacity-50 cursor-pointer'>Новая игра</div>
			<div className='px-2 py-1 text-white hover:opacity-50 cursor-pointer text-red-700/70'>Скрыть игрока</div>

			{/* <div className='px-2 py-1 text-white hover:opacity-50 cursor-pointer text-red-700/70'>
					Удалить игрока
				</div> */}
		</div>
	);
});

export default MenuGameMaster;
