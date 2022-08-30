import React, { ReactNode, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { random } from '../../lib';
import { gameSlice } from '../../store/reducers/GameSlice';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import Cubes from './Cubes';
import DiceTemplate from './DiceTemplate';
import Disappointment from './Disappointment';
import Dot from './Dot';

interface DiceProp {
	children?: ReactNode;
}

const Dice = ({}: DiceProp) => {
	const [diceNumber, setDice] = useState(5);
	const [isGenerating, setIsGenerating] = useState(0);
	const [visibleMyCubes, setVisibleMyCubes] = useState(false);
	const playerId = useAppSelector((state) => state.game.id);
	const players = useAppSelector((state) => state.game.players);
	const playerMoving = players.find((player) => player.turn);
	const diceStatus = [
		'Нажмите и держите чтобы перемешать кубик. Отпустите чтобы бросить кубик',
		'Перемешивается...',
		'Останавливается...',
	];
	const dispatch = useAppDispatch();
	const ref = useRef(false);

	const stopGeneration = () => {
		ref.current = true;
	};

	const generatingOnDown = (dice: number, time = 200) => {
		if (ref.current) {
			time += 50;
			setIsGenerating(2);
			if (time > 549) {
				setIsGenerating(0);
				dispatch(gameSlice.actions.setDice(dice + 1));
				dispatch(interfaceSlice.actions.setRollingDice(false));
				ref.current = false;
				return;
			}
		}
		dice = random(0, 5);
		setDice(dice);
		setTimeout(() => {
			generatingOnDown(dice, time);
		}, time);
	};
	return (
		<div className=' h-screen flex items-center justify-center  flex-col'>
			{playerId == playerMoving?.id ? (
				<>
					<div className=' flex flex-col items-center'>
						<div className='relative flex flex-col items-center z-40'>
							{!visibleMyCubes ? (
								<>
									<div className='absolute -top-11 mb-2 italic text-slate-500 text-sm opacity-70 w-[300px] h-[40px] flex justify-center items-end'>
										{diceStatus[isGenerating]}
									</div>
									<button
										onContextMenu={(e) => {
											e.preventDefault();
											setVisibleMyCubes(true);
										}}
										onMouseDown={(e) => {
											if (!isGenerating && e.button == 0) {
												dispatch(interfaceSlice.actions.setRollingDice(true));
												setIsGenerating(1);
												generatingOnDown(diceNumber);
											}
										}}
										onTouchStart={(e) => {
											if (!isGenerating) {
												setIsGenerating(1);
												dispatch(interfaceSlice.actions.setRollingDice(true));

												generatingOnDown(diceNumber);
											}
										}}
										onMouseUp={() => stopGeneration()}
										onTouchEnd={() => stopGeneration()}
										onTouchCancel={() => stopGeneration()}
										className='hover:opacity-90 active:scale-[1.05] mb-4'>
										<DiceTemplate number={diceNumber} />
									</button>
								</>
							) : (
								<Cubes
									onContextMenu={() => {
										setVisibleMyCubes(false);
									}}
								/>
							)}
							<div className='absolute top-[120px] flex justify-center flex-col items-center group'>
								{Array.apply(0, Array(playerMoving.disappointments)).map((val, index) => {
									return (
										<Disappointment
											length={playerMoving.disappointments}
											index={index}
											key={index}
										/>
									);
								})}
							</div>
						</div>
					</div>
					{players.length > 1 && (
						<button
							className='fixed bottom-0 right-0 py-2 px-8 border-2  text-white z-10 bg-black/80  hover:bg-slate-200 hover:text-black font-russo'
							onClick={() => {
								dispatch(gameSlice.actions.completeTheTurn());
							}}>
							Завершить ход
						</button>
					)}
				</>
			) : (
				<div className={`absolute font-russo text-center text-[50px] opacity-50  z-10 text-white`}>
					{playerMoving?.name ? `Ходит ${playerMoving?.name}` : ''}
				</div>
			)}
			<div className='w-[120px]'></div>
		</div>
	);
};

export default Dice;
