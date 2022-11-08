import React, { ReactNode } from 'react';
import Imgp from '../../../common/Imgp';
import card from '../../../assets/img/instructions/card.webp';
import cardShirt from '../../../assets/img/instructions/cardShirt.webp';

interface InCardProp {
	children?: ReactNode;
	onClick: Function;
}

const InCard = ({ onClick }: InCardProp) => {
	return (
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Карточка</div>
			<div>
				<Imgp src={card} alt='Карточка номер 28. Чрезмерная забота' />
			</div>
			<div className='mb-4'>
				При нажатии на ячейку на игровом поле{' '}
				<div
					className='inline text-sky-600 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Игровое поле');
					}}>
					(см. Игровое поле)
				</div>{' '}
				открывается одна из 65 карточек соответствующая номеру на который вы нажали. Карточка определяет ваши
				дальнейшие действия. На каждой карточке есть повествование которое дает игроку дополнительную почву для
				размышления.
			</div>
			<div className='mb-4'>
				Кнопка "Перевернуть карточку" или нажатие на карточку левой или правой кнопкой мыши перевернет карточку,
				на обратной стороне карточки игроку предлагается несколько противоречивых мыслей на выбор при завершении
				хода.
			</div>
			<div>
				<Imgp src={cardShirt} alt='Обратная сторона карточка номер 28. Чрезмерная забота' />
			</div>
		</div>
	);
};

export default InCard;
