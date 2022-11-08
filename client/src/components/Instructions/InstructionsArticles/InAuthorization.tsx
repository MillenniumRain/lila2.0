import React, { ReactNode } from 'react';
import Imgp from '../../../common/Imgp';
import loginAsPlayer from '../../../assets/img/instructions/loginAsPlayer.webp';
import loginAsMaster from '../../../assets/img/instructions/loginAsMaster.webp';
import loginAsMasterFull from '../../../assets/img/instructions/loginAsMasterFull.webp';

interface InAuthorizationProp {
	children?: ReactNode;
	onClick: Function;
}

const InAuthorization = ({ onClick }: InAuthorizationProp) => {
	return (
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Авторизация игрока</div>
			<div className='flex gap-2'>
				<div className='mb-4 w-1/2'>
					Игрок пишет свое имя, затем выбирает себе фишку которой будет играть и жмет войти в игру
				</div>
				<div className='w-1/2'>
					<Imgp src={loginAsPlayer} alt='' />
				</div>
			</div>
			<div className='text-2xl font bold font-russo mb-4'>Авторизация ведущего</div>
			<div className=' '>
				Ведущий вводит пароль дающий право к дополнительным возможностям
				<div
					className='inline text-sky-600 hover:underline cursor-pointer ml-1'
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Интерфейс ведущего');
					}}>
					(см. Интерфейс ведущего)
				</div>
			</div>
			<div className='mb-4 '>
				Для того чтобы ведущий мог войти и играть со всеми на свою цель надо нажать на кнопку{' '}
				<div className='inline text-green-600'>войти как игрок</div> появятся дополнительные поля выбора имени и
				фигурки для игры. Затем нажмите на "войти в игру"
			</div>
			<div className='flex gap-2'>
				<div className='w-1/2'>
					<Imgp src={loginAsMaster} alt='' />
				</div>
				<div className='w-1/2'>
					<Imgp src={loginAsMasterFull} alt='' />
				</div>
			</div>
		</div>
	);
};

export default InAuthorization;
