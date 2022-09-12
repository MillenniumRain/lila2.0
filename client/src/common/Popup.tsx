import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PopupProp {
	children: ReactNode;
	onClose?: (e: React.MouseEvent) => void;
	zIndex?: number;
}
const Popup = ({ children, onClose, zIndex = 30 }: PopupProp) => {
	const popupDiv = document.getElementById('popup') as HTMLDivElement;
	return createPortal(
		<div className={`fixed  w-screen h-screen top-0 left-0 flex justify-center items-center`} style={{ zIndex }}>
			<div
				className='absolute w-full h-full bg-black/50 cursor-pointer  to450:bg-black/80'
				onClick={onClose}
				onContextMenu={onClose}></div>
			<div className='flex justify-center items-center w-full h-full overflow-auto'>{children}</div>
		</div>,
		popupDiv
	);
};

export default Popup;
