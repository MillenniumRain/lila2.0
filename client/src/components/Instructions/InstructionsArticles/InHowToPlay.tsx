import React, { ReactNode } from 'react';

interface InHowToPlayProp {
	children?: ReactNode;
	onClick: Function;
}

const InHowToPlay = ({ onClick }: InHowToPlayProp) => {
	return (
		<div className=''>
			<div>
				<div className='text-2xl font bold font-russo mb-4'>Краткое руководство для игры в "Лила Чакра"</div>
				<div className='mb-4'>1. Введите имя и нажмите войти в игру.</div>
				<div className='mb-4'>
					2. Откройте меню "история ходов", внутри укажите свою цель, если цель не выбрана, то вы можете
					сыграть на "Познай себя".
				</div>
				<div className='mb-4'>
					3. Бросайте кубик и ходите на выпавшее число, кликом левой кнопки мыши на ячейку игрового поля{' '}
					<div
						className='inline text-sky-700 hover:underline cursor-pointer ml-1'
						onClick={(e: React.MouseEvent<HTMLDivElement>) => {
							onClick(e, 'Игровое поле');
						}}>
						(см. Игровое поле)
					</div>
				</div>
				<div className='mb-4'>
					4. Кликнув правой кнопкой мыши на ячейку (где находится ваша фигура) игрового поля, откроется
					карточка, внизу карточки
					<div
						className='inline text-sky-700 hover:underline cursor-pointer ml-1'
						onClick={(e: React.MouseEvent<HTMLInputElement>) => {
							onClick(e, 'Карточка');
						}}>
						(см. Карточка)
					</div>{' '}
					есть инструкция, что делать дальше.
				</div>
				<div className='mb-4'>
					5. Если на карточке указано "бросайте кубик ещё раз", вы бросаете кубик и смотрите совпадает ли
					число выпавшее на кубике с числом на карточке о продолжении хода, в том случае если число на кубике
					не совпадает с цифрами на карточке, то перевенув ее вы можете выбрать кликом одну из противоречивых
					цитат на ваш выбор. Затем ход передается другому игроку, кнопкой "завершить ход"{' '}
					<div
						className='inline text-sky-700 hover:underline cursor-pointer ml-1'
						onClick={(e: React.MouseEvent<HTMLInputElement>) => {
							onClick(e, 'Кубик');
						}}>
						(см. внизу статьи Кубик)
					</div>
					.
				</div>
				<div className='mb-4'>6. Номер клетки выхода из игры 58 или 63.</div>
				<div className='mb-4'>
					6. Если игра отправила вас на "ноль", то вы либо заходите в игру с "разочарованием"
					<div
						className='inline text-sky-700 hover:underline cursor-pointer ml-1'
						onClick={(e: React.MouseEvent<HTMLInputElement>) => {
							onClick(e, 'Разочарование');
						}}>
						(см. Разочарование)
					</div>
					, либо меняете свою цель.
				</div>
				<div className='mb-4'>
					7. Если вы начинаете ход стоя на клетках с 59-ой до 62-ой и вам выпадает число на кубике больше чем
					вы можете походить, то в ничего не делаете и пропускаете ход.
				</div>
			</div>
		</div>
	);
};

export default InHowToPlay;
