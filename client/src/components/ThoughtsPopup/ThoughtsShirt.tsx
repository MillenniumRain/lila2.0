import React, { MouseEvent, ReactNode, useState } from 'react';
import CardImg from '../../common/CardImg';
import Popup from '../../common/Popup';
import { useAppSelector } from '../../hooks/hooks';
import Arrows from './Arrows';

interface ThoughtsShirtProp {
	children?: ReactNode;
	onContextMenu: (e: MouseEvent) => void;
	activeCardId: number;
}

const ThoughtsShirt = ({ onContextMenu, activeCardId }: ThoughtsShirtProp) => {
	const pickedIdThought = useAppSelector((state) => state.interface.pickedIdThought);

	return (
		<div className={`w-full flex justify-center cursor-pointer`} onContextMenu={onContextMenu}>
			{pickedIdThought && <Arrows id={activeCardId || 0} pickedIdThought={pickedIdThought} />}

			<CardImg id={activeCardId || 0} />
		</div>
	);
};

export default ThoughtsShirt;
