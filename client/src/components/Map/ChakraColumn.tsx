import React, { ReactNode } from 'react';
import ChakraCard from './ChakraCard';

interface ChakraColumnProp {
	children?: ReactNode;
	className?: string;
	clean?: boolean;
}

const ChakraColumn = ({ className, clean = false }: ChakraColumnProp) => {
	return (
		<div className={`flex flex-col ${className}`}>
			<ChakraCard chakra={0} clean={clean} />
			<ChakraCard chakra={1} clean={clean} />
			<ChakraCard chakra={2} clean={clean} />
			<ChakraCard chakra={3} clean={clean} />
			<ChakraCard chakra={4} clean={clean} />
			<ChakraCard chakra={5} clean={clean} />
			<ChakraCard chakra={6} clean={clean} />
			<ChakraCard chakra={7} clean={clean} />
		</div>
	);
};

export default ChakraColumn;
