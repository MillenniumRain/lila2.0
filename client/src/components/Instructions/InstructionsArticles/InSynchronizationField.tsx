import React, { ReactNode } from 'react';
import Imgp from '../../../common/Imgp';
import gameBoardSync from '../../../assets/img/instructions/gameBoardSync.webp';

interface InSynchronizationFieldProp {
	children?: ReactNode;
	onClick: Function;
}

const InSynchronizationField = ({ onClick }: InSynchronizationFieldProp) => {
	return (
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Поле синхронизации</div>
			<div className='mb-4'>
				Поле синхронизации нужно игроку для сонастройки с полем игры. Для установления ментального контакта с
				игровым полем зафиксируйте свой взгляд на этом рисунке, проникнитесь многоплановостью древних символов,
				ощутите цвета чакр, пройдитесь по ним от красного к белому, осознавая свои ощущения от каждого ряда,
				каждого цвета, это сакральное изображения поля жизни.
			</div>
			<div className='mb-4'>Закрыть можете по клику на любое свободное пространство вне поля синхронизации</div>
			<div>
				<Imgp src={gameBoardSync} alt='Поле синхронизации для сонастройки' />
			</div>
		</div>
	);
};

export default InSynchronizationField;
