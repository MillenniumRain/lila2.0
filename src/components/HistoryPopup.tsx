import React, { ReactNode } from 'react';
import Popup from '../common/Popup';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { interfaceSlice } from '../store/reducers/InterfaceSlice';

interface HistoryPopupProp {
	children?: ReactNode;
}
const HistoryPopup = ({}: HistoryPopupProp) => {
	const history = useAppSelector((state) => state.game.history);
	const dispatch = useAppDispatch();

	let input = [];
	const output = [];
	const count = 10;

	for (let i = 0; i < Math.ceil(history.list.length / count); i++) {
		input.push(
			<div className='flex flex-col ' key={-1}>
				<div className={`border border-slate-200 flex py-1 px-1 justify-center items-center`}>№ поля</div>{' '}
				<div className={`border border-slate-200 flex py-1 px-1  justify-center items-center`}>№ позиции</div>
			</div>
		);
		for (let ii = 0; ii < count; ii++) {
			const number = ii + count * i;
			const thought = history.list[number];

			if (thought) {
				input.push(
					<div
						className='flex flex-col cursor-pointer hover:bg-slate-200'
						onClick={() => {
							dispatch(
								interfaceSlice.actions.setThoughtsPopup({
									visible: true,
									activeCard: thought.cardId,
									pickedIdThought: thought.id,
								})
							);
						}}
						key={thought.id}>
						<div className='border border-slate-200 flex py-1 px-4 min-w-[52px] justify-center items-center'>
							{thought.cardId}
						</div>
						<div className='border border-slate-200 flex py-1 px-4   min-w-[52px] justify-center items-center'>
							{thought.thoughtId}&nbsp;
						</div>
					</div>
				);
			} else {
				break;
			}
		}
		output.push(
			<div className='flex mb-2' key={i + 'o'}>
				{input}
			</div>
		);
		input = [];
	}

	return (
		<div className=''>
			<Popup
				onClose={() => {
					dispatch(interfaceSlice.actions.setHistoryPopup({ visible: false }));
				}}>
				<div className='bg-white  w-[800px] h-2/3 z-10 py-10 px-20 overflow-x-auto'>
					<div className=''>
						{<div className='mb-5 text-lg font-bold'>История</div>}
						{output}
					</div>
				</div>
			</Popup>
		</div>
	);
};

export default HistoryPopup;
