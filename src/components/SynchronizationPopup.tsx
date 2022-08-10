import React, { ReactNode } from 'react';
import Popup from '../common/Popup';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { gameSlice } from '../store/reducers/GameSlice';
import { interfaceSlice } from '../store/reducers/InterfaceSlice';
import RowMap from './RowMap';

interface SynchronizationPopupProp {
	children?: ReactNode;
	onClose: () => void;
}

const SynchronizationPopup = ({ onClose }: SynchronizationPopupProp) => {
	const dispatch = useAppDispatch();
	const gameMap = [...useAppSelector((state) => state.game.gameMap)];
	gameMap.shift();
	const map = [];
	for (let i = 0; i < 8; i++) {
		map.push(
			<div className='flex' key={gameMap[i].id}>
				<RowMap lineNumber={i} key={i} map={gameMap} clean={true} />
			</div>
		);
	}
	return (
		<div className=''>
			<Popup onClose={onClose}>
				<div className='flex flex-col-reverse justify-center items-center w-max relative'>{map}</div>
			</Popup>
		</div>
	);
};

export default SynchronizationPopup;
