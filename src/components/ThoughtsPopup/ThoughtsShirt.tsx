import React, { ReactNode } from 'react';
import CardImg from '../../common/CardImg';
import { useAppSelector } from '../../hooks/hooks';
import Arrows from './Arrows';

interface ThoughtsShirtProp {
	children?: ReactNode;
}

const ThoughtsShirt = ({}: ThoughtsShirtProp) => {
	const activeCardId = useAppSelector((state) => state.interface.activeCard) || 0;
	return (
		<div className={`w-full flex justify-center`}>
			<Arrows className={`hover:bg-black/20`} id={activeCardId} />
			<CardImg id={activeCardId} />
		</div>
	);
};

export default ThoughtsShirt;
