import React, { ReactNode } from 'react';
import { figures } from '../data/figures';

interface FigureProp {
	children?: ReactNode;
	className: string;
	id: number;
	animation?: boolean;
}

const Figure = ({ id, className }: FigureProp) => {
	return <div className={className}>{figures[id]}</div>;
};

export default Figure;
