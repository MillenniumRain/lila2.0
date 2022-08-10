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

export const drawMap = () => {};
