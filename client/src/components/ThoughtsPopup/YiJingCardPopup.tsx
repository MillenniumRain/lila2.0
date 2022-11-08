import React, { ReactNode, useState } from 'react';
import Popup from '../../common/Popup';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import { ReactComponent as SvgClose } from './../../assets/svg/close-svgrepo-com.svg';
import YiJingCardImg from '../../common/YiJingCardImg';

interface YiJingCardPopupProp {
	children?: ReactNode;
	onClose: () => void;
}

const YiJingCardPopup = ({ onClose }: YiJingCardPopupProp) => {
	const dispatch = useAppDispatch();
	const activeCardId = useAppSelector((state) => state.interface.activeCard);

	return (
		<Popup
			onClose={() => {
				onClose();
			}}>
			<div className={`relative h-full flex justify-center cursor-pointer`}>
				<YiJingCardImg id={activeCardId || 0} />
				<div
					className='absolute right-0 top-0 hover:fill-sky-300  fill-black p-2  cursor-pointer'
					onClick={() => {
						onClose();
					}}>
					<SvgClose className=' ' />
				</div>
			</div>
		</Popup>
	);
};

export default YiJingCardPopup;
