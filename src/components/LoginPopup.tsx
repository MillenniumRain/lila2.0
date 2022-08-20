import React, { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';
import Popup from '../common/Popup';
import { figures } from '../data/figures';
import { useAppDispatch } from '../hooks/hooks';
import { gameSlice } from '../store/reducers/GameSlice';
import { interfaceSlice } from '../store/reducers/InterfaceSlice';
import Figure from './Figure';

interface LoginPopupProp {
	children?: ReactNode;
	onClose: () => void;
}

const LoginPopup = ({ onClose }: LoginPopupProp) => {
	const dispatch = useAppDispatch();
	const [name, setName] = useState('');
	const [figureId, setFigureId] = useState(0);

	return (
		<div className=''>
			<Popup onClose={() => {}}>
				<div className='bg-white  w-[400px] h-[350px] z-10 p-10 overflow-x-auto'>
					<form
						className='flex w-full flex-col justify-between items-center h-full'
						onSubmit={(e) => {
							e.preventDefault();
							if (name.length > 1) {
								dispatch(gameSlice.actions.setPLayerName(name));
								dispatch(gameSlice.actions.setFigure(figureId));
								onClose();
							}
						}}>
						<div className='w-full'>
							<div className='text-lg font-bold  '>Введите имя</div>
							<input
								autoFocus
								className='w-full border-b-[1px] mt-[-15px] bg-white/0 border-slate-400 py-2 outline-none focus:border-b-slate-700 focus:border-b-2'
								type='text'
								placeholder='Имя'
								value={name}
								onChange={(e: React.FormEvent<HTMLInputElement>) => {
									setName(e.currentTarget.value);
								}}
							/>
						</div>
						<div>
							<div className='text-lg font-bold mb-1'>Выберите фишку для игры</div>
							<div className='w-full flex justify-around'>
								{figures.map((fig, index) => {
									return (
										<div
											className={`hover:bg-slate-200 rounded-lg cursor-pointer ${
												figureId == index && 'bg-orange-300'
											}`}
											key={index}
											onClick={() => {
												setFigureId(index);
											}}>
											<Figure animation={true} className={`w-[45px] `} id={index} />
										</div>
									);
								})}
							</div>
						</div>
						<button
							type='submit'
							className='p-2 border-2 border-orange-300 mb-4 text-orange-300 z-10  rounded-lg max-w-[200px] hover:bg-orange-300 hover:text-white bold'>
							Войти в игру
						</button>
					</form>
				</div>
			</Popup>
		</div>
	);
};

export default LoginPopup;
