import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

const INICIO = new Date('February 5, 2024').getTime();
const AGORA = new Date();

function App() {
	const semanal = ((AGORA.getTime() - INICIO) / 6.048e8) % 2 === 0 ? '1' : '2';
	const [horarios, setHorarios] = useState({});

	async function fetchData() {
		const data = await fetch('./salas.json').then((res) => res.json());
		setHorarios(data);
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<h1>Estamos na semanal {semanal}</h1>
			<p>Mostrando salas e seus devidos horários para esta semanal</p>

			{Object.keys(horarios).length && (
				<div className='map'>
					{Object.keys(horarios['semanal' + semanal]).map((sala) => {
						const livreAgora = horarios['semanal' + semanal][sala][AGORA.getDay() - 1].some((a) => a == AGORA.getHours());

						return (
							<button key={sala} className={livreAgora ? 'livre' : 'ocupada'}>
								<p>{sala}</p>
							</button>
						);
					})}
				</div>
			)}
		</>
	);
}

export default App;

