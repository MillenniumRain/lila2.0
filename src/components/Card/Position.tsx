import React, { ReactNode } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import Figure from '../Figure';

interface PositionProp {
	children?: ReactNode;
	id: number;
}

const Position = ({ id }: PositionProp) => {
	const players = useAppSelector((state) => state.game.players);

	return (
		<>
			{players?.length &&
				players.map((player) => {
					if (player.position === id)
						return (
							<div className=' text-lg' style={{ color: player.color }} key={player.id}>
								<Figure className='w-[30px]' id={player.figure - 1} />
							</div>
						);
					return '';
				})}
		</>
	);
};

export default Position;
