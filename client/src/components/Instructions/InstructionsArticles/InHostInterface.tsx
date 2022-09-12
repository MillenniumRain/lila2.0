import React, { ReactNode } from 'react';
import Imgp from '../../../common/Imgp';
import gameHost from '../../../assets/img/instructions/gameHost.webp';
import menuMaster from '../../../assets/img/instructions/menuMaster.webp';
import historyDelete from '../../../assets/img/instructions/historyDelete.webp';
import move from '../../../assets/img/instructions/move.webp';
import rename from '../../../assets/img/instructions/rename.webp';

interface InHostInterfaceProp {
	children?: ReactNode;
	onClick: Function;
}

const InHostInterface = ({ onClick }: InHostInterfaceProp) => {
	return (
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Интерфейс ведущего</div>
			<div className='mb-4'>
				Ведущий подключается (скрытым для других игроков), может раскрыть себя и начать игру с клетки ноль (см.
				ниже пункт "скрыть игрока").
			</div>
			<div>
				<Imgp src={gameHost} alt='' click={false} />
			</div>
			<div className='mb-4'>Дополнительные возможности ведущего:</div>
			<div>
				<Imgp src={menuMaster} alt='Дополнительные возможности ведущего' />
			</div>
			<div className='mb-4'>
				Ведущий получает право кликать на игроков (клик по имени) открывает меню с дополнительными
				возможностями. Двойной клик на игроке открывает его историю{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'История / Цель');
					}}>
					(см. История ходов)
				</div>{' '}
				Ведущий может удалять ячейки из истории других игроков (см. ниже) при наведении мыши появиться крестик
				над строкой с номером поля
			</div>
			<div>
				<Imgp src={historyDelete} alt='' />
			</div>
			<div className=''>
				<div className='inline font-bold'>Просмотреть историю:</div> открывает историю и цель игрока
			</div>
			<div className=''>
				<div className='inline font-bold'>Передвинуть:</div> при нажатии загорается зеленым в этот момент вы
				можете передвинуть игрока на любую ячейку игрового поля{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Игровое поле');
					}}>
					(см. Игровое поле)
				</div>{' '}
				без записи в историю
			</div>
			<div>
				<Imgp src={move} click={false} />
			</div>
			<div className=''>
				<div className='inline font-bold'>Передать ход:</div> передает ход выбранному игроку, если произошла
				ситуация где ни у кого нет хода, Ведущему необходимо будет самому передать ход
			</div>
			<div className=''>
				<div className='inline font-bold'>Разочарование:</div> плюсом и минусом можно изменять количество
				разочарований у игрока, разочарования у игрока отображаются под играольной костью{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Разочарование');
					}}>
					(см. Разочарование)
				</div>
			</div>
			<div className=''>
				<div className='inline font-bold'>Переименовать:</div> открывает меню редактирование игрока (см. ниже)
			</div>
			<div>
				<Imgp src={rename} alt='' click={false} />
			</div>
			<div className=''>
				<div className='inline font-bold'>Новая игра:</div> ставит игрока на нулевую клетку, обнуляет историию и
				цель{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'История / Цель');
					}}>
					(см. История / Цель)
				</div>{' '}
			</div>
			<div className=''>
				<div className='inline font-bold'>Скрыть игрока:</div> скрывает игрока от остальных игроков кроме
				ведущих, отоборазить игрока заного можно этим же пунктом меню{' '}
			</div>
		</div>
	);
};

export default InHostInterface;
