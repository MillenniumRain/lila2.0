import React, { ReactNode } from 'react';

interface InstructionsMenuItem {
	children?: ReactNode;
	text: string;
	active: string;
	onClick: () => void;
}

const InstructionsMenuItem = ({ text, active, onClick }: InstructionsMenuItem) => {
	return (
		<div
			className={`px-4 py-1 w-full cursor-pointer hover:font-bold ${
				active === text ? 'bg-sky-700 font-bold text-white' : ''
			}`}
			onClick={onClick}>
			{text}
		</div>
	);
};

export default InstructionsMenuItem;
