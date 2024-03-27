import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

const INICIO = new Date('February 5, 2024').getTime();
const AGORA = new Date();

function App() {
	const semanal = ((AGORA.getTime() - INICIO) / 6.048e8) % 2 === 0 ? '1' : '2';
	const [horarios, setHorarios] = useState({});

	async function fetchData() {
		const data = await fetch('./ufabc-3xx-3/salas.json').then((res) => res.json());
		setHorarios(data);
	}

	useEffect(() => {
		fetchData();
	}, []);

	const [todosHorarios, setTodosHorarios] = useState({
		301: false,
		302: false,
		303: false,
		304: false,
		305: false,
		306: false,
		307: false,
		308: false,
		309: false,
		310: false,
		311: false,
		312: false,
	});

	return (
		<>
			<h1>Estamos na semanal {semanal}</h1>
			<p>Mostrando salas e suas disponibilidades para hoje</p>
			<p className='dica'>Dica: Clique em uma sala para alternar a visualização entre (livre no horário atual) e (todos os horários de hoje)</p>

			{Object.keys(horarios).length && (
				<div className='map'>
					{Object.keys(horarios['semanal' + semanal]).map((sala) => {
						const horariosSala = horarios['semanal' + semanal][sala][AGORA.getDay() - 1];
						const livreAgora = horariosSala.some((a) => a == AGORA.getHours());

						return (
							<button onClick={() => setTodosHorarios({ ...todosHorarios, [sala]: !todosHorarios[sala] })} key={sala} className={livreAgora ? 'livre' : 'ocupada'}>
								{todosHorarios[sala] ? (
									<ul>
										<li className={horariosSala.includes(8) ? 'livre' : 'ocupada'}>8:00 - 9:00</li>
										<li className={horariosSala.includes(9) ? 'livre' : 'ocupada'}>9:00 - 10:00</li>
										<li className={horariosSala.includes(10) ? 'livre' : 'ocupada'}>10:00 - 11:00</li>
										<li className={horariosSala.includes(11) ? 'livre' : 'ocupada'}>11:00 - 12:00</li>
										<li className={horariosSala.includes(12) ? 'livre' : 'ocupada'}>12:00 - 13:00</li>
										<li className={horariosSala.includes(13) ? 'livre' : 'ocupada'}>13:00 - 14:00</li>
										<li className={horariosSala.includes(14) ? 'livre' : 'ocupada'}>14:00 - 15:00</li>
										<li className={horariosSala.includes(15) ? 'livre' : 'ocupada'}>15:00 - 16:00</li>
										<li className={horariosSala.includes(16) ? 'livre' : 'ocupada'}>16:00 - 17:00</li>
										<li className={horariosSala.includes(17) ? 'livre' : 'ocupada'}>17:00 - 18:00</li>
										<li className={horariosSala.includes(18) ? 'livre' : 'ocupada'}>18:00 - 19:00</li>
										<li className={horariosSala.includes(19) ? 'livre' : 'ocupada'}>19:00 - 20:00</li>
										<li className={horariosSala.includes(20) ? 'livre' : 'ocupada'}>20:00 - 21:00</li>
										<li className={horariosSala.includes(21) ? 'livre' : 'ocupada'}>21:00 - 22:00</li>
										<li className={horariosSala.includes(22) ? 'livre' : 'ocupada'}>22:00 - 23:00</li>
										<li className={horariosSala.includes(23) ? 'livre' : 'ocupada'}>23:00 - 00:00</li>
									</ul>
								) : (
									<p>{sala}</p>
								)}
							</button>
						);
					})}
				</div>
			)}
		</>
	);
}

export default App;

