import "./App.css";
import { useState } from "react";
import Carta from "./components/Carta/carta";

import Cancha from "./components/Cancha/cancha";
import ElegirFormacion from "./components/ElegirFormacion/elegirFormacion";

const formaciones = [
	{ def: 4, med: 2, del: 1, name: "4-2-1" },
	{ def: 4, med: 1, del: 2, name: "4-1-2" },
	{ def: 3, med: 2, del: 1, name: "3-2-1" },
	{ def: 2, med: 3, del: 1, name: "2-3-1" },
];

const cartas = [
	{
		titulo: "ataque",
		descr: "Con esta carta lo que hace un es ser un tremendo capo capo capods kasfd alk",
		type: "ataque",
	},
	{
		titulo: "defensa",
		descr: "Con esta carta lo que hace un es ser un tremendo capo capo capods kasfd alk",
		type: "defensa",
	},
	{
		titulo: "ataque",
		descr: "Con esta carta lo que hace un es ser un tremendo capo capo capods kasfd alk",
		type: "ataque",
	},
	{
		titulo: "ataque",
		descr: "Con esta carta lo que hace un es ser un tremendo capo capo capods kasfd alk",
		type: "ataque",
	},
	{
		titulo: "neutra",
		descr: "Con esta carta lo que hace un es ser un tremendo capo capo capods kasfd alk",
		type: "neutra",
	},
	{
		titulo: "defensa",
		descr: "Con esta carta lo que hace un es ser un tremendo capo capo capods kasfd alk",
		type: "defensa",
	},
];

function App() {
	const [formacion1, setFormacion1] = useState({});
	const [formacion2, setFormacion2] = useState({});


	const [etapa, setEtapa] = useState(1);
	const [posicionPelota, setPosicionPelota] = useState(2);
	
	
	// Sistema de turnos
	const [turnoJugador1, setTurnoJugador1] = useState(true);
	const [turnosRestantes, setTurnosRestantes] = useState(20);

	// Mezclar las formaciones
	const shuffleFormaciones = () => {
		const shuffledFormaciones = formaciones.sort(() => Math.random() - 0.5);
		return [...shuffledFormaciones];
	};

	const elegirFormacion = (formacion) => {
		if (etapa === 1) {
			setFormacion1(formacion);
			setEtapa(2);
		} else if (etapa === 2) {
			setFormacion2(formacion);
			setEtapa(3);
		}
		
	};

	const renderizadoEtapa = () => {
		switch (etapa) {
			case 1:
				return(
					<ElegirFormacion 
						formaciones={shuffleFormaciones()} 
						elegirFormacion={elegirFormacion}
						nJugador="1"
						/>
				)
			case 2:
				return(
					<ElegirFormacion 
						formaciones={shuffleFormaciones()} 
						elegirFormacion={elegirFormacion}
						nJugador="2"
						/>
				);
			case 3:
				return(
					<Cancha
					formacion1={formacion1}
					formacion2={formacion2}
					posPelota={posicionPelota}
					/>
				);
			default:
				return "";
		}
	}
	return (
		<div className="App">
			
			{ renderizadoEtapa() }

			{/* <header className="App-header">
				Elegir una de las cartas
				<div className="flex gap-4 mt-8">
					{cartas.map((carta, i) => (
						<Carta key={i} carta={carta} />
					))}
				</div>
			</header> */}
		</div>
	);
}

export default App;
