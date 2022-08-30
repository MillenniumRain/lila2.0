import React from 'react';

interface IHexagramLine {
	center: string;
	color: string;
	className?: string;
}
const HexagramLine = ({ center, color, className }: IHexagramLine) => {
	return (
		<div className={`flex  last:mb-0 ${className || 'mb-[3px]'}`}>
			<div className='w-[10px] h-[2px]' style={{ background: color }}></div>
			<div className='w-[10px] h-[2px] ' style={{ background: center === '1' ? color : '' }}></div>
			<div className='w-[10px] h-[2px]' style={{ background: color }}></div>
		</div>
	);
};

export default HexagramLine;
