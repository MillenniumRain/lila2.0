import React, { ReactNode } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { ICard } from '../../store/reducers/GameSlice';
import Card from './Card/Card';

interface RowMapProp {
	lineNumber: number;
	children?: ReactNode;
	map: ICard[];
	clean?: boolean;
}

const RowMap = ({ lineNumber, map, clean }: RowMapProp) => {
	const dispath = useAppDispatch();

	const line = [];
	for (let i = 0 + 8 * lineNumber; i < 9 + 8 * lineNumber - 1; i++) {
		line.push(<Card card={map[i]} key={i} clean={clean} />);
	}
	return <>{line}</>;
};

export default RowMap;
