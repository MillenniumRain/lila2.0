import React, { ReactNode, useState } from 'react';
import Popup from './Popup';

interface ImgpProp {
	children?: ReactNode;
	src: string;
	alt?: string;
	click?: boolean;
}

const Imgp = ({ src, alt, click = true }: ImgpProp) => {
	const [visible, setVisible] = useState(false);
	return (
		<div className='flex flex-col justify-center items-center italic mb-4 '>
			<img
				src={src}
				alt={alt}
				className='cursor-pointer border-[1px] border-[#15323d] rounded-2xl'
				onClick={() => {
					if (!click) return;
					setVisible(true);
				}}
			/>
			<div className='inline text-black text-sm my-auto'>{alt}</div>
			{visible && (
				<Popup zIndex={50}>
					<div
						className='w-full h-full  z-10 flex justify-center items-center flex-col cursor-pointer'
						onClick={() => {
							setVisible(false);
						}}>
						<div className=' w-3/4 h-3/4 z-10 '>
							<img src={src} alt='' className='object-contain h-full w-full' />
						</div>
						{alt ? <div className='text-white'>{alt}</div> : null}
					</div>
				</Popup>
			)}
		</div>
	);
};

export default Imgp;
