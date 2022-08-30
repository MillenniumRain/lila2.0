import React, { ReactNode } from 'react';
import ChakraCard from './ChakraCard';

interface ChakraColumnProp {
	children?: ReactNode;
	className?: string;
}

const ChakraColumn = ({ className }: ChakraColumnProp) => {
	return (
		<div className={`flex flex-col ${className}`}>
			<ChakraCard chakra={0} />
			<ChakraCard chakra={1} />
			<ChakraCard chakra={2} />
			<ChakraCard chakra={3} />
			<ChakraCard chakra={4} />
			<ChakraCard chakra={5} />
			<ChakraCard chakra={6} />
			<ChakraCard chakra={7} />
		</div>
	);
};

export default ChakraColumn;
