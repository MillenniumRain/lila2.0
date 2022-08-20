import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PopupProp {
	children: ReactNode;
	onClose: (e: React.MouseEvent) => void;
}
const Popup = ({ children, onClose }: PopupProp) => {
	const popupDiv = document.getElementById('popup') as HTMLDivElement;
	return createPortal(
		<div className={'fixed  w-screen h-screen top-0 left-0 flex justify-center items-center z-50'}>
			<div
				className='absolute w-full h-full bg-black/50 cursor-pointer'
				onClick={onClose}
				onContextMenu={onClose}></div>
			<div className='flex justify-center items-center w-full h-full overflow-auto'>{children}</div>
		</div>,
		popupDiv
	);
};

export default Popup;
