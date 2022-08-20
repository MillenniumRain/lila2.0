import React, { ReactNode } from 'react';
import bg from './../assets/img/bg_space.jpg';

interface BackgroundProp {
	children?: ReactNode;
}

const Background = ({}: BackgroundProp) => {
	return (
		<div
			className={`flex fixed justify-center items-center top-0 left-0 right-0  bottom-0 flex-col animate-spin-ultraslow`}>
			<div className=' flex w-[300%]  justify-center rotate-180 -scale-y-100'>
				<img
					className=' h-screen  w-full object-cover  bg-cover bg-center '
					src={bg}
					alt=''
					style={{
						backgroundSize: 'cover',
					}}
				/>
				<img
					className=' h-screen  -ml-[2px] w-full object-cover  bg-cover bg-center '
					src={bg}
					alt=''
					style={{
						backgroundSize: 'cover',
					}}
				/>
				<img
					className=' h-screen  -ml-[2px] w-full object-cover  bg-cover bg-center '
					src={bg}
					alt=''
					style={{
						backgroundSize: 'cover',
					}}
				/>
			</div>
			<div className=' -mt-[5px]  flex w-[300%] justify-center'>
				<img
					className=' h-screen  w-full object-cover  bg-cover bg-center '
					src={bg}
					alt=''
					style={{
						backgroundSize: 'cover',
					}}
				/>
				<img
					className=' h-screen  -ml-[2px]  w-full object-cover  bg-cover bg-center '
					src={bg}
					alt=''
					style={{
						backgroundSize: 'cover',
					}}
				/>
				<img
					className=' h-screen  -ml-[2px]  w-full object-cover  bg-cover bg-center '
					src={bg}
					alt=''
					style={{
						backgroundSize: 'cover',
					}}
				/>
			</div>
			<div className=' -mt-[5px] flex w-[300%] justify-center rotate-180 -scale-y-100'>
				<img
					className=' h-screen  w-full object-cover  bg-cover bg-center '
					src={bg}
					alt=''
					style={{
						backgroundSize: 'cover',
					}}
				/>
				<img
					className=' h-screen -ml-[2px]   w-full object-cover  bg-cover bg-center '
					src={bg}
					alt=''
					style={{
						backgroundSize: 'cover',
					}}
				/>
				<img
					className=' h-screen  -ml-[2px]  w-full object-cover  bg-cover bg-center '
					src={bg}
					alt=''
					style={{
						backgroundSize: 'cover',
					}}
				/>
			</div>
		</div>
	);
};

export default Background;
