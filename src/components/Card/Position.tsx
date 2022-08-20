import React, { ReactNode } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { IPLayer } from '../../store/reducers/GameSlice';
import Figure from '../Figure';

interface PositionProp {
	children?: ReactNode;
	id: number;
	players: IPLayer[];
}

const Position = ({ id, players }: PositionProp) => {
	return (
		<>
			{players.map((player) => {
				if (player.position === id)
					return (
						<div className=' text-lg' style={{ color: player.color }} key={player.id}>
							<Figure animation={!player.disconnected} className='w-[30px]' id={player.figure} />
						</div>
					);
				return '';
			})}
		</>
	);
};

export default Position;
