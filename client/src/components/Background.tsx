import React, { ReactNode, useEffect, useRef } from 'react';
import { useAppSelector } from '../hooks/hooks';
import bg from './../assets/img/bg_space.webp';

interface BackgroundProp {
	children?: ReactNode;
}
const Background = ({}: BackgroundProp) => {
	const ref = useRef<any>();
	const starsParams = useRef({ speed: 0.1, number: 50, extinction: 100 });
	const rollingDice = useAppSelector((state) => state.interface.rollingDice);

	useEffect(() => {
		if (rollingDice) {
			starsParams.current.speed = 30;
		} else {
			starsParams.current.speed = 0.1;
		}
	}, [rollingDice]);
	useEffect(() => {
		let stars = ref.current;
		let starsCtx = stars.getContext('2d');
		let screen = {
			w: window.innerWidth,
			h: window.innerHeight,
			c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
		};
		let starsElements: any[] = [];

		let frameAnim: any = null;
		window.onresize = function () {
			setupStars();
			updateStars();
		};
		// star constructor
		class Star {
			x: number;
			y: number;
			z: number;
			constructor() {
				this.x = Math.random() * stars.width;
				this.y = Math.random() * stars.height;
				this.z = Math.random() * stars.width;
			}
			move() {
				this.z -= starsParams.current.speed;
				if (this.z <= 0) {
					this.z = stars.width;
				}
			}
			show() {
				let x, y, rad, opacity;
				x = (this.x - screen.c[0]) * (stars.width / this.z);
				x = x + screen.c[0];
				y = (this.y - screen.c[1]) * (stars.width / this.z);
				y = y + screen.c[1];
				rad = stars.width / this.z;
				opacity = rad > starsParams.current.extinction ? 1.5 * (2 - rad / starsParams.current.extinction) : 1;
				if (starsCtx) {
					starsCtx.beginPath();
					starsCtx.fillStyle = 'rgba(255, 255, 255, ' + opacity + ')';
					starsCtx.shadowOffsetX = 0;
					starsCtx.shadowOffsetY = 0;
					starsCtx.shadowColor = 'white';
					starsCtx.shadowBlur = 10;
					starsCtx.arc(x, y, rad + 1, 0, Math.PI * 2);
					starsCtx.fill();
				}
			}
		}
		function updateStars() {
			starsCtx?.clearRect(0, 0, stars.width, stars.height);
			starsElements.forEach(function (s) {
				s.show();
				s.move();
			});
			frameAnim = window.requestAnimationFrame(updateStars);
		}
		function setupStars() {
			screen = {
				w: window.innerWidth,
				h: window.innerHeight,
				c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
			};
			window.cancelAnimationFrame(frameAnim);
			stars.width = screen.w;
			stars.height = screen.h;
			starsElements = [];
			for (let i = 0; i < starsParams.current.number; i++) {
				starsElements[i] = new Star();
			}
		}
		setupStars();
		updateStars();
		// return () => {
		// 	window.onresize = null;
		// };
	}, []);
	return (
		<div className={`flex  fixed justify-center items-center top-0 left-0 right-0  bottom-0 flex-col `}>
			<img src={bg} className='fixed bottom-0 left-0 top-0 right-0 w-screen h-screen object-cover'></img>
			<canvas ref={ref} className='absolute top-0 left-0 z-10'></canvas>
		</div>
	);
};

export default Background;
