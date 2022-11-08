import React, { ReactNode } from 'react';
import Imgp from '../../../common/Imgp';
import disappointments from '../../../assets/img/instructions/disappointments.webp';

interface InDisappointmentProp {
	children?: ReactNode;
	onClick: Function;
}

const InDisappointment = ({ onClick }: InDisappointmentProp) => {
	return (
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Разочарование</div>
			<div className='mb-4'>
				Разочарование получается когда вас игра выбрасывает на ноль и вы решаетесь не менять цель и зайти в игру
				снова, тогда ведущий выдаст вам карточку "разочарование"{' '}
				<div
					className='inline text-sky-600 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Интерфейс ведущего');
					}}>
					(см. Интерфейс ведущего)
				</div>
			</div>
			<div className='mb-4'>
				Чтобы посмотреть полное описание карты "разочарования" навидите мышь на эту карточку
			</div>
			<div className='mb-4'>Вы начинаете игру с нулем разочарований</div>
			<div>
				<Imgp src={disappointments} alt='' click={false} />
			</div>
			<div className='relative  bg-white z-10 border-[1px] transition-all overflow-hidden border-[#15323d]  group-hover:w-[400px] group-hover:h-[220px] '>
				<div className='font-bold text-lg flex justify-center'> Разочарование</div>
				<div className='font-bold text-sm flex justify-center text-center mb-2'>
					"Разочарование" утяжеляет шаг! Число, выпавшее в начале хода при первом броске кубика, уменьшается
					на количество накопленных "Разочарований"
				</div>
				<div className='text-sm flex justify-center text-center mb-2'>
					Например, если у Вас 5 "Разочарований", то продвижение возможно только на одну клетку и то только в
					том случае, если у Вас выпадает шесть очков
				</div>
				<div className='font-bold text-sm flex justify-center text-center mb-2'>
					"Разочарование" не влияет на продолжение хода, на повторные броски
				</div>
			</div>
		</div>
	);
};

export default InDisappointment;
