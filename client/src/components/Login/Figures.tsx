import React, { ReactNode } from 'react';
import { figures } from '../../data/figures';
import Figure from '../Figure';

interface FiguresProp {
	children?: ReactNode;
	setFigure: (index: number) => void;
	figure: number;
}

const Figures = ({ figure, setFigure }: FiguresProp) => {
	return (
		<div className='w-full flex flex-wrap '>
			{figures.map((fig, index) => {
				return (
					<div
						className={`hover:bg-slate-200 rounded-lg cursor-pointer ${figure == index && 'bg-orange-300'}`}
						key={index}
						onClick={() => {
							setFigure(index);
						}}>
						<Figure animation={true} className={`w-[45px] `} id={index} />
					</div>
				);
			})}
		</div>
	);
};

export default Figures;
