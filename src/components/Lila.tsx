import React, { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getLocalStorage } from '../lib';
import { gameSlice } from '../store/reducers/GameSlice';
import Background from './Background';
import Card from './Card/Card';
import Dice from './Dice/Dice';
import HistoryPopup from './HistoryPopup';
import LoginPopup from './LoginPopup';
import Menu from './Menu/Menu';
import RowMap from './RowMap';
import ThoughtsPopup from './ThoughtsPopup/ThoughtsPopup';

interface LilaProp {
	children?: ReactNode;
}

const Lila = ({}: LilaProp) => {
	const dataMap = [...useAppSelector((state) => state.game.gameMap)];
	const zero = dataMap[0];
	const thoughtsPopup = useAppSelector((state) => state.interface.thoughtsPopup);
	const historyPopup = useAppSelector((state) => state.interface.historyPopup);
	const [loginPopup, setLoginPopup] = useState(false);

	// const name = useAppSelector((state) => state.game.name);
	// console.log(loginPopup);
	const dispatch = useAppDispatch();
	const params = useParams();
	useEffect(() => {
		const { name } = getLocalStorage(params.id);
		if (name) {
			dispatch(gameSlice.actions.setPLayerName(name));
		}
		setLoginPopup(name ? false : true);
	}, []);

	dataMap.shift();
	const map = [];
	for (let i = 0; i < 8; i++) {
		map.push(
			<div className='flex' key={dataMap[i].id}>
				<RowMap lineNumber={i} key={i} map={dataMap} />
			</div>
		);
	}
	return (
		<>
			<Background />
			<div className='flex flex-wrap min-w-fit'>
				<div className='basis-1 grow'></div>
				<div className='flex  justify-center items-center h-screen relative'>
					<div className='flex flex-col-reverse justify-center items-center w-max relative'>
						<div className='absolute bottom-0 left-[-90px]'>
							<Card card={zero} />
						</div>
						{map}
					</div>
				</div>
				<div className='basis-1 grow flex justify-center z-40'>
					<Dice />
				</div>
			</div>
			<Menu />
			{thoughtsPopup && <ThoughtsPopup />}
			{historyPopup && <HistoryPopup />}
			{loginPopup && (
				<LoginPopup
					onClose={() => {
						setLoginPopup(false);
					}}
				/>
			)}
		</>
	);
};

export default Lila;
