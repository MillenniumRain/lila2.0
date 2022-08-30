import { mapConfig } from './../data/map';
import { ICard } from '../store/reducers/GameSlice';

export const getMap = (): ICard[] => {
	return mapConfig.map((card) => {
		return {
			id: card.id,
			name: card.name,
			hexagram: card.hexagram.trim().split(','),
			description: card.description
				.split('=')
				.filter((des) => des.length > 0)
				.map((des, index) => {
					return {
						id: index + 1,
						list: des.trim(),
					};
				}),
			color: card.color,
			bg: card.bg,
			number_color: card.number_color,
			hexagram_color: card.hexagram_color,
		};
	});
};

export const random = (min: number, max: number): number => {
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
};
export const drawMap = () => {};

export const getLocalStorage = (session: string = '', key: string = '') => {
	if (!key) {
		return JSON.parse(localStorage.getItem(session) || '{}');
	}
	return JSON.parse(localStorage.getItem(session) || '')[key];
};
