import React, { ReactNode } from 'react';
import Dot from './Dot';

interface DiceTemplateProp {
	children?: ReactNode;
	dotWidth?: number;
	width?: number;
	number: number;
}

const DiceTemplate = ({ number, width, dotWidth }: DiceTemplateProp) => {
	const dices = [
		<div className={`flex justify-center items-center w-full h-full`}>
			<Dot dotWidth={dotWidth} />
		</div>,
		<div className={`flex justify-between h-full`}>
			<Dot dotWidth={dotWidth} />
			<Dot dotWidth={dotWidth} className='self-end' />
		</div>,
		<div className={`flex justify-between h-full`}>
			<Dot dotWidth={dotWidth} />
			<Dot dotWidth={dotWidth} className='self-center' />
			<Dot dotWidth={dotWidth} className='self-end' />
		</div>,
		<div className='flex justify-between h-full'>
			<div className='flex flex-col justify-between'>
				<Dot dotWidth={dotWidth} />
				<Dot dotWidth={dotWidth} />
			</div>
			<div className='flex flex-col justify-between'>
				<Dot dotWidth={dotWidth} />
				<Dot dotWidth={dotWidth} />
			</div>
		</div>,
		<div className='flex justify-between h-full'>
			<div className='flex flex-col justify-between'>
				<Dot dotWidth={dotWidth} />
				<Dot dotWidth={dotWidth} />
			</div>
			<Dot dotWidth={dotWidth} className='self-center' />
			<div className='flex flex-col justify-between'>
				<Dot dotWidth={dotWidth} />
				<Dot dotWidth={dotWidth} />
			</div>
		</div>,
		<div className='flex justify-between h-full'>
			<div className='flex flex-col justify-between'>
				<Dot dotWidth={dotWidth} />
				<Dot dotWidth={dotWidth} />
				<Dot dotWidth={dotWidth} />
			</div>
			<div className='flex flex-col justify-between'>
				<Dot dotWidth={dotWidth} />
				<Dot dotWidth={dotWidth} />
				<Dot dotWidth={dotWidth} />
			</div>
		</div>,
	];
	return (
		<div
			className={` bg-[#e7e7e7] ${width ? 'p-[3px]' : 'shadow-dice p-2'} rounded-[10%]`}
			style={{ width: `${width || 104}px`, height: `${width || 104}px` }}>
			{dices[number]}
		</div>
	);
};

export default DiceTemplate;
