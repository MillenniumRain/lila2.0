import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import { ReactComponent as ArrowUpSvg } from './../../assets/svg/up-arrow-svgrepo-com.svg';

interface ArrowsProp {
	children?: ReactNode;
	className?: string;
	id: number;
	pickedIdThought: number | null;
}

const Arrows = ({ id, className, pickedIdThought }: ArrowsProp) => {
	const dispatch = useAppDispatch();
	const players = useAppSelector((state) => state.game.players);
	const playerId = useAppSelector((state) => state.game.id);
	const playerHistory = players.find((player) => player.id === playerId)?.history.list || [];
	let thoughtIndex = playerHistory.findIndex((thought) => thought.id === pickedIdThought);

	return (
		<div className='absolute top-0 left-0 bottom-0 right-0  '>
			{thoughtIndex > 0 && (
				<button
					className={`absolute group left-0 top-0  bottom-0  px-5 flex items-center cursor-pointer rounded-l-3xl hover:bg-black/30 `}
					onClick={() => {
						thoughtIndex = thoughtIndex - 1;
						if (thoughtIndex < 0) thoughtIndex = 0;
						const history = playerHistory[thoughtIndex];
						dispatch(interfaceSlice.actions.setActiveCardId(history.cardId));
						dispatch(interfaceSlice.actions.setPickedIdThought(history.id || null));
					}}>
					<ArrowUpSvg className='-rotate-90 w-6 group-hover:fill-white/70' />
				</button>
			)}
			{thoughtIndex < playerHistory.length - 1 && (
				<button
					className={`absolute group right-0 top-0  bottom-0  px-5 flex items-center cursor-pointer rounded-r-3xl hover:bg-black/30`}
					onClick={() => {
						thoughtIndex = thoughtIndex + 1;
						if (thoughtIndex > playerHistory.length - 1) thoughtIndex = playerHistory.length - 1;
						const history = playerHistory[thoughtIndex];
						dispatch(interfaceSlice.actions.setActiveCardId(history.cardId));
						dispatch(interfaceSlice.actions.setPickedIdThought(history.id || null));
					}}>
					<ArrowUpSvg className='rotate-90 w-6 group-hover:fill-white/70 ' />
				</button>
			)}
		</div>
	);
};

export default Arrows;
