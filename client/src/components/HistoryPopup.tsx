import React, { ReactNode, useEffect, useState } from 'react';
import Popup from '../common/Popup';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { gameSlice } from '../store/reducers/GameSlice';
import { interfaceSlice } from '../store/reducers/InterfaceSlice';
import { ReactComponent as CloseSvg } from '../assets/svg/close-svgrepo-com.svg';

interface HistoryPopupProp {
	children?: ReactNode;
}
const HistoryPopup = ({}: HistoryPopupProp) => {
	const id = useAppSelector((state) => state.game.id);
	const master = useAppSelector((state) => state.game.master);
	const players = useAppSelector((state) => state.game.players);
	const gameMap = useAppSelector((state) => state.game.gameMap);
	const activePlayerId = useAppSelector((state) => state.interface.activePlayerId) || id;
	const index = players.findIndex((player) => player.id == (activePlayerId || id));
	const history = players[index].history || { list: [], maxId: 1 };

	const [visibleInput, setVisibleInput] = useState(false);
	const [purpose, setPurpose] = useState(players[index].purpose);

	const dispatch = useAppDispatch();

	let input = [];
	const output = [];
	const count = window.screen.width < 500 ? 5 : 10;

	for (let i = 0; i < Math.ceil(history.list.length / count); i++) {
		input.push(
			<div className='flex flex-col ' key={-1}>
				<div className={`border border-slate-200 flex py-1 px-1 justify-center items-center w-[96px]`}>
					№ поля
				</div>{' '}
				<div className={`border border-slate-200 flex py-1 px-1  justify-center items-center w-[96px]`}>
					№ позиции
				</div>
			</div>
		);
		for (let ii = 0; ii < count; ii++) {
			const number = ii + count * i;
			const thought = history.list[number];

			if (thought) {
				input.push(
					<div className='relative flex flex-col cursor-pointer group ' key={thought.id}>
						{master ? (
							<div
								className='absolute  -top-[27px] text-lg z-10 bg-white  border-2 border-red-600  fill-red-600 hover:bg-red-600  hover:fill-white hidden  px-4 w-[52px] justify-center group-hover:flex  hover:flex  hover:border-white items-center'
								onClick={() => {
									dispatch(
										gameSlice.actions.masterDeleteThought({
											playerId: activePlayerId || id,
											thoughtId: thought.id,
										})
									);
								}}>
								<CloseSvg className='' />
							</div>
						) : null}
						<div
							className='border border-slate-200 flex py-1 px-4 min-w-[52px] justify-center group-hover:opacity-80 items-center '
							style={{ background: gameMap[thought.cardId || 0].bg + 'cf' }}
							onClick={() => {
								dispatch(
									interfaceSlice.actions.setThoughtsPopup({
										visible: true,
										activeCard: thought.cardId,
										pickedIdThought: thought.id,
									})
								);
							}}>
							{thought.cardId}
						</div>
						<div
							className='border border-slate-200 flex py-1 px-4   min-w-[52px] justify-center group-hover:opacity-80 items-center '
							style={{ background: gameMap[thought.cardId || 0].bg + 'cf' }}
							onClick={() => {
								dispatch(
									interfaceSlice.actions.setThoughtsPopup({
										visible: true,
										activeCard: thought.cardId,
										pickedIdThought: thought.id,
									})
								);
							}}>
							{thought.thoughtId}&nbsp;
						</div>
					</div>
				);
			} else {
				break;
			}
		}
		output.push(
			<div className='flex mb-2' key={i + 'o'}>
				{input}
			</div>
		);
		input = [];
	}

	return (
		<div className=''>
			<Popup
				onClose={() => {
					if (visibleInput) {
						dispatch(gameSlice.actions.setPurpose(purpose));
					}
					dispatch(interfaceSlice.actions.setHistoryPopup({ visible: false }));
				}}>
				<div className='bg-white  w-[800px] h-2/3 z-10 py-10 px-20 to450:px-4 overflow-x-auto'>
					<div className=''>
						<div
							className={`py-1 mb-2 text-lg   cursor-pointer group flex justify-between items-center`}
							onClick={() => {
								setVisibleInput(true);
							}}>
							<div className='flex'>
								<div className='font-bold mr-2'>Цель:</div>
								<div>{visibleInput ? '' : `${purpose}`}</div>
							</div>
							{visibleInput ? (
								<form
									className='w-full flex'
									onSubmit={(e) => {
										e.preventDefault();

										setVisibleInput(false);
										setPurpose(purpose);
										dispatch(gameSlice.actions.setPurpose(purpose));
									}}>
									<input
										value={purpose}
										onChange={(e) => {
											setPurpose(e.target.value);
										}}
										autoFocus
										type='text'
										className='w-full border-b-2 focus:outline-none focus:border-green-500 mr-2'
									/>
								</form>
							) : (
								<div className=' opacity-0 text-slate-500 font-normal text-sm group-hover:opacity-100'>
									изменить
								</div>
							)}
						</div>

						{<div className='text-lg font-bold mb-2'>История</div>}
						{output.length === 0 ? <div className=''>Истории нет</div> : output}
					</div>
				</div>
			</Popup>
		</div>
	);
};

export default HistoryPopup;
