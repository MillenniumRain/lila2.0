import React, { ReactNode, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { gameSlice, IPLayer } from '../../store/reducers/GameSlice';
import DiceTemplate from '../Dice/DiceTemplate';
import Figure from '../Figure';
import { ReactComponent as PersonSvg } from './../../assets/svg/person-svgrepo-com.svg';
import MenuGameMaster from './MenuGameMaster';

interface MenuItemProp {
	children?: ReactNode;
	player: IPLayer;
}

const MenuItem = ({ player }: MenuItemProp) => {
	const id = useAppSelector((player) => player.game.id);
	const ref = useRef<HTMLDivElement>(null);

	return (
		<div>
			<div
				onClick={(e) => {
					ref.current?.classList.remove('active');
				}}
				onContextMenu={(e) => {
					e.preventDefault();
					ref.current?.classList.toggle('active');
				}}
				className={`flex  justify-between items-center min-h-[40px] border-b-2  text-white px-2 ${
					player.turn && 'bg-white/20'
				} ${player.disconnected && 'opacity-30 bg-[#ff00004a]'}`}>
				<div className='mr-4 flex items-center relative'>
					<span className={`${player.disconnected && 'line-through'} mr-1`}>{player.name}</span>
					{player.id == id && <PersonSvg className='w-[15px] mr-1 relative -bottom-[2px] opacity-70' />}
				</div>
				<div className='flex items-center'>
					{player.dice && (
						<div className='mr-4 min-w-[18px]'>
							<DiceTemplate number={player.dice - 1} width={32} dotWidth={8} />
						</div>
					)}

					<div className='mr-2 min-w-[18px]'>{player.position}</div>
					<Figure animation={!player.disconnected} className='w-[30px]' id={player.figure} />
				</div>
			</div>
			{/* Будете смотреть это решение подскажите как лучше сделать чтобы внутри MenuGameMaster был доступ к ref.current.classList*/}
			<MenuGameMaster ref={ref} current={ref.current} player={player} />
		</div>
	);
};

export default MenuItem;
