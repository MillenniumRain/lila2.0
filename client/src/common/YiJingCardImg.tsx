import React, { ReactNode } from 'react';

import i1 from './../assets/img/yi_jing_cards/f-1.webp';
import i2 from './../assets/img/yi_jing_cards/f-2.webp';
import i3 from './../assets/img/yi_jing_cards/f-3.webp';
import i4 from './../assets/img/yi_jing_cards/f-4.webp';
import i5 from './../assets/img/yi_jing_cards/f-5.webp';
import i6 from './../assets/img/yi_jing_cards/f-6.webp';
import i7 from './../assets/img/yi_jing_cards/f-7.webp';
import i8 from './../assets/img/yi_jing_cards/f-8.webp';
import i9 from './../assets/img/yi_jing_cards/f-9.webp';
import i10 from './../assets/img/yi_jing_cards/f-10.webp';
import i11 from './../assets/img/yi_jing_cards/f-11.webp';
// import i12 from './../assets/img/yi_jing_cards/f-12.webp';
import i13 from './../assets/img/yi_jing_cards/f-13.webp';
import i14 from './../assets/img/yi_jing_cards/f-14.webp';
import i15 from './../assets/img/yi_jing_cards/f-15.webp';
import i16 from './../assets/img/yi_jing_cards/f-16.webp';
import i17 from './../assets/img/yi_jing_cards/f-17.webp';
import i18 from './../assets/img/yi_jing_cards/f-18.webp';
import i19 from './../assets/img/yi_jing_cards/f-19.webp';
import i20 from './../assets/img/yi_jing_cards/f-20.webp';
import i21 from './../assets/img/yi_jing_cards/f-21.webp';
import i22 from './../assets/img/yi_jing_cards/f-22.webp';
import i23 from './../assets/img/yi_jing_cards/f-23.webp';
import i24 from './../assets/img/yi_jing_cards/f-24.webp';
import i25 from './../assets/img/yi_jing_cards/f-25.webp';
import i26 from './../assets/img/yi_jing_cards/f-26.webp';
import i27 from './../assets/img/yi_jing_cards/f-27.webp';
import i28 from './../assets/img/yi_jing_cards/f-28.webp';
import i29 from './../assets/img/yi_jing_cards/f-29.webp';
import i30 from './../assets/img/yi_jing_cards/f-30.webp';
import i31 from './../assets/img/yi_jing_cards/f-31.webp';
import i32 from './../assets/img/yi_jing_cards/f-32.webp';
import i33 from './../assets/img/yi_jing_cards/f-33.webp';
import i34 from './../assets/img/yi_jing_cards/f-34.webp';
import i35 from './../assets/img/yi_jing_cards/f-35.webp';
import i36 from './../assets/img/yi_jing_cards/f-36.webp';
import i37 from './../assets/img/yi_jing_cards/f-37.webp';
import i38 from './../assets/img/yi_jing_cards/f-38.webp';
import i39 from './../assets/img/yi_jing_cards/f-39.webp';
import i40 from './../assets/img/yi_jing_cards/f-40.webp';
import i41 from './../assets/img/yi_jing_cards/f-41.webp';
import i42 from './../assets/img/yi_jing_cards/f-42.webp';
import i43 from './../assets/img/yi_jing_cards/f-43.webp';
import i44 from './../assets/img/yi_jing_cards/f-44.webp';
import i45 from './../assets/img/yi_jing_cards/f-45.webp';
import i46 from './../assets/img/yi_jing_cards/f-46.webp';
import i47 from './../assets/img/yi_jing_cards/f-47.webp';
import i48 from './../assets/img/yi_jing_cards/f-48.webp';
import i49 from './../assets/img/yi_jing_cards/f-49.webp';
import i50 from './../assets/img/yi_jing_cards/f-50.webp';
import i51 from './../assets/img/yi_jing_cards/f-51.webp';
import i52 from './../assets/img/yi_jing_cards/f-52.webp';
import i53 from './../assets/img/yi_jing_cards/f-53.webp';
import i54 from './../assets/img/yi_jing_cards/f-54.webp';
import i55 from './../assets/img/yi_jing_cards/f-55.webp';
import i56 from './../assets/img/yi_jing_cards/f-56.webp';
import i57 from './../assets/img/yi_jing_cards/f-57.webp';
import i58 from './../assets/img/yi_jing_cards/f-58.webp';
import i59 from './../assets/img/yi_jing_cards/f-59.webp';
import i60 from './../assets/img/yi_jing_cards/f-60.webp';
import i61 from './../assets/img/yi_jing_cards/f-61.webp';
import i62 from './../assets/img/yi_jing_cards/f-62.webp';
import i63 from './../assets/img/yi_jing_cards/f-63.webp';
import i64 from './../assets/img/yi_jing_cards/f-64.webp';
interface YiJingCardImgProp {
	children?: ReactNode;
	id: number;
}

const YiJingCardImg = ({ id }: YiJingCardImgProp) => {
	const images = [
		'',
		i1,
		i2,
		i3,
		i4,
		i5,
		i6,
		i7,
		i8,
		i9,
		i10,
		i11,
		'', // i12,
		i13,
		i14,
		i15,
		i16,
		i17,
		i18,
		i19,
		i20,
		i21,
		i22,
		i23,
		i24,
		i25,
		i26,
		i27,
		i28,
		i29,
		i30,
		i31,
		i32,
		i33,
		i34,
		i35,
		i36,
		i37,
		i38,
		i39,
		i40,
		i41,
		i42,
		i43,
		i44,
		i45,
		i46,
		i47,
		i48,
		i49,
		i50,
		i51,
		i52,
		i53,
		i54,
		i55,
		i56,
		i57,
		i58,
		i59,
		i60,
		i61,
		i62,
		i63,
		i64,
	];
	return <img className='h-full' src={`${images[id]}`} alt='' />;
};

export default YiJingCardImg;
