import React, { ReactNode } from 'react';
import Popup from '../common/Popup';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { gameSlice } from '../store/reducers/GameSlice';
import { interfaceSlice } from '../store/reducers/InterfaceSlice';
import ReactCSSTransitionGroup from 'react-transition-group';
import bg from './../assets/img/bg_space.webp';
import RowMap from './Map/RowMap';
import Map from './Map/Map';
import ChakraColumn from './Map/ChakraColumn';

interface SynchronizationPopupProp {
	children?: ReactNode;
}

const SynchronizationPopup = ({}: SynchronizationPopupProp) => {
	const dispatch = useAppDispatch();
	const gameMap = [...useAppSelector((state) => state.game.gameMap)];

	return (
		<Popup onClose={() => {}} zIndex={50}>
			<div className=''>
				<img src={bg} className='fixed bottom-0 left-0 top-0 right-0 w-screen h-screen object-cover'></img>
				<div
					className='fixed bottom-0 left-0 top-0 right-0 w-screen h-screen bg-black/50 cursor-pointer'
					onClick={() => {
						dispatch(interfaceSlice.actions.setSynchronizationPopup(false));
					}}></div>
				<div
					className='fixed right-0 top-0 p-4 text-white cursor-pointer hover:bg-white/30'
					onClick={() => {
						dispatch(interfaceSlice.actions.setSynchronizationPopup(false));
					}}>
					🗙
				</div>
				<div className='flex flex-col-reverse justify-center items-center w-max relative'>
					<ChakraColumn className={`absolute bottom-0 -left-cell`} />
					<Map dataMap={gameMap} clean={true} />
					<ChakraColumn className={`absolute bottom-0 -right-cell`} />
				</div>
			</div>
		</Popup>
	);
};

export default SynchronizationPopup;
