import React, { ReactNode } from 'react';
import Imgp from '../../../common/Imgp';
import gameBoard from '../../../assets/img/instructions/gameBoard.webp';

interface InTheGameFieldProp {
	children?: ReactNode;
	onClick: Function;
}

const InTheGameField = ({ onClick }: InTheGameFieldProp) => {
	return (
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Игровое поле Лила Чакра</div>
			<div className='mb-4'>
				Игровое поле из 65 клеток. Игра начинается с нулевой ячейки. Каждая клетка со своим цветом чакры
				порядковым номером и гексаграммой.
				<div className='font-bold'> Управление:</div>
				<div className='indent-8'>
					клик ЛКМ (левая кнопка мыши) по ячейке, передвинет вас на нее, если текущий ход ваш;
				</div>
				<div className='indent-8 '>
					клик ПКМ (правая кнопка мыши) по ячейке, откроет карточку{' '}
					<div
						className='inline text-sky-600 hover:underline cursor-pointer '
						onClick={(e: React.MouseEvent<HTMLInputElement>) => {
							onClick(e, 'Карточка');
						}}>
						(см. Карточка).
					</div>
				</div>
				<div className=''> На ячейках которых находится игрок снизу ячейки отображается фигура игрока</div>
				<div className=''>
					{' '}
					Ячейка подсвечивается белым контуром в тот момент когда игрок находится на ней и продолжает ход
				</div>
			</div>
			<div>
				<Imgp src={gameBoard} alt='Игровое поле' />
			</div>
			<div className='mb-4'></div>
		</div>
	);
};

export default InTheGameField;
