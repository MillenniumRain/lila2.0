import React, { ReactNode } from 'react';
import Figure from '../Figure';

interface ChakraCardProp {
	children?: ReactNode;
	chakra: number;
}

const ChakraCard = ({ chakra }: ChakraCardProp) => {
	return (
		<div
			className={`overflow-hidden relative w-cell h-cell  p-[3px] border-[#15323d]  flex justify-between  items-center  transition-all `}>
			<Figure className=' flex items-center justify-center w-[80%]  mx-auto' id={chakra} />
		</div>
	);
};

export default ChakraCard;
