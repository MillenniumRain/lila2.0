import React, { ReactNode } from 'react';

interface DotProp {
	children?: ReactNode;
	className?: string;
	dotWidth?: number;
}

const Dot = ({ className, dotWidth }: DotProp) => {
	return (
		<div
			className={`4px bg-[#333] shadow-dot rounded-full ${className || ''}`}
			style={{ width: `${dotWidth || 24}px`, height: `${dotWidth || 24}px` }}></div>
	);
};

export default Dot;
