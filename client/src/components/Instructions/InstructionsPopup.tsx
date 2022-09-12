import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Popup from '../../common/Popup';
import { useAppDispatch } from '../../hooks/hooks';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import InstructionsList from './InstructionsList';
import InstructionsMenuItem from './InstructionsMenuItem';
import { ReactComponent as Arrow } from './../../assets/svg/back-arrow-svgrepo-com.svg';

interface InstructionsPopupProp {
	children?: ReactNode;
}

const InstructionsPopup = ({}: InstructionsPopupProp) => {
	const dispatch = useAppDispatch();
	const [iList, setIList] = useState('Введение');
	// const [iLast, setILast] = useState('');
	const topicsOfArticles = [
		'Как играть? (кратко)',
		'Введение',
		'Авторизация',
		'Меню',
		'Игровое поле',
		'Карточка',
		'Поле синхронизации',
		'Кубик',
		'История / Цель',
		'Разочарование',
		'Интерфейс ведущего',
	];
	const handleClick = (ikey: string) => {
		ref.current = iList;
		setIList(ikey);
	};
	const next = topicsOfArticles[topicsOfArticles.indexOf(iList) + 1];
	const ref = useRef('');

	return (
		<div className=''>
			<Popup
				onClose={() => {
					dispatch(interfaceSlice.actions.setInstructionsPopup(false));
				}}
				zIndex={50}>
				<div className='relative bg-white  w-[800px] h-2/3 z-10 flex justify-center items-center'>
					<div className='w-1/4 h-full relative pr-[2px] text-[15px] to450:w-[32%]'>
						<div className='h-full block overflow-y-auto overflow-hidden '>
							{topicsOfArticles.map((value, index) => {
								return (
									<div className={`${value === 'Как играть? (кратко)' ? 'mb-8' : 0}`} key={value}>
										<InstructionsMenuItem
											text={value}
											active={iList}
											onClick={() => {
												handleClick(value);
											}}
										/>
									</div>
								);
							})}
						</div>
						<div className='absolute right-0 top-0 h-full flex items-center'>
							<div className='h-[90%] w-[3px] bg-sky-700 rounded-[50%]'></div>
						</div>
					</div>
					<div className='w-3/4 h-full p-4 pb-8 text-justify relative bg-white to450:w-[68%] relative'>
						<div className='overflow-auto h-full pr-2'>
							<InstructionsList
								title={iList}
								onClick={(e: React.MouseEvent<HTMLInputElement>, ikey: string) => {
									handleClick(ikey);
								}}
							/>
						</div>

						{ref.current ? (
							<button
								className='absolute bottom-0 left-0 fill-sky-700 font-bold py-1 px-4 text-lg   hover:fill-orange-300'
								onClick={() => {
									handleClick(ref.current);
									ref.current = '';
								}}>
								<Arrow className='w-[25px]' />
							</button>
						) : null}
						<button
							className='absolute bottom-0 right-0 text-sky-700 font-bold py-1 px-4 text-lg  hover:text-orange-300'
							onClick={() => {
								handleClick(next);
							}}>
							{next}
						</button>
					</div>
				</div>
			</Popup>
		</div>
	);
};

export default InstructionsPopup;
