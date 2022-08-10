import React, { ReactNode } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { gameSlice, ICard } from '../../store/reducers/GameSlice';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import Hexagram from '../Hexagram/Hexagram';
import Position from './Position';

interface CardProp {
	card: ICard;
	children?: ReactNode;
	className?: string;
	clean?: boolean;
}

const Card = ({ card, className, clean }: CardProp) => {
	const { id, hexagram, hexagram_color, number_color, color, name, bg } = card;
	const dispatch = useAppDispatch();
	return (
		<button
			className={`relative w-[90px] h-[90px] border-b-2   border border-r-2 p-[3px] border-[#15323d]  flex justify-between    transition-all 
			${
				clean
					? `cursor-default`
					: 'hover:z-20 hover:opacity-90 hover:relative hover:-translate-y-1 cursor-pointer'
			}  ${className}`}
			style={{ background: bg }}
			onClick={() => {
				dispatch(gameSlice.actions.move(id));
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				dispatch(interfaceSlice.actions.setThoughtsPopup({ visible: true, activeCard: id }));
			}}>
			<div className='flex flex-col w-full'>
				<div className={`flex justify-center  items-center ${clean ? ` h-full ` : ' h-min justify-between'}`}>
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
					<div className='absolute flex w-full left-0 bottom-0 justify-end index z-10'>
						<Position id={id} />
					</div>
				)}
			</div>
		</button>
	);
};

export default Card;
