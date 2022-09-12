import React, { createRef, ReactNode, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import SynchronizationPopup from '../SynchronizationPopup';
import MenuItem from './MenuItem';
import { ReactComponent as SvgMenu } from './../../assets/svg/circular-menu-svgrepo-com.svg';
import { ReactComponent as SvgClose } from './../../assets/svg/close-svgrepo-com.svg';
interface MenuProp {
	children?: ReactNode;
}

const Menu = ({}: MenuProp) => {
	const dispatch = useAppDispatch();
	const players = useAppSelector((player) => player.game.players);
	const master = useAppSelector((player) => player.game.master);
	const id = useAppSelector((player) => player.game.id);
	const [hideMenu, setHideMenu] = useState(true);
	const synchronizationPopup = useAppSelector((state) => state.interface.synchronizationPopup);

	const { name } = players.find((player) => player.turn) || {};
	const leading =
		players.find((player) => player.master && player.ignored && !player.disconnected && player.id !== id) || null;
	const hideMenuScreen = (flag = false) => {
		if (window.screen.width < 450) {
			setHideMenu(flag);
		}
	};
	useEffect(() => {
		setHideMenu(false);
	}, []);
	return (
		<div
			className={`fixed top-0 w-[340px] transition-[left] h-screen  ${
				hideMenu ? '-left-[calc(340px)] z-30' : 'left-0  to450:w-[calc(100vw-40px)] z-40'
			} `}
			style={{ maxHeight: '-webkit-fill-available' }}>
			<button
				onClick={() => {
					setHideMenu((prev) => !prev);
				}}
				className='absolute block  w-[40px] h-[40px] top-0 right-[-40px] color-white  fill-white hover:scale-105 '>
				{hideMenu ? (
					<div className='p-1'>
						<SvgMenu />
					</div>
				) : (
					<div className={`fill-white bg-black/90 w-full h-full flex justify-center items-center`}>
						<SvgClose />
					</div>
				)}
			</button>
			<div className={` flex flex-col h-screen  w-full  bg-black/50   to450:bg-black/90`}>
				<button
					className='bg-slate-200 py-2  hover:opacity-80   cursor-pointer  font-russo break-words uppercase'
					onClick={() => {
						dispatch(interfaceSlice.actions.setHistoryPopup({ visible: true }));
						hideMenuScreen(true);
					}}>
					История ходов / Цель
				</button>

				<div className=' overflow-y-auto'>
					{leading ? (
						<div className='flex  justify-between items-center min-h-[40px] border-b-2 font-russo select-none text-white bg-black px-2 pt-[3px] opacity-60'>
							<div className='flex items-center relative'>
								<div className='whitespace-nowrap overflow-hidden overflow-ellipsis  mr-1'>
									Ведущий в игре
								</div>
							</div>
						</div>
					) : null}

					{players.map((player) => {
						if (!master) {
							if (player.ignored) return null;
						}

						return <MenuItem player={player} key={player.id} hideMenu={() => hideMenuScreen(true)} />;
					})}
				</div>
				<div className=' absolute bottom-0 w-full'>
					<div className='text-white  text-[12px]'> Ход игрока: {name}</div>
					{/* <div className='text-white mb-1 text-[12px]'> Количество игроков: {players.length}</div> */}
					<button
						className='bg-slate-200 py-2 w-full font-russo hover:opacity-80 cursor-pointer break-words uppercase'
						onClick={() => {
							dispatch(interfaceSlice.actions.setSynchronizationPopup(true));
							hideMenuScreen(true);
						}}>
						Синхронизироваться с полем
					</button>
				</div>

				{synchronizationPopup && <SynchronizationPopup />}
			</div>
		</div>
	);
};

export default Menu;
