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

interface LilaProp {
	children?: ReactNode;
}

const Lila = ({}: LilaProp) => {
	const dispatch = useAppDispatch();
	const thoughtsPopup = useAppSelector((state) => state.interface.thoughtsPopup);
	const historyPopup = useAppSelector((state) => state.interface.historyPopup);
	const loginPopup = useAppSelector((state) => state.interface.loginPopup);
	// const [loginPopup, setLoginPopup] = useState(false);

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

	return (
		<>
			<Background />
			<div className='flex flex-wrap min-w-fit'>
				<div className='basis-1 grow'></div>
				<div className='flex  justify-center items-center h-screen relative'>
					<div className='flex flex-col-reverse justify-center items-center w-max relative'>
						<ChakraColumn className={`absolute bottom-0 -left-cell`} />
						<Map dataMap={dataMap} />
						<ChakraColumn className={`absolute bottom-0 -right-cell`} />
						<div className='absolute bottom-0 -left-cell'>
							<Card zero={true} card={zero} />
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
		</>
	);
};

export default Lila;
