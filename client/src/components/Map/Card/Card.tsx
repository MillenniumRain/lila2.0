import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { gameSlice, ICard } from '../../../store/reducers/GameSlice';
import { interfaceSlice } from '../../../store/reducers/InterfaceSlice';
import Hexagram from '../../Hexagram/Hexagram';
import Position from './Position';

interface CardProp {
	card: ICard;
	children?: ReactNode;
	className?: string;
	zero?: boolean;
	clean?: boolean;
}

const Card = ({ card, className, clean = false, zero }: CardProp) => {
	const { id, hexagram, hexagram_color, number_color, color, name, bg } = card;
	const players = useAppSelector((state) => state.game.players);
	const masterMoveId = useAppSelector((state) => state.game.masterMoveId);
	const synchronizationPopup = useAppSelector((state) => state.interface.synchronizationPopup);

	const playerMoving = players.find((player) => player.turn);

	const dispatch = useAppDispatch();
	return (
		<div className={`relative  `}>
			<button
				className={`relative  border border-r-2 p-[3px] border-[#15323d] ]  flex justify-between    transition-all 
			${clean || playerMoving?.position == id ? `ping z-20` : `hover:-translate-y-1`}
			${
				clean
					? `cursor-default max-h-[90px] max-w-[90px] w-[calc(100vw/10)] h-[calc(100vw/10)] flex justify-between  items-center`
					: 'hover:z-20 hover:opacity-90 hover:relative  cursor-pointer  h-cell w-cell '
			}  ${zero ? 'border-0' : 'border-b-2'}`}
				style={{ background: zero ? 'rgb(0,0,0,0)' : bg }}
				onClick={() => {
					const payload = { cardId: id, playerId: '' };

					dispatch(gameSlice.actions.move(payload));
					if (masterMoveId.length > 0) {
						payload.playerId = masterMoveId;
						dispatch(gameSlice.actions.setMasterMovePlayer(''));
					}
				}}
				onContextMenu={(e) => {
					e.preventDefault();
					console.log({ visible: true, activeCard: id });

					dispatch(interfaceSlice.actions.setThoughtsPopup({ visible: true, activeCard: id }));
				}}>
				<div className='flex flex-col w-full'>
					<div
						className={`flex justify-center  items-center ${
							clean ? ` h-full ` : ' h-min justify-between'
						}`}>
						{!clean && (
							<div className={`text-3xl  w-1/2 text-center align-middle`} style={{ color: number_color }}>
								{id}
							</div>
						)}
						<div className={`${clean ? `` : ' mr-[4px]'}`}>
							<Hexagram hexagram={hexagram} hexagram_color={hexagram_color} />
						</div>
					</div>
					{!clean && (
						<div className={`text-[9px] text-center`} style={{ color }}>
							{name.toUpperCase()}
						</div>
					)}

					{!clean && (
						<div className='absolute flex w-full left-0 bottom-0 justify-end index z-10 overflow-hidden'>
							<Position players={players} id={id} />
						</div>
					)}
				</div>
			</button>
			<div
				className={` ${
					!clean &&
					playerMoving?.position == id &&
					` animate-pulse-slow absolute top-0 left-0 w-full h-full  shadow-card  z-10`
				} `}></div>
		</div>
	);
};

export default Card;
