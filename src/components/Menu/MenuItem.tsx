import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { gameSlice, IPlayer } from '../../store/reducers/GameSlice';
import DiceTemplate from '../Dice/DiceTemplate';
import Figure from '../Figure';
import { ReactComponent as PersonSvg } from './../../assets/svg/person-svgrepo-com.svg';
import MenuGameMaster from './MenuGameMaster';

interface MenuItemProp {
	children?: ReactNode;
	player: IPlayer;
}

const MenuItem = ({ player }: MenuItemProp) => {
	const id = useAppSelector((player) => player.game.id);
	const master = useAppSelector((player) => player.game.master);
	const ref = useRef<HTMLDivElement>(null);

	return (
		<div>
			<div
				onClick={(e) => {
					if (!master) return;
					ref.current?.classList.toggle('active');
				}}
				onContextMenu={(e) => {
					e.preventDefault();
					ref.current?.classList.toggle('active');
				}}
				className={`flex  justify-between items-center min-h-[40px] border-b-2  text-white px-2 ${
					player.turn && 'bg-white/20'
				} ${(player.disconnected || player.ignored) && 'opacity-30  bg-[#ff00004a]'} `}>
				<div className='flex items-center relative '>
					{player.id == id && <PersonSvg className='w-[15px] mr-1 relative -bottom-[1px] opacity-70' />}
					<span
						className={`${
							player.disconnected && 'line-through'
						}  w-[135px] whitespace-nowrap overflow-hidden overflow-ellipsis  mr-1`}>
						{player.name}
					</span>
				</div>
				<div className='flex items-center -mt-[3px]'>
					<div className='flex flex-col  justify-items-center '>
						{player.disconnected && <span className='text-sm  mr-2'> не в сети</span>}
						{player.ignored && <span className='text-sm  mr-2'> скрыт </span>}
					</div>
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
			{master && <MenuGameMaster ref={ref} current={ref.current} player={player} />}
		</div>
	);
};

export default MenuItem;
