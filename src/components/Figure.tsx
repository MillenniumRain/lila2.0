import React, { ReactNode } from 'react';
import { figures } from '../data/figures';

interface FigureProp {
	children?: ReactNode;
	className?: string;
	id: number;
	animation?: boolean;
}

const Figure = ({ id, className, animation }: FigureProp) => {
	return <div className={`${className || ''}  ${animation ? 'animate-spin-slow' : ''}`}>{figures[id]}</div>;
};

export default Figure;
