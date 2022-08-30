import React, { ReactNode } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { gameSlice } from '../../store/reducers/GameSlice';
import DiceTemplate from './DiceTemplate';

interface CubesProp {
	children?: ReactNode;
	onContextMenu: () => void;
}

const Cubes = ({ onContextMenu }: CubesProp) => {
	const dispatch = useAppDispatch();

	return (
		<div
			className=''
			onContextMenu={(e) => {
				e.preventDefault();
				onContextMenu();
			}}>
			<div className='flex mb-4'>
				<div
					className='mr-4 cursor-pointer hover:opacity-90'
					onClick={() => {
						dispatch(gameSlice.actions.setDice(1));
					}}>
					<DiceTemplate number={0} width={60} dotWidth={17} />
				</div>
				<div
					className='mr-4 cursor-pointer hover:opacity-90'
					onClick={() => {
						dispatch(gameSlice.actions.setDice(2));
					}}>
					<DiceTemplate number={1} width={60} dotWidth={17} />
				</div>
				<div
					className='cursor-pointer hover:opacity-90'
					onClick={() => {
						dispatch(gameSlice.actions.setDice(3));
					}}>
					<DiceTemplate number={2} width={60} dotWidth={17} />
				</div>
			</div>
			<div className='flex'>
				<div
					className='mr-4 cursor-pointer hover:opacity-90'
					onClick={() => {
						dispatch(gameSlice.actions.setDice(4));
					}}>
					<DiceTemplate number={3} width={60} dotWidth={17} />
				</div>
				<div
					className='mr-4 cursor-pointer hover:opacity-90'
					onClick={() => {
						dispatch(gameSlice.actions.setDice(5));
					}}>
					<DiceTemplate number={4} width={60} dotWidth={17} />
				</div>
				<div
					className='cursor-pointer hover:opacity-90'
					onClick={() => {
						dispatch(gameSlice.actions.setDice(6));
					}}>
					<DiceTemplate number={5} width={60} dotWidth={17} />
				</div>
			</div>
		</div>
	);
};

export default Cubes;
