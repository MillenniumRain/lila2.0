import React, { ReactNode } from 'react';
import Imgp from '../../../common/Imgp';
import dice from '../../../assets/img/instructions/dice.webp';
import dices from '../../../assets/img/instructions/dices.webp';
import menuItemDice from '../../../assets/img/instructions/menuItemDice.webp';
import endTurn from '../../../assets/img/instructions/endTurn.webp';

interface InCubeProp {
	children?: ReactNode;
	onClick: Function;
}

const InCube = ({ onClick }: InCubeProp) => {
	return (
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Игральна кость для игры</div>
			<div className='mb-4'>
				Для того чтобы бросить кубик, необходимо зажать на нем левой кнопкой мыши и держать сколько угодно затем
				отпустить и через несколько мгновений кубик плавно остановится. О том в каком состоянии находится кубик
				будут сигнализировать фазы: перемешивается и останавливается
			</div>
			<div>
				<Imgp src={dice} alt='' click={false} />
			</div>
			<div className='mb-4'>
				Если вы хотите бросать свой настоящий кубик и вписывать в программу номер выпавший на кубике то следует
				нажать на игральную кость правой кнопкой мыши и появится меню выбора
			</div>
			<div>
				<Imgp src={dices} alt='' click={false} />
			</div>
			<div className='mb-4'>
				После того как вы выберите кубик или сгенерируется для вас, все игроки узнают об этом в списке игроков
				(см. ниже)
			</div>
			<div>
				<Imgp src={menuItemDice} alt='' click={false} />
			</div>
			<div className=''>
				Для того чтобы передать ход следующему игроку необходимо нажать на "Завершить ход" в правом нижнем углу
				экрана
			</div>
			<div className='mb-4'>
				Кнопка "Завершить ход" появляется только когда в игре авторизовано более двух игроков
			</div>
			<div>
				<Imgp src={endTurn} alt='' click={false} />
			</div>
		</div>
	);
};

export default InCube;
