import React, { ReactNode } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';

interface ArrowsProp {
	children?: ReactNode;
	className?: string;
	id: number;
}

const Arrows = ({ id, className }: ArrowsProp) => {
	const dispatch = useAppDispatch();
	return (
		<div className='absolute top-0 left-0 bottom-0 right-0  '>
			{id != 0 && (
				<button
					className={`absolute left-0 top-0  bottom-0  px-5 flex items-center cursor-pointer rounded-l-3xl ${
						className ? className : ` hover:bg-slate-200`
					} `}
					onClick={() => {
						let tid = id - 1;
						if (tid < 0) tid = 0;
						dispatch(interfaceSlice.actions.setActiveCardId(tid));
					}}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						className='w-[15px]'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth='2'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
					</svg>
				</button>
			)}
			{id != 64 && (
				<button
					className={`absolute right-0 top-0  bottom-0  px-5 flex items-center cursor-pointer rounded-r-3xl ${
						className ? className : ` hover:bg-slate-200`
					}`}
					onClick={() => {
						let tid = id + 1;
						if (tid > 64) tid = 64;
						dispatch(interfaceSlice.actions.setActiveCardId(tid));
					}}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						className='w-[15px]'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth='2'>
						<path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
					</svg>
				</button>
			)}
		</div>
	);
};

export default Arrows;
