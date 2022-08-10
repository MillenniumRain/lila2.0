import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { gameSlice, IHistoryList } from '../../store/reducers/GameSlice';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import Arrows from './Arrows';

interface ThoughtsListProp {
	children?: ReactNode;
}

const ThoughtsList = ({}: ThoughtsListProp) => {
	const dispatch = useAppDispatch();
	const activeCardId = useAppSelector((state) => state.interface.activeCard) || 0;
	const { name, description, id } = useAppSelector((state) => state.game.gameMap[activeCardId]);
	const pickedIdThought = useAppSelector((state) => state.interface.pickedIdThought);

	return (
		<div className='px-20 h-full'>
			<Arrows id={id} />
			<div className=' relative h-full overflow-x-auto p-4'>
				<div className='mb-5 text-lg font-bold'>
					{id}. {name}
				</div>
				{description?.map((thought) => {
					const setThoughtObj: IHistoryList = { cardId: id, thoughtId: thought.id };
					if (pickedIdThought) setThoughtObj.id = pickedIdThought;
					return (
						<div
							className='mb-3 border-4 p-2 cursor-pointer hover:bg-slate-200 last:mb-0 '
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
