import React, { ReactNode, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { random } from '../../lib';
import { gameSlice } from '../../store/reducers/GameSlice';
import DiceTemplate from './DiceTemplate';
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
				<div className=' relative flex flex-col items-center'>
					<span className='absolute -top-11 mb-2 italic text-slate-500 text-sm opacity-70 w-[300px] h-[40px] flex justify-center items-end'>
						{isGenerating === 0 &&
							'Нажмите и держите чтобы перемешать кубик. Отпустите чтобы бросить кубик'}
						{isGenerating === 1 && 'Перемешивается...'}
						{isGenerating === 2 && 'Останавливается...'}
					</span>
					<div className='relative z-10 flex flex-col items-center'>
						<button
							onMouseDown={(e) => {
								if (!isGenerating && e.button == 0) {
									setIsGenerating(1);
									generatingOnDown(diceNumber);
								}
							}}
							onTouchStart={(e) => {
								if (!isGenerating) {
									setIsGenerating(1);
									generatingOnDown(diceNumber);
								}
							}}
							onMouseUp={() => stopGeneration()}
							onTouchEnd={() => stopGeneration()}
							onTouchCancel={() => stopGeneration()}
							className='hover:opacity-90 active:scale-[1.05] mb-4'>
							<DiceTemplate number={diceNumber} />
						</button>
						{players.length > 1 && (
							<button
								className='py-2 px-4 border-2 mb-4 text-white z-10 bg-black/80 rounded-lg hover:bg-white/80 hover:text-black font-russo'
								onClick={() => {
									dispath(gameSlice.actions.completeTheTurn());
								}}>
								Завершить ход
							</button>
						)}
					</div>
				</div>
			) : (
				<div className={`absolute font-russo text-center text-[50px] opacity-50  z-10 text-white`}>
					Ход другого игрока
				</div>
			)}
			<div className='w-[120px]'></div>
		</div>
	);
};

export default Dice;
