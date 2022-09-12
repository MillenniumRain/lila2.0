import React, { ReactNode, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IPlayer } from '../../store/reducers/GameSlice';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import DiceTemplate from '../Dice/DiceTemplate';
import Figure from '../Figure';
import { ReactComponent as PersonSvg } from './../../assets/svg/person-svgrepo-com.svg';
import MenuGameMaster from './MenuGameMaster';

interface MenuItemProp {
	children?: ReactNode;
	hideMenu: () => void;
	player: IPlayer;
}

const MenuItem = ({ player, hideMenu }: MenuItemProp) => {
	const id = useAppSelector((player) => player.game.id);
	const master = useAppSelector((player) => player.game.master);
	const ref = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	let flag = false;
	return (
		<div>
			<div
				onDoubleClick={(e) => {
					if (!master) return;
					flag = true;
					dispatch(interfaceSlice.actions.setActivePlayerId(player.id));
					dispatch(interfaceSlice.actions.setHistoryPopup({ visible: true }));
				}}
				onClick={(e) => {
					setTimeout(() => {
						if (flag) return;
						if (!master) return;
						ref.current?.classList.toggle('active');
					}, 230);
					flag = false;
				}}
				onContextMenu={(e) => {
					e.preventDefault();
					ref.current?.classList.toggle('active');
				}}
				className={`flex  justify-between items-center min-h-[40px] border-b-2 select-none   text-white px-2 ${
					master && 'cursor-pointer'
				} ${player.turn && 'bg-white/20'} ${
					(player.disconnected || player.ignored) && 'opacity-30  bg-[#ff00004a]'
				} pt-[3px]`}>
				<div className='flex items-center relative '>
					{player.id === id && <PersonSvg className='w-[15px] mr-1 relative -bottom-[1px] opacity-70' />}
					<div
						className={`${
							player.disconnected && 'line-through'
						}  w-[135px] whitespace-nowrap overflow-hidden overflow-ellipsis  mr-1`}>
						{player.name}
					</div>
				</div>
				<div className='flex items-center -mt-[3px]'>
					<div className='flex flex-col  justify-items-center '>
						{player.disconnected && <div className='text-sm  mr-2'> не в сети</div>}
						{player.ignored && <div className='text-sm  mr-2'> скрыт </div>}
					</div>
					{player.dice && !player.ignored && (
						<div className='mr-4 min-w-[18px]'>
							<DiceTemplate number={player.dice - 1} width={32} dotWidth={8} />
						</div>
					)}

					<div className='mr-2 min-w-[18px]'>{player.position}</div>
					<Figure animation={!player.disconnected} className='w-[30px]' id={player.figure} />
				</div>
			</div>
			{/* Будете смотреть это решение подскажите как лучше сделать чтобы внутри MenuGameMaster был доступ к ref.current.classList*/}
			{master && <MenuGameMaster ref={ref} current={ref.current} player={player} hideMenu={hideMenu} />}
		</div>
	);
};

export default MenuItem;
