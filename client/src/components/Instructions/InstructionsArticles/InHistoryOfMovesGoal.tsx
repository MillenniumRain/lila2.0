import React, { ReactNode } from 'react';
import Imgp from '../../../common/Imgp';
import purpose from '../../../assets/img/instructions/purpose.webp';
import history from '../../../assets/img/instructions/history.webp';

interface InHistoryOfMovesGoalProp {
	children?: ReactNode;
	onClick: Function;
}

const InHistoryOfMovesGoal = ({ onClick }: InHistoryOfMovesGoalProp) => {
	return (
		<div>
			<div className='text-2xl font bold font-russo mb-4'>История / Цель</div>
			<div className='mb-4'>Вверху окна История ходов есть место для записи цели</div>
			<div>
				<Imgp src={purpose} alt='' />
			</div>
			<div className='mb-4'>
				Кликнув на поле ввода можно изменить ее, сохранение цели происходит по нажатию на клавищу Enter на
				клавиатуре или по закрытию окна "История ходов"
			</div>
			<div className='mb-4'>
				Ниже представлен пример истории ходов. "№ поля" - это номер ячейки на игровом поле{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Игровое поле');
					}}>
					(см. Игровое поле)
				</div>
				. "№ позиции" - это то что вы выбираете на обратной стороне карточки при завершении хода{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Карточка');
					}}>
					(см. Карточка)
				</div>
				. Цвета ячеек говорят о том на какой чакре находится ячейка игрового поля
			</div>
			<div>
				<Imgp src={history} alt='История ходов' />
			</div>
		</div>
	);
};

export default InHistoryOfMovesGoal;
