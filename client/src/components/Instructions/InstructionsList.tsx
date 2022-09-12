import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import InAuthorization from './InstructionsArticles/InAuthorization';
import InCard from './InstructionsArticles/InCard';
import InCube from './InstructionsArticles/InCube';
import InDisappointment from './InstructionsArticles/InDisappointment';
import InHistoryOfMovesGoal from './InstructionsArticles/InHistoryOfMovesGoal';
import InHostInterface from './InstructionsArticles/InHostInterface';
import HowToPlay from './InstructionsArticles/InHowToPlay';
import InIntroduction from './InstructionsArticles/InIntroduction';
import InMenu from './InstructionsArticles/InMenu';
import InSynchronizationField from './InstructionsArticles/InSynchronizationField';
import InTheGameField from './InstructionsArticles/InTheGameField';
interface InstructionsListProp {
	children?: ReactNode;
	title: string;
	onClick: (e: React.MouseEvent<HTMLInputElement>, ikey: string) => void;
}

const InstructionsList = ({ title, onClick }: InstructionsListProp) => {
	const list = useRef(new Map<string, ReactElement>());
	const instructions = [];
	instructions.push({
		title: 'Как играть? (кратко)',
		body: <HowToPlay onClick={onClick} />,
	});
	instructions.push({
		title: 'Введение',
		body: <InIntroduction onClick={onClick} />,
	});
	instructions.push({
		title: 'Авторизация',
		body: <InAuthorization onClick={onClick} />,
	});
	instructions.push({
		title: 'Меню',
		body: <InMenu onClick={onClick} />,
	});
	instructions.push({
		title: 'Игровое поле',
		body: <InTheGameField onClick={onClick} />,
	});
	instructions.push({
		title: 'Карточка',
		body: <InCard onClick={onClick} />,
	});
	instructions.push({
		title: 'Поле синхронизации',
		body: <InSynchronizationField onClick={onClick} />,
	});
	instructions.push({
		title: 'Кубик',
		body: <InCube onClick={onClick} />,
	});
	instructions.push({
		title: 'История / Цель',
		body: <InHistoryOfMovesGoal onClick={onClick} />,
	});
	instructions.push({
		title: 'Разочарование',
		body: <InDisappointment onClick={onClick} />,
	});
	instructions.push({
		title: 'Интерфейс ведущего',
		body: <InHostInterface onClick={onClick} />,
	});

	return <div>{instructions.find((i) => i.title == title)?.body}</div>;
};

export default InstructionsList;
