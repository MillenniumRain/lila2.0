import React, { ReactNode } from 'react';

import i0 from './../img/lila_cards/0.webp';
import i1 from './../img/lila_cards/1.webp';
import i2 from './../img/lila_cards/2.webp';
import i3 from './../img/lila_cards/3.webp';
import i4 from './../img/lila_cards/4.webp';
import i5 from './../img/lila_cards/5.webp';
import i6 from './../img/lila_cards/6.webp';
import i7 from './../img/lila_cards/7.webp';
import i8 from './../img/lila_cards/8.webp';
import i9 from './../img/lila_cards/9.webp';
import i10 from './../img/lila_cards/10.webp';
import i11 from './../img/lila_cards/11.webp';
import i12 from './../img/lila_cards/12.webp';
import i13 from './../img/lila_cards/13.webp';
import i14 from './../img/lila_cards/14.webp';
import i15 from './../img/lila_cards/15.webp';
import i16 from './../img/lila_cards/16.webp';
import i17 from './../img/lila_cards/17.webp';
import i18 from './../img/lila_cards/18.webp';
import i19 from './../img/lila_cards/19.webp';
import i20 from './../img/lila_cards/20.webp';
import i21 from './../img/lila_cards/21.webp';
import i22 from './../img/lila_cards/22.webp';
import i23 from './../img/lila_cards/23.webp';
import i24 from './../img/lila_cards/24.webp';
import i25 from './../img/lila_cards/25.webp';
import i26 from './../img/lila_cards/26.webp';
import i27 from './../img/lila_cards/27.webp';
import i28 from './../img/lila_cards/28.webp';
import i29 from './../img/lila_cards/29.webp';
import i30 from './../img/lila_cards/30.webp';
import i31 from './../img/lila_cards/31.webp';
import i32 from './../img/lila_cards/32.webp';
import i33 from './../img/lila_cards/33.webp';
import i34 from './../img/lila_cards/34.webp';
import i35 from './../img/lila_cards/35.webp';
import i36 from './../img/lila_cards/36.webp';
import i37 from './../img/lila_cards/37.webp';
import i38 from './../img/lila_cards/38.webp';
import i39 from './../img/lila_cards/39.webp';
import i40 from './../img/lila_cards/40.webp';
import i41 from './../img/lila_cards/41.webp';
import i42 from './../img/lila_cards/42.webp';
import i43 from './../img/lila_cards/43.webp';
import i44 from './../img/lila_cards/44.webp';
import i45 from './../img/lila_cards/45.webp';
import i46 from './../img/lila_cards/46.webp';
import i47 from './../img/lila_cards/47.webp';
import i48 from './../img/lila_cards/48.webp';
import i49 from './../img/lila_cards/49.webp';
import i50 from './../img/lila_cards/50.webp';
import i51 from './../img/lila_cards/51.webp';
import i52 from './../img/lila_cards/52.webp';
import i53 from './../img/lila_cards/53.webp';
import i54 from './../img/lila_cards/54.webp';
import i55 from './../img/lila_cards/55.webp';
import i56 from './../img/lila_cards/56.webp';
import i57 from './../img/lila_cards/57.webp';
import i58 from './../img/lila_cards/58.webp';
import i59 from './../img/lila_cards/59.webp';
import i60 from './../img/lila_cards/60.webp';
import i61 from './../img/lila_cards/61.webp';
import i62 from './../img/lila_cards/62.webp';
import i63 from './../img/lila_cards/63.webp';
import i64 from './../img/lila_cards/64.webp';
interface CardImgProp {
	children?: ReactNode;
	id: number;
}

const CardImg = ({ id }: CardImgProp) => {
	const images = [
		i0,
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
		i12,
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

export default CardImg;
