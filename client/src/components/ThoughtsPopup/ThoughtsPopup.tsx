import React, { ReactNode, useState } from 'react';
import Popup from '../../common/Popup';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { interfaceSlice } from '../../store/reducers/InterfaceSlice';
import ThoughtsList from './ThoughtsList';
import ThoughtsShirt from './ThoughtsShirt';
import { ReactComponent as SvgClose } from './../../assets/svg/close-svgrepo-com.svg';
import YiJingCardImg from '../../common/YiJingCardImg';
import YiJingCardPopup from './YiJingCardPopup';

interface ThoughtsPopupProp {
	children?: ReactNode;
}

const ThoughtsPopup = ({}: ThoughtsPopupProp) => {
	const dispatch = useAppDispatch();
	const activeCardId = useAppSelector((state) => state.interface.activeCard) || 0;

	const [visibleShirt, setVisibleShirt] = useState(true);
	const [yijing, setYijing] = useState(false);
	return (
		<div className='overflow-x-auto'>
			<Popup
				onClose={(e) => {
					e.preventDefault();
					dispatch(interfaceSlice.actions.setThoughtsPopup({ visible: false }));
					dispatch(interfaceSlice.actions.setPickedIdThought(null));
				}}>
				<div>
					<div className={`flex justify-center w-full `}>
						{activeCardId > 0 ? (
							<button
								onClick={() => {
									setYijing(true);
								}}
								className={`p-2 border-2 mb-4 text-white z-10 bg-black/80 rounded-lg hover:bg-white/80 hover:text-black mr-4`}>
								易經
							</button>
						) : null}

						<button
							onClick={() => {
								setVisibleShirt((prev) => !prev);
							}}
							className={`p-2 border-2 mb-4 text-white z-10 bg-black/80 rounded-lg hover:bg-white/80 hover:text-black`}>
							Перевернуть карточку
						</button>
					</div>

					{visibleShirt && (
						<div className=' relative max-w-[650px]   rounded-3xl overflow-hidden   '>
							<ThoughtsShirt
								activeCardId={activeCardId}
								onContextMenu={(e) => {
									e.preventDefault();
									setVisibleShirt((prev) => !prev);
								}}
							/>
							<div
								className='absolute right-0 top-0 hover:fill-sky-300   fill-black p-2  cursor-pointer'
								onClick={() => {
									dispatch(interfaceSlice.actions.setThoughtsPopup({ visible: false }));
								}}>
								<SvgClose className=' ' />
							</div>
						</div>
					)}
					{!visibleShirt && (
						<div className='bg-white relative max-w-[650px] min-h-[452px]  h-[452px] rounded-3xl overflow-hidden   '>
							<ThoughtsList
								activeCardId={activeCardId}
								onContextMenu={(e) => {
									e.preventDefault();
									setVisibleShirt((prev) => !prev);
								}}
							/>
							<div
								className='absolute right-0 top-0 hover:fill-sky-300  fill-black p-2  cursor-pointer'
								onClick={() => {
									dispatch(interfaceSlice.actions.setThoughtsPopup({ visible: false }));
								}}>
								<SvgClose className=' ' />
							</div>
						</div>
					)}
					{yijing && (
						<YiJingCardPopup
							onClose={() => {
								setYijing(false);
							}}
						/>
					)}
				</div>
			</Popup>
		</div>
	);
};

export default ThoughtsPopup;
