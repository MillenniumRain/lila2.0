import React, { ReactNode, useState } from 'react';
import Popup from '../../common/Popup';
import MasterLogin from './MasterLogin';
import PlayerLogin from './PlayerLogin';

interface LoginPopupProp {
	children?: ReactNode;
}

const LoginPopup = ({}: LoginPopupProp) => {
	const [selectedTab, setSelectedTab] = useState(0);
	return (
		<Popup onClose={() => {}}>
			<div className='flex flex-col'>
				<div className='flex z-10'>
					<div
						className={`px-4 py-2  ${
							selectedTab === 0 ? 'bg-white' : 'bg-slate-500 cursor-pointer hover:bg-slate-300'
						}`}
						onClick={() => {
							setSelectedTab(0);
						}}>
						Игрок
					</div>
					<div
						className={`px-4 py-2  ${
							selectedTab === 1 ? 'bg-white' : 'bg-slate-500 cursor-pointer hover:bg-slate-300'
						}`}
						onClick={() => {
							setSelectedTab(1);
						}}>
						Ведущий
					</div>
				</div>

				<div className='bg-white  w-[400px]  z-10 px-10 py-5 overflow-x-auto'>
					{selectedTab === 0 ? <PlayerLogin /> : <MasterLogin />}
				</div>
			</div>
		</Popup>
	);
};

export default LoginPopup;
