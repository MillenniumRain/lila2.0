import React, { ReactNode } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { IPlayer } from '../../../store/reducers/GameSlice';
import Figure from '../../Figure';

interface PositionProp {
	children?: ReactNode;
	id: number;
	players: IPlayer[];
}

const Position = ({ id, players }: PositionProp) => {
	return (
		<>
			{players.map((player) => {
				if (player.position === id)
					return (
						<div className=' text-lg' style={{ color: player.color }} key={player.id}>
							{!player.ignored && !player.disconnected && (
								<Figure animation={!player.disconnected} className='w-[30px]' id={player.figure} />
							)}
						</div>
					);
				return '';
			})}
		</>
	);
};

export default Position;
