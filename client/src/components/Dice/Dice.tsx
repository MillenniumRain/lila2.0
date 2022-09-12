import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { random } from '../../lib';
import { gameSlice } from '../../store/reducers/GameSlice';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import Cubes from './Cubes';
import DiceTemplate from './DiceTemplate';
import Disappointment from './Disappointment';
import { ReactComponent as SvgDice } from './../../assets/svg/dice-svgrepo-com.svg';
import { ReactComponent as SvgClose } from './../../assets/svg/close-svgrepo-com.svg';
import { ReactComponent as SvgDices } from './../../assets/svg/two-dices-svgrepo-com.svg';
import { ReactComponent as SvgCubeDice } from './../../assets/svg/big-dice-svgrepo-com.svg';

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
		'Бросайте настойщий кубик, выпавшее число на кубике выберете ниже',
	];
	const [hideMenu, setHideMenu] = useState(true);

	const dispatch = useAppDispatch();
	const ref = useRef(false);

	const stopGeneration = (flag = true) => {
		ref.current = flag;
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
	useEffect(() => {
		if (window.screen.width > 1350) {
			setHideMenu(false);
		}
	}, []);
	return (
		<div
			className={`fixed h-screen flex items-center justify-center  flex-col top-0  w-[340px] transition-[right]  bg-black/50  to450:bg-black/90 ${
				hideMenu ? '-right-[340px] z-30' : 'right-0  to450:w-[calc(100vw-40px)] z-40'
			}`}>
			<button
				onClick={() => {
					setHideMenu((prev) => !prev);
				}}
				className='absolute block justify-center  items-center w-[40px] h-[40px] top-0 left-[-40px]  fill-white hover:scale-105 '>
				{hideMenu ? (
					<div className='p-1'>
						<SvgDice />
					</div>
				) : (
					<div className={`fill-white bg-black/90 w-full h-full flex justify-center items-center`}>
						<SvgClose />
					</div>
				)}
			</button>
			{playerId == playerMoving?.id ? (
				<div>
					<div className=' flex flex-col items-center'>
						<div className='relative flex flex-col items-center z-40'>
							<div className='flex  items-center justify-center'>
								{!visibleMyCubes ? (
									<div className='flex  flex-col items-center justify-center'>
										<div className='absolute left-[-70px] -top-14 mb-2 italic text-slate-500 text-sm opacity-70 w-[300px] h-[40px] flex justify-center items-end text-center'>
											{diceStatus[isGenerating]}
										</div>
										<button
											onContextMenu={(e) => {
												e.preventDefault();
											}}
											onMouseDown={(e) => {
												if (!isGenerating && e.button === 0) {
													dispatch(interfaceSlice.actions.setRollingDice(true));
													setIsGenerating(1);
													generatingOnDown(diceNumber);
												}
												if (e.button === 2) {
													setVisibleMyCubes(true);
												}
											}}
											onTouchStart={(e) => {
												e.preventDefault();

												if (!isGenerating) {
													setIsGenerating(1);
													dispatch(interfaceSlice.actions.setRollingDice(true));
													generatingOnDown(diceNumber);
												}
											}}
											onMouseUp={(e) => {
												if (e.button === 2) return;
												stopGeneration();
											}}
											onTouchEnd={(e) => {
												stopGeneration();
											}}
											onTouchCancel={(e) => {
												stopGeneration();
											}}
											className='hover:opacity-90 active:scale-[1.05] mb-4'>
											<DiceTemplate number={diceNumber} />
										</button>
									</div>
								) : (
									<div className=''>
										<div className=' absolute top-[-75px] w-full  mb-2 italic text-slate-500 text-sm opacity-70  h-[40px] flex justify-center items-end text-center'>
											{diceStatus[3]}
										</div>
										<Cubes
											onContextMenu={() => {
												stopGeneration(false);
												setVisibleMyCubes(false);
											}}
										/>
									</div>
								)}
								<button
									className=' ml-4 w-[35px] fill-white hover:scale-105 hover:opacity-80'
									onClick={() => {
										setVisibleMyCubes((prev) => !prev);
									}}>
									{visibleMyCubes ? <SvgCubeDice /> : <SvgDices />}
								</button>
							</div>
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
							className='absolute bottom-0 right-0 py-1 px-4  text-2xl font-russo text-white text-shadow-white hover:text-white cursor-pointer text-shadow-white hover:scale-105'
							onClick={() => {
								dispatch(gameSlice.actions.completeTheTurn());
							}}>
							Завершить ход
						</button>
					)}
				</div>
			) : (
				<div className={`absolute font-russo text-center text-[50px] opacity-50  z-10 text-white`}>
					{playerMoving?.name ? `Ходит ${playerMoving?.name}` : ''}
				</div>
			)}

			<div className='w-[120px]'></div>
			<div
				className='absolute top-0 right-0 px-4 py-1 text-2xl font-russo text-white  text-shadow-white hover:scale-105 cursor-pointer z-50'
				onClick={() => {
					dispatch(interfaceSlice.actions.setInstructionsPopup(true));
				}}>
				Инструкция
			</div>
		</div>
	);
};

export default Dice;
