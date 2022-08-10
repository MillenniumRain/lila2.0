import React from 'react';
import RowMap from './components/RowMap';
import HistoryPopup from './components/HistoryPopup';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { interfaceSlice } from './store/reducers/InterfaceSlice';
import ThoughtsPopup from './components/ThoughtsPopup/ThoughtsPopup';
import Menu from './components/Menu';
import bg from './img/bg_space.jpg';
function App() {
	const dataMap = [...useAppSelector((state) => state.game.gameMap)];
	const thoughtsPopup = useAppSelector((state) => state.interface.thoughtsPopup);
	const historyPopup = useAppSelector((state) => state.interface.historyPopup);
	const dispatch = useAppDispatch();
	// const zero = dataMap[0];
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
		<div>
			<div
				className='fixed top-0 left-0 h-screen  w-full   bg-center object-cover'
				style={{
					background: `rgba(0, 0, 0, 0) url("${bg}") no-repeat scroll 0% / 100%`,
				}}></div>
			<div className='flex justify-center items-center h-screen'>
				<div className='flex flex-col-reverse justify-center items-center w-max relative'>{map}</div>
			</div>
			<Menu />
			{thoughtsPopup && <ThoughtsPopup />}
			{historyPopup && <HistoryPopup />}
		</div>
	);
}

export default App;
