import React, { ReactNode } from 'react';
import Imgp from '../../../common/Imgp';
import gameScreen from '../../../assets/img/instructions/gameScreen.webp';

interface InIntroductionProp {
	children?: ReactNode;
	onClick: Function;
}

const InIntroduction = ({ onClick }: InIntroductionProp) => {
	return (
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Онлайн площадка для игры в "Лила Чакра"</div>
			<div>
				<Imgp src={gameScreen} alt='Главный экран Лила Чакра' />
			</div>
			<div className='mb-4'>
				"Лила Чакра" - это эзотерическая игра, на любую поставленную цель. Во время сеанса для игрока
				открывается возможность доступа к информационному полю в поисках ответа на внутренние вопросы. Это
				практика по установлению связи со своим высшим Я. Во время сеанса поле игры проявляет ключевые моменты в
				сознании, на которые нужно обратить внимание, чтобы достигнуть жизненную цель.
			</div>
		</div>
	);
};

export default InIntroduction;
