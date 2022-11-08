import React, { ReactNode, useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { gameSlice } from '../../store/reducers/GameSlice';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import Figures from './Figures';

interface PlayerLoginProp {
	children?: ReactNode;
}
const PlayerLogin = ({}: PlayerLoginProp) => {
	const dispatch = useAppDispatch();
	const [name, setName] = useState('');
	const [figure, setFigure] = useState(0);
	return (
		<form
			className='flex w-full flex-col justify-center items-center h-full'
			onSubmit={(e) => {
				e.preventDefault();
				if (name.length > 1) {
					dispatch(gameSlice.actions.login({ name, figure }));
					dispatch(interfaceSlice.actions.setLoginPopup(false));
				}
			}}>
			<div>
				<div className='w-full mb-4'>
					<div className='text-lg font-bold  '>Введите имя</div>
					<input
						autoFocus
						className='w-full border-b-[1px] mt-[-15px] bg-white/0 border-slate-400 py-2 outline-none focus:border-b-sky-600 focus:border-b-2'
						type='text'
						placeholder='Имя'
						value={name}
						onChange={(e: React.FormEvent<HTMLInputElement>) => {
							setName(e.currentTarget.value);
						}}
					/>
				</div>
				<div className='mb-4'>
					<div className='text-lg font-bold mb-1'>Выберите фишку для игры</div>
					<Figures
						figure={figure}
						setFigure={(index) => {
							setFigure(index);
						}}
					/>
				</div>
			</div>
			<button
				type='submit'
				className='p-2 border-2 border-sky-600 mb-4 text-sky-600 z-10  rounded-lg max-w-[200px] hover:bg-sky-600 font-bold hover:text-white bold'>
				Войти в игру
			</button>
		</form>
	);
};

export default PlayerLogin;
