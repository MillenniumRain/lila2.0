import React, { ReactElement, ReactNode, useEffect, useRef } from 'react';
import gameScreen from '../../assets/img/instructions/gameScreen.webp';
import loginAsMaster from '../../assets/img/instructions/loginAsMaster.webp';
import loginAsMasterFull from '../../assets/img/instructions/loginAsMasterFull.webp';
import loginAsPlayer from '../../assets/img/instructions/loginAsPlayer.webp';
import gameBoard from '../../assets/img/instructions/gameBoard.webp';
import card from '../../assets/img/instructions/card.webp';
import cardShirt from '../../assets/img/instructions/cardShirt.webp';
import gameBoardSync from '../../assets/img/instructions/gameBoardSync.webp';
import menu from '../../assets/img/instructions/menu.webp';
import menuMaster from '../../assets/img/instructions/menuMaster.webp';
import menuItemDice from '../../assets/img/instructions/menuItemDice.webp';
import dice from '../../assets/img/instructions/dice.webp';
import dices from '../../assets/img/instructions/dices.webp';
import history from '../../assets/img/instructions/history.webp';
import historyDelete from '../../assets/img/instructions/historyDelete.webp';
import purpose from '../../assets/img/instructions/purpose.webp';
import move from '../../assets/img/instructions/move.webp';
import rename from '../../assets/img/instructions/rename.webp';
import disappointments from '../../assets/img/instructions/disappointments.webp';
import endTurn from '../../assets/img/instructions/endTurn.webp';
import gameHost from '../../assets/img/instructions/gameHost.webp';
import Imgp from '../../common/Imgp';
interface InstructionsListProp {
	children?: ReactNode;
	title: string;
	onClick: (e: React.MouseEvent<HTMLInputElement>, ikey: string) => void;
}

const InstructionsList = ({ title, onClick }: InstructionsListProp) => {
	const list = useRef(new Map<string, ReactElement>());
	list.current.set(
		'Как играть? (кратко)',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Краткое руководство для игры в "Лила Чакра"</div>
			<div className='mb-4'>1. Введите имя и нажмите войти в игру.</div>
			<div className='mb-4'>
				2. Откройте меню "история ходов", внутри укажите свою цель, если цель не выбрана, то вы можете сыграть
				на "Познай себя".
			</div>
			<div className='mb-4'>
				3. Бросайте кубик и ходите на выпавшее число, кликом левой кнопки мыши на ячейку игрового поля{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer ml-1'
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Игровое поле');
					}}>
					(см. Игровое поле)
				</div>
			</div>
			<div className='mb-4'>
				4. Кликнув правой кнопкой мыши на ячейку (где находится ваша фигура) игрового поля, откроется карточка,
				внизу карточки
				<div
					className='inline text-sky-700 hover:underline cursor-pointer ml-1'
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Карточка');
					}}>
					(см. Карточка)
				</div>{' '}
				есть инструкция, что делать дальше.
			</div>
			<div className='mb-4'>
				5. Если на карточке указано "бросайте кубик ещё раз", вы бросаете кубик и смотрите совпадает ли число
				выпавшее на кубике с числом на карточке о продолжении хода, в том случае если число на кубике не
				совпадает с цифрами на карточке, то перевенув ее вы можете выбрать кликом одну из противоречивых цитат
				на ваш выбор. Затем ход передается другому игроку, кнопкой "завершить ход"{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer ml-1'
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Кубик');
					}}>
					(см. Завершить ход)
				</div>
				.
			</div>
			<div className='mb-4'>6. Номер клетки выхода из игры 58 или 63.</div>
			<div className='mb-4'>
				6. Если игра отправила вас на "ноль", то вы либо заходите в игру с "разочарованием"
				<div
					className='inline text-sky-700 hover:underline cursor-pointer ml-1'
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Разочарование');
					}}>
					(см. Разочарование)
				</div>
				, либо меняете свою цель.
			</div>
			<div className='mb-4'>
				7. Если вы начинаете ход стоя на клетках с 59-ой до 62-ой и вам выпадает число на кубике больше чем вы
				можете походить, то в ничего не делаете и пропускаете ход.
			</div>
		</div>
	);
	list.current.set(
		'Введение',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Онлайн площадка для игры в "Лила Чакра"</div>
			<div>
				<Imgp src={gameScreen} alt='Главный экран Лила Чакра' />
			</div>
			<div className='mb-4'>
				"Лила Чакра" - это эзотерическая игра, на любую поставленную цель. Во время сеанса для игрока
				открывается возможность доступа к информационному полю в поисках ответа на внутренние вопросы. Это
				практика по установлению связи со своим высшим Я. Во время сеанса поле игры проявляет ключевые моменты в
				сознании, на которые нужно обратить внимание, чтобы достигнуть жизненную цель.
			</div>
		</div>
	);
	list.current.set(
		'Авторизация',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Авторизация игрока</div>
			<div className='flex gap-2'>
				<div className='mb-4 w-1/2'>
					Игрок пишет свое имя, затем выбирает себе фишку которой будет играть и жмет войти в игру
				</div>
				<div className='w-1/2'>
					<Imgp src={loginAsPlayer} alt='' />
				</div>
			</div>
			<div className='text-2xl font bold font-russo mb-4'>Авторизация ведущего</div>
			<div className=' '>
				Ведущий вводит пароль дающий право к дополнительным возможностям
				<div
					className='inline text-sky-700 hover:underline cursor-pointer ml-1'
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Интерфейс ведущего');
					}}>
					(см. Интерфейс ведущего)
				</div>
			</div>
			<div className='mb-4 '>
				Для того чтобы ведущий мог войти и играть со всеми на свою цель надо нажать на кнопку{' '}
				<div className='inline text-green-600'>войти как игрок</div> появятся дополнительные поля выбора имени и
				фигурки для игры. Затем нажмите на "войти в игру"
			</div>
			<div className='flex gap-2'>
				<div className='w-1/2'>
					<Imgp src={loginAsMaster} alt='' />
				</div>
				<div className='w-1/2'>
					<Imgp src={loginAsMasterFull} alt='' />
				</div>
			</div>
		</div>
	);
	list.current.set(
		'Меню',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Меню игры</div>
			<div className='mb-4'></div>
			<div className='flex gap-3'>
				<div className='w-1/2'>
					<Imgp src={menu} alt='' />
				</div>
				<div className='w-1/2'>
					<div>Меню делится на три зоны:</div>
					<div>
						<div className='inline font-bold'>1. История ходов</div>{' '}
						<div
							className='inline text-sky-700 hover:underline cursor-pointer '
							onClick={(e: React.MouseEvent<HTMLInputElement>) => {
								onClick(e, 'История ходов');
							}}>
							(см. История ходов)
						</div>
						<div className='font-bold'>2. Список игроков </div>
						<div className=''>
							Первой строкой в списке отображается, подключился ли ведущий или нет (то как видит это
							ведущий{' '}
							<div
								className='inline text-sky-700 hover:underline cursor-pointer '
								onClick={(e: React.MouseEvent<HTMLInputElement>) => {
									onClick(e, 'Интерфейс ведущего');
								}}>
								см. Интерфейс ведущего
							</div>
							).
						</div>
						<div>
							Каждый игрок отображается в порядке <br /> подключение к комнате (к игре). Сперва значок
							"персоны", он показывает вас в списке. Затем имя игрока, потом выброшенный кубик{' '}
							<div
								className='inline text-sky-700 hover:underline cursor-pointer '
								onClick={(e: React.MouseEvent<HTMLInputElement>) => {
									onClick(e, 'Кубик');
								}}>
								(см. Кубик)
							</div>
							, если кубик никто не
						</div>
					</div>
				</div>
			</div>
			<div className='mt-[-11px]'>
				бросал это место остается пустым, следующим показывается позиция игрока и его фигурка.{' '}
			</div>
			<div className=' italic'>Игрок, который ходит, подсвечивается белым.</div>
			<div className='inline font-bold'>3. Синхронизироваться с полем</div>{' '}
			<div
				className='inline text-sky-700 hover:underline cursor-pointer '
				onClick={(e: React.MouseEvent<HTMLInputElement>) => {
					onClick(e, 'Поле синхронизации');
				}}>
				(см. Поле синхронизации)
			</div>
		</div>
	);
	list.current.set(
		'Игровое поле',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Игровое поле Лила Чакра</div>
			<div className='mb-4'>
				Игровое поле из 65 клеток. Игра начинается с нулевой ячейки. Каждая клетка со своим цветом чакры
				порядковым номером и гексаграммой.
				<div className='font-bold'> Управление:</div>
				<div className='indent-8'>
					клик ЛКМ (левая кнопка мыши) по ячейке, передвинет вас на нее, если текущий ход ваш;
				</div>
				<div className='indent-8 '>
					клик ПКМ (правая кнопка мыши) по ячейке, откроет карточку{' '}
					<div
						className='inline text-sky-700 hover:underline cursor-pointer '
						onClick={(e: React.MouseEvent<HTMLInputElement>) => {
							onClick(e, 'Карточка');
						}}>
						(см. Карточка).
					</div>
				</div>
				<div className=''> На ячейках которых находится игрок снизу ячейки отображается фигура игрока</div>
				<div className=''>
					{' '}
					Ячейка подсвечивается белым контуром в тот момент когда игрок находится на ней и продолжает ход
				</div>
			</div>
			<div>
				<Imgp src={gameBoard} alt='Игровое поле' />
			</div>
			<div className='mb-4'></div>
		</div>
	);
	list.current.set(
		'Карточка',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Карточка</div>
			<div>
				<Imgp src={card} alt='Карточка номер 28. Чрезмерная забота' />
			</div>
			<div className='mb-4'>
				При нажатии на ячейку на игровом поле{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Карточка');
					}}>
					(см. Игровое поле)
				</div>{' '}
				открывается одна из 65 карточек соответствующая номеру на который вы нажали. Карточка определяет ваши
				дальнейшие действия. На каждой карточке есть повествование которое дает игроку дополнительную почву для
				размышления.
			</div>
			<div className='mb-4'>
				Кнопка "Перевернуть карточку" или нажатие на карточку левой или правой кнопкой мыши перевернет карточку,
				на обратной стороне карточки игроку предлагается несколько противоречивых мыслей на выбор при завершении
				хода.
			</div>
			<div>
				<Imgp src={cardShirt} alt='Обратная сторона карточка номер 28. Чрезмерная забота' />
			</div>
		</div>
	);

	list.current.set(
		'Поле синхронизации',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Поле синхронизации</div>
			<div className='mb-4'>
				Поле синхронизации нужно игроку для сонастройки с полем игры. Для установления ментального контакта с
				игровым полем зафиксируйте свой взгляд на этом рисунке, проникнитесь многоплановостью древних символов,
				ощутите цвета чакр, пройдитесь по ним от красного к белому, осознавая свои ощущения от каждого ряда,
				каждого цвета, это сакральное изображения поля жизни.
			</div>
			<div className='mb-4'>Закрыть можете по клику на любое свободное пространство вне поля синхронизации</div>
			<div>
				<Imgp src={gameBoardSync} alt='Поле синхронизации для сонастройки' />
			</div>
		</div>
	);
	list.current.set(
		'Кубик',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Игральна кость для игры</div>
			<div className='mb-4'>
				Для того чтобы бросить кубик, необходимо зажать на нем левой кнопкой мыши и держать сколько угодно затем
				отпустить и через несколько мгновений кубик плавно остановится. О том в каком состоянии находится кубик
				будут сигнализировать фазы: перемешивается и останавливается
			</div>
			<div>
				<Imgp src={dice} alt='' click={false} />
			</div>
			<div className='mb-4'>
				Если вы хотите бросать свой настоящий кубик и вписывать в программу номер выпавший на кубике то следует
				нажать на игральную кость правой кнопкой мыши и появится меню выбора
			</div>
			<div>
				<Imgp src={dices} alt='' click={false} />
			</div>
			<div className='mb-4'>
				После того как вы выберите кубик или сгенерируется для вас, все игроки узнают об этом в списке игроков
				(см. ниже)
			</div>
			<div>
				<Imgp src={menuItemDice} alt='' click={false} />
			</div>
			<div className=''>
				Для того чтобы передать ход следующему игроку необходимо нажать на "Завершить ход" в правом нижнем углу
				экрана
			</div>
			<div className='mb-4'>
				Кнопка "Завершить ход" появляется только когда в игре авторизовано более двух игроков
			</div>
			<div>
				<Imgp src={endTurn} alt='' click={false} />
			</div>
		</div>
	);
	list.current.set(
		'История / Цель',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>История / Цель</div>
			<div className='mb-4'>Вверху окна История ходов есть место для записи цели</div>
			<div>
				<Imgp src={purpose} alt='' />
			</div>
			<div className='mb-4'>
				Кликнув на поле ввода можно изменить ее, сохранение цели происходит по нажатию на клавищу Enter на
				клавиатуре или по закрытию окна "История ходов"
			</div>
			<div className='mb-4'>
				Ниже представлен пример истории ходов. "№ поля" - это номер ячейки на игровом поле{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Игровое поле');
					}}>
					(см. Игровое поле)
				</div>
				. "№ позиции" - это то что вы выбираете на обратной стороне карточки при завершении хода{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Карточка');
					}}>
					(см. Карточка)
				</div>
				. Цвета ячеек говорят о том на какой чакре находится ячейка игрового поля
			</div>
			<div>
				<Imgp src={history} alt='История ходов' />
			</div>
		</div>
	);
	list.current.set(
		'Разочарование',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Разочарование</div>
			<div className='mb-4'>
				Разочарование получается когда вас игра выбрасывает на ноль и вы решаетесь не менять цель и зайти в игру
				снова, тогда ведущий выдаст вам карточку "разочарование"{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Интерфейс ведущего');
					}}>
					(см. Интерфейс ведущего)
				</div>
			</div>
			<div className='mb-4'>
				Чтобы посмотреть полное описание карты "разочарования" навидите мышь на эту карточку
			</div>
			<div className='mb-4'>Вы начинаете игру с нулем разочарований</div>
			<div>
				<Imgp src={disappointments} alt='' click={false} />
			</div>
			<div className='relative  bg-white z-10 border-[1px] transition-all overflow-hidden border-[#15323d]  group-hover:w-[400px] group-hover:h-[220px] '>
				<div className='font-bold text-lg flex justify-center'> Разочарование</div>
				<div className='font-bold text-sm flex justify-center text-center mb-2'>
					"Разочарование" утяжеляет шаг! Число, выпавшее в начале хода при первом броске кубика, уменьшается
					на количество накопленных "Разочарований"
				</div>
				<div className='text-sm flex justify-center text-center mb-2'>
					Например, если у Вас 5 "Разочарований", то продвижение возможно только на одну клетку и то только в
					том случае, если у Вас выпадает шесть очков
				</div>
				<div className='font-bold text-sm flex justify-center text-center mb-2'>
					"Разочарование" не влияет на продолжение хода, на повторные броски
				</div>
			</div>
		</div>
	);
	list.current.set(
		'Интерфейс ведущего',
		<div>
			<div className='text-2xl font bold font-russo mb-4'>Интерфейс ведущего</div>
			<div className='mb-4'>
				Ведущий подключается (скрытым для других игроков), может раскрыть себя и начать игру с клетки ноль (см.
				ниже пункт "скрыть игрока").
			</div>
			<div>
				<Imgp src={gameHost} alt='' click={false} />
			</div>
			<div className='mb-4'>Дополнительные возможности ведущего:</div>
			<div>
				<Imgp src={menuMaster} alt='Дополнительные возможности ведущего' />
			</div>
			<div className='mb-4'>
				Ведущий получает право кликать на игроков (клик по имени) открывает меню с дополнительными
				возможностями. Двойной клик на игроке открывает его историю{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'История / Цель');
					}}>
					(см. История ходов)
				</div>{' '}
				Ведущий может удалять ячейки из истории других игроков (см. ниже) при наведении мыши появиться крестик
				над строкой с номером поля
			</div>
			<div>
				<Imgp src={historyDelete} alt='Дополнительные возможности ведущего' />
			</div>
			<div className=''>
				<div className='inline font-bold'>Просмотреть историю:</div> открывает историю и цель игрока
			</div>
			<div className=''>
				<div className='inline font-bold'>Передвинуть:</div> при нажатии загорается зеленым в этот момент вы
				можете передвинуть игрока на любую ячейку игрового поля{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Игровое поле');
					}}>
					(см. Игровое поле)
				</div>{' '}
				без записи в историю
			</div>
			<div>
				<Imgp src={move} click={false} />
			</div>
			<div className=''>
				<div className='inline font-bold'>Передать ход:</div> передает ход выбранному игроку
			</div>
			<div className=''>
				<div className='inline font-bold'>Разочарование:</div> плюсом и минусом можно изменять количество
				разочарований у игрока, разочарования у игрока отображаются под играольной костью{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'Разочарование');
					}}>
					(см. Разочарование)
				</div>
			</div>
			<div className=''>
				<div className='inline font-bold'>Переименовать:</div> открывает меню редактирование игрока (см. ниже)
			</div>
			<div>
				<Imgp src={rename} alt='' click={false} />
			</div>
			<div className=''>
				<div className='inline font-bold'>Новая игра:</div> ставит игрока на нулевую клетку, обнуляет историию и
				цель{' '}
				<div
					className='inline text-sky-700 hover:underline cursor-pointer '
					onClick={(e: React.MouseEvent<HTMLInputElement>) => {
						onClick(e, 'История / Цель');
					}}>
					(см. История / Цель)
				</div>{' '}
			</div>
			<div className=''>
				<div className='inline font-bold'>Скрыть игрока:</div> скрывает игрока от остальных игроков кроме
				ведущих, отоборазить игрока заного можно этим же пунктом меню{' '}
			</div>
		</div>
	);

	return <div>{list.current.get(title)}</div>;
};

export default InstructionsList;
