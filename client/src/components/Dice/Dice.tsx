import React, { ReactNode, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { random } from '../../lib';
import { gameSlice } from '../../store/reducers/GameSlice';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import DiceTemplate from './DiceTemplate';
import Disappointment from './Disappointment';
import Dot from './Dot';

interface DiceProp {
	children?: ReactNode;
}

const Dice = ({}: DiceProp) => {
	const [diceNumber, setDice] = useState(5);
	const [isGenerating, setIsGenerating] = useState(0);
	const playerId = useAppSelector((state) => state.game.id);
	const players = useAppSelector((state) => state.game.players);
	const playerMoving = players.find((player) => player.turn);

	const dispath = useAppDispatch();
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
				dispath(gameSlice.actions.setDice(dice + 1));
				dispath(interfaceSlice.actions.setRollingDice(false));
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
							<span className='absolute -top-11 mb-2 italic text-slate-500 text-sm opacity-70 w-[300px] h-[40px] flex justify-center items-end'>
								{isGenerating === 0 &&
									'Нажмите и держите чтобы перемешать кубик. Отпустите чтобы бросить кубик'}
								{isGenerating === 1 && 'Перемешивается...'}
								{isGenerating === 2 && 'Останавливается...'}
							</span>
							<button
								onMouseDown={(e) => {
									if (!isGenerating && e.button == 0) {
										dispath(interfaceSlice.actions.setRollingDice(true));
										setIsGenerating(1);
										generatingOnDown(diceNumber);
									}
								}}
								onTouchStart={(e) => {
									if (!isGenerating) {
										setIsGenerating(1);
										dispath(interfaceSlice.actions.setRollingDice(true));

										generatingOnDown(diceNumber);
									}
								}}
								onMouseUp={() => stopGeneration()}
								onTouchEnd={() => stopGeneration()}
								onTouchCancel={() => stopGeneration()}
								className='hover:opacity-90 active:scale-[1.05] mb-4'>
								<DiceTemplate number={diceNumber} />
							</button>
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
								dispath(gameSlice.actions.completeTheTurn());
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
