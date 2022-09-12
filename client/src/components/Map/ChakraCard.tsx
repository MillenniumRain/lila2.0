import React, { ReactNode } from 'react';
import Figure from '../Figure';

interface ChakraCardProp {
	children?: ReactNode;
	chakra: number;
	clean?: boolean;
}

const ChakraCard = ({ chakra, clean = false }: ChakraCardProp) => {
	return (
		<div
			className={`overflow-hidden relative   p-[3px] border-[#15323d]  flex justify-between  items-center  transition-all ${
				clean ? 'w-[calc(100vw/10)] h-[calc(100vw/10)] max-h-[90px] max-w-[90px]' : 'w-cell h-cell'
			}`}>
			<Figure className=' flex items-center justify-center w-[80%]  mx-auto' id={chakra} />
		</div>
	);
};

export default ChakraCard;
