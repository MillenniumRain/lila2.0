import React, { ReactNode } from 'react';
import HexagramLine from './HexagramLine';

interface HexagramProp {
	children?: ReactNode;
	hexagram: string[];
	hexagram_color: string;
}

const Hexagram = ({ hexagram, hexagram_color }: HexagramProp) => {
	return (
		<>
			<HexagramLine center={hexagram[0]} color={hexagram_color} />
			<HexagramLine center={hexagram[1]} color={hexagram_color} />
			<HexagramLine className='mb-[5px]' center={hexagram[2]} color={hexagram_color} />
			<HexagramLine center={hexagram[3]} color={hexagram_color} />
			<HexagramLine center={hexagram[4]} color={hexagram_color} />
			<HexagramLine center={hexagram[5]} color={hexagram_color} />
		</>
	);
};

export default Hexagram;
