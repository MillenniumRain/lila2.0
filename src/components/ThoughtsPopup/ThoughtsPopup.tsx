import React, { ReactNode, useState } from 'react';
import Popup from '../../common/Popup';
import { useAppDispatch } from '../../hooks/hooks';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import ThoughtsList from './ThoughtsList';
import ThoughtsShirt from './ThoughtsShirt';

interface ThoughtsPopupProp {
	children?: ReactNode;
}

const ThoughtsPopup = ({}: ThoughtsPopupProp) => {
	const dispatch = useAppDispatch();
	const [visibleShirt, setVisibleShirt] = useState(true);
	return (
		<div className='overflow-x-auto'>
			<Popup
				onClose={(e) => {
					e.preventDefault();
					dispatch(interfaceSlice.actions.setThoughtsPopup({ visible: false }));
				}}>
				<div>
					<div className={`flex justify-center w-full `}>
						<button
							onClick={() => {
								setVisibleShirt((prev) => !prev);
							}}
							className={`p-2 border-2 mb-4 text-white z-10 bg-black/80 rounded-lg hover:bg-white/80 hover:text-black`}>
							Перевернуть карточку
						</button>
					</div>
					{visibleShirt && (
						<div className=' relative max-w-[650px] min-h-[400px]  rounded-3xl overflow-hidden   '>
							<ThoughtsShirt
								onContextMenu={(e) => {
									e.preventDefault();
									setVisibleShirt((prev) => !prev);
								}}
							/>
						</div>
					)}
					{!visibleShirt && (
						<div className='bg-white relative max-w-[650px] min-h-[452px]  h-[452px] rounded-3xl overflow-hidden   '>
							<ThoughtsList
								onContextMenu={(e) => {
									e.preventDefault();
									setVisibleShirt((prev) => !prev);
								}}
							/>
						</div>
					)}
				</div>
			</Popup>
		</div>
	);
};

export default ThoughtsPopup;
