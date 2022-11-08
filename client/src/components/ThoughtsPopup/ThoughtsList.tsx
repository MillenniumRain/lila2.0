import React, { MouseEvent, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { gameSlice, IHistoryList } from '../../store/reducers/GameSlice';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import Arrows from './Arrows';

interface ThoughtsListProp {
	children?: ReactNode;
	onContextMenu: (e: MouseEvent) => void;
	activeCardId: number;
}

const ThoughtsList = ({ onContextMenu, activeCardId }: ThoughtsListProp) => {
	const dispatch = useAppDispatch();
	const { name, description, id } = useAppSelector((state) => state.game.gameMap[activeCardId]);
	const pickedIdThought = useAppSelector((state) => state.interface.pickedIdThought);

	return (
		<div className='px-[50px] to450:px-4 h-full ' onContextMenu={onContextMenu}>
			{/* <Arrows id={id} /> */}
			<div className='grid relative h-full overflow-x-auto py-4 '>
				{/* <div className='mb-5 text-lg font-bold px-1 '>
					{id}. {name}
				</div> */}
				{description?.map((thought) => {
					const setThoughtObj: IHistoryList = { cardId: id, thoughtId: thought.id };
					if (pickedIdThought) setThoughtObj.id = pickedIdThought;
					return (
						<div
							className='mt-[-2px]  p-2 cursor-pointer hover:bg-slate-200 last:mb-0 '
							key={thought.id}
							onClick={(e) => {
								dispatch(interfaceSlice.actions.setThoughtsPopup({ visible: false }));
								dispatch(gameSlice.actions.setThought(setThoughtObj));
							}}>
							{thought.id}. {thought.list}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ThoughtsList;
