import React, { ReactNode } from 'react';
import Imgp from '../../../common/Imgp';
import menu from '../../../assets/img/instructions/menu.webp';

interface InMenuProp {
	children?: ReactNode;
	onClick: Function;
}

const InMenu = ({ onClick }: InMenuProp) => {
	return (
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Меню игры</div>
			<div className='mb-4'></div>
			<div className='flex gap-3 to450:flex-col'>
				<div className='w-1/2  to450:w-full'>
					<Imgp src={menu} alt='' />
				</div>
				<div className='w-1/2 to450:w-full'>
					<div>Меню делится на три зоны:</div>
					<div>
						<div className='inline font-bold'>1. История ходов</div>{' '}
						<div
							className='inline text-sky-700 hover:underline cursor-pointer '
							onClick={(e: React.MouseEvent<HTMLInputElement>) => {
								onClick(e, 'История / Цель');
							}}>
							(см. История / Цель)
						</div>
						<div className='font-bold'>2. Список игроков </div>
						<div className=''>
							Первой строкой в списке отображается, подключился ли ведущий или нет (то как видит это
							ведущий{' '}
							<div
								className='inline text-sky-700 hover:underline cursor-pointer '
								onClick={(e: React.MouseEvent<HTMLInputElement>) => {
									onClick(e, 'Интерфейс ведущего');
								}}>
								см. Интерфейс ведущего
							</div>
							).
						</div>
						<div>
							Каждый игрок отображается в порядке <br /> подключение к комнате (к игре). Сперва значок
							"персоны", он показывает вас в списке. Затем имя игрока, потом выброшенный кубик{' '}
							<div
								className='inline text-sky-700 hover:underline cursor-pointer '
								onClick={(e: React.MouseEvent<HTMLInputElement>) => {
									onClick(e, 'Кубик');
								}}>
								(см. Кубик)
							</div>
							, если кубик никто не
						</div>
					</div>
				</div>
			</div>
			<div className='mt-[-11px]'>
				бросал это место остается пустым, следующим показывается позиция игрока и его фигурка.{' '}
			</div>
			<div className=' italic'>Игрок, который ходит, подсвечивается белым.</div>
			<div className='inline font-bold'>3. Синхронизироваться с полем</div>{' '}
			<div
				className='inline text-sky-700 hover:underline cursor-pointer '
				onClick={(e: React.MouseEvent<HTMLInputElement>) => {
					onClick(e, 'Поле синхронизации');
				}}>
				(см. Поле синхронизации)
			</div>
		</div>
	);
};

export default InMenu;
