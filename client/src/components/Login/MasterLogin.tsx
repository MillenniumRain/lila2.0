import React, { ReactNode, useState } from 'react';
import { figures } from '../../data/figures';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { gameSlice } from '../../store/reducers/GameSlice';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import Figure from '../Figure';
import Figures from './Figures';

interface MasterLoginProp {
	children?: ReactNode;
}

const MasterLogin = ({}: MasterLoginProp) => {
	const dispatch = useAppDispatch();
	const errorMessage = useAppSelector((state) => state.interface.wrongPasswordMessage);
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [figure, setFigure] = useState(0);
	const [enterAsPlayer, setEnterAsPlayer] = useState(false);

	return (
		<form
			className='flex w-full flex-col justify-between items-center h-full'
			onSubmit={(e) => {
				e.preventDefault();

				if (enterAsPlayer) {
					if (name.length > 1) {
						dispatch(gameSlice.actions.login({ name, figure, password }));
					}
				} else {
					dispatch(gameSlice.actions.login({ name: 'Ведущий', figure: 1, password }));
				}
			}}>
			<div className='w-full mb-4'>
				<div className='text-lg font-bold  '>Введите пароль</div>
				<div className=''>
					<input
						autoFocus
						className='w-full border-b-[1px] mt-[-15px] bg-white/0 border-slate-400 py-2 outline-none focus:border-b-sky-600 focus:border-b-2'
						type='password'
						value={password}
						onChange={(e: React.FormEvent<HTMLInputElement>) => {
							if (errorMessage) {
								dispatch(interfaceSlice.actions.setWrongPassword(''));
							}
							setPassword(e.currentTarget.value);
						}}
					/>
					{errorMessage && <div className='text-sm text-red-600'>{errorMessage}</div>}
					<div
						className={`${
							enterAsPlayer ? 'text-green-500 hover:text-green-800' : 'hover:text-green-800'
						} cursor-pointer`}
						onClick={() => {
							setEnterAsPlayer((prev) => !prev);
						}}>
						Войти как игрок
					</div>
				</div>
			</div>
			{enterAsPlayer && (
				<>
					<div className='w-full mb-4'>
						<div className='text-lg font-bold  '>Введите имя</div>
						<input
							autoSave='false'
							className='w-full border-b-[1px] mt-[-15px] bg-white/0 border-slate-400 py-2 outline-none focus:border-b-slate-700 focus:border-b-2'
							type='text'
							placeholder='Имя'
							value={name}
							onChange={(e: React.FormEvent<HTMLInputElement>) => {
								setName(e.currentTarget.value);
							}}
						/>
					</div>
					<div className='mb-4 w-full'>
						<div className='text-lg font-bold mb-1'>Выберите фишку для игры</div>
						<Figures
							figure={figure}
							setFigure={(index) => {
								setFigure(index);
							}}
						/>
					</div>
				</>
			)}

			<button
				type='submit'
				className='p-2 border-2 border-sky-600 mb-4 text-sky-600 z-10  rounded-lg max-w-[200px] hover:bg-sky-600 hover:text-white bold'>
				Войти в игру
			</button>
		</form>
	);
};

export default MasterLogin;
