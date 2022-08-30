import React, { ReactNode } from 'react';
import { ICard } from '../../store/reducers/GameSlice';
import RowMap from './RowMap';

interface MapProp {
	children?: ReactNode;
	dataMap: ICard[];
	clean?: boolean;
}

const Map = ({ dataMap, clean = false }: MapProp) => {
	dataMap.shift();
	const map = [];
	for (let i = 0; i < 8; i++) {
		map.push(
			<div className='flex' key={dataMap[i].id}>
				<RowMap lineNumber={i} key={i} map={dataMap} clean={clean} />
			</div>
		);
	}
	return <>{map}</>;
};

export default Map;
