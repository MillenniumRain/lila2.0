import React, { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getLocalStorage } from '../lib';
import { gameSlice } from '../store/reducers/GameSlice';
import Background from './Background';
import Card from './Map/Card/Card';
import Dice from './Dice/Dice';
import HistoryPopup from './HistoryPopup';
import LoginPopup from './Login/LoginPopup';
import Map from './Map/Map';
import Menu from './Menu/Menu';
import ThoughtsPopup from './ThoughtsPopup/ThoughtsPopup';
import ChakraColumn from './Map/ChakraColumn';
import { interfaceSlice } from '../store/reducers/InterfaceSlice';
import InstructionsPopup from './Instructions/InstructionsPopup';

interface LilaProp {
	children?: ReactNode;
}

const Lila = ({}: LilaProp) => {
	const dispatch = useAppDispatch();
	const thoughtsPopup = useAppSelector((state) => state.interface.thoughtsPopup);
	const historyPopup = useAppSelector((state) => state.interface.historyPopup);
	const loginPopup = useAppSelector((state) => state.interface.loginPopup);
	const instructionsPopup = useAppSelector((state) => state.interface.instructionsPopup);
	// const [instructionsPopup, setInstructionsPopup] = useState(false);
	const popups = thoughtsPopup || historyPopup || loginPopup || instructionsPopup;
	const dataMap = [...useAppSelector((state) => state.game.gameMap)];
	const zero = dataMap[0];

	const params = useParams();
	useEffect(() => {
		const { name } = getLocalStorage(params.id);
		if (name) {
			dispatch(gameSlice.actions.setPLayerName(name));
		}
		dispatch(interfaceSlice.actions.setLoginPopup(name ? false : true));
	}, []);
	useEffect(() => {
		const body = document.querySelector('body');
		if (popups && body) {
			if (body) body.style.overflowY = 'hidden';
		}
		if (!popups && body) {
			if (body) body.style.overflowY = 'auto';
		}
	}, [popups]);
	return (
		<div className='select-none'>
			<div className='sticky top-0 left-0 w-full h-10 bg-black/80 z-30 invisible to450:visible'></div>
			<Background />
			<div className={`flex overflow-x-auto w-screen p-[6px]`}>
				<div className='basis-1 grow'></div>
				<div className='block  justify-center items-center  relative'>
					<div className='flex  justify-center items-center w-max relative'>
						<div className='flex'>
							<ChakraColumn className={`relative`} />
							<div className={`flex flex-col-reverse`}>
								<Map dataMap={dataMap} />
							</div>
							<ChakraColumn className={`relative `} />
							<div className='absolute bottom-0 '>
								<Card zero={true} card={zero} />
							</div>
						</div>
					</div>
				</div>
				<div className='basis-1 grow flex justify-center '>
					<Dice />
				</div>
			</div>
			<Menu />
			{thoughtsPopup && <ThoughtsPopup />}
			{historyPopup && <HistoryPopup />}
			{loginPopup && <LoginPopup />}
			{instructionsPopup && <InstructionsPopup />}
		</div>
	);
};

export default Lila;
