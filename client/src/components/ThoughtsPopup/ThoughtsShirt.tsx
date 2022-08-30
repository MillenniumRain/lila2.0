import React, { MouseEvent, ReactNode } from 'react';
import CardImg from '../../common/CardImg';
import { useAppSelector } from '../../hooks/hooks';
import Arrows from './Arrows';

interface ThoughtsShirtProp {
	children?: ReactNode;
	onContextMenu: (e: MouseEvent) => void;
}

const ThoughtsShirt = ({ onContextMenu }: ThoughtsShirtProp) => {
	const activeCardId = useAppSelector((state) => state.interface.activeCard) || 0;
	return (
		<div
			className={`w-full flex justify-center cursor-pointer`}
			onClick={onContextMenu}
			onContextMenu={onContextMenu}>
			{/* <Arrows className={`hover:bg-black/20`} id={activeCardId} /> */}

			<CardImg id={activeCardId} />
		</div>
	);
};

export default ThoughtsShirt;
