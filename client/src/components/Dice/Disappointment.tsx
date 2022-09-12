import React, { ReactNode } from 'react';

interface DisappointmentProp {
	children?: ReactNode;
	index: number;
	length: number;
}

const Disappointment = ({ length, index }: DisappointmentProp) => {
	return (
		<div
			className={`relative w-[220px] h-[95px] bg-white z-10 border-[1px] right-0 transition-all overflow-hidden border-[#15323d] ${
				length - 1 === index && 'absolute group-hover:right-[30px] group-hover:w-[400px] group-hover:h-[220px]'
			} ${index === 0 ? '' : 'mt-[-75px]'}`}>
			<div className={`font-bold text-lg flex justify-center`}> Разочарование</div>
			<div className={`font-bold text-sm flex justify-center text-center mb-2`}>
				"Разочарование" утяжеляет шаг! Число, выпавшее в начале хода при первом броске кубика, уменьшается на
				количество накопленных "Разочарований"
			</div>
			<div className={`text-sm flex justify-center text-center mb-2`}>
				Например, если у Вас 5 "Разочарований", то продвижение возможно только на одну клетку и то только в том
				случае, если у Вас выпадает шесть очков
			</div>
			<div className={`font-bold text-sm flex justify-center text-center mb-2`}>
				"Разочарование" не влияет на продолжение хода, на повторные броски
			</div>
		</div>
	);
};

export default Disappointment;
