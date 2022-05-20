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
		titulo: "Pase",
		descr: "Adelanta pelota un lugar",
		type: "ataque",
	},
	{
		titulo: "Centro",
		descr: "Realizar centro",
		type: "ataque",
	},
	{
		titulo: "Cabeza",
		descr: "Disparo de cabeza",
		type: "ataque",
	},
	{
		titulo: "Disparo",
		descr: "Disparo al arco",
		type: "ataque",
	},
	{
		titulo: "Quite",
		descr: "Finaliza turno rival",
		type: "defensa",
	},
	{
		titulo: "Foul",
		descr: "Cancela las cartas jugadas por el rival, pero juega de nuevo",
		type: "defensa",
	},
	{
		titulo: "Despeje 1",
		descr: "Cancela turno rival. Pelota adelanta 1 lugar. Siguiente jugador aleatorio",
		type: "defensa",
	},
	{
		titulo: "Despeje 2",
		descr: "Cancela turno rival. Pelota adelanta 2 lugares. Siguiente jugador aleatorio",
		type: "defensa",
	},
	{
		titulo: "Atajar",
		descr: "Ataje seguro",
		type: "defensa",
	},
	{
		titulo: "Adelantar",
		descr: "Adelantar jugador una posicion",
		type: "movimiento",
	},
	{
		titulo: "Atrasar",
		descr: "Retrasar jugador una posicion",
		type: "movimiento",
	},
];

function App() {
	const [formacion1, setFormacion1] = useState([]);
	const [formacion2, setFormacion2] = useState([]);

	const [etapa, setEtapa] = useState(1);
	const [posicionPelota, setPosicionPelota] = useState(2);

	// Sistema de turnos
	const [turnoJugador1, setTurnoJugador1] = useState(true);
	const [turnosRestantes, setTurnosRestantes] = useState(20);

	//Sistema cartas
	const [cartasJugador1, setcartasJugador1] = useState([]);
	const [cartasJugador2, setcartasJugador2] = useState([]);
	const [cartasAleatorias, setcartasAleatorias] = useState({});

	// Mezclar las formaciones
	const shuffleFormaciones = () => {
		const shuffledFormaciones = formaciones.sort(() => Math.random() - 0.5);
		return [...shuffledFormaciones];
	};

	const elegirFormacion = (formacion) => {
		if (etapa === 1) {
			setcartasJugador1([
				{
					titulo: "Pase",
					descr: "Adelanta pelota un lugar",
					type: "ataque",
				},
				{
					titulo: "Centro",
					descr: "Realizar centro",
					type: "ataque",
				},
			]);
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
				return (
					<ElegirFormacion
						formaciones={shuffleFormaciones()}
						elegirFormacion={elegirFormacion}
						nJugador="1"
					/>
				);
			case 2:
				return (
					<ElegirFormacion
						formaciones={shuffleFormaciones()}
						elegirFormacion={elegirFormacion}
						nJugador="2"
					/>
				);
			case 3:
				return (
					<Cancha
						formacion1={formacion1}
						formacion2={formacion2}
						posPelota={posicionPelota}
						cartas={cartas}
						cartasJugador1={cartasJugador1}
					/>
				);
			default:
				return "";
		}
	};

	return <div className="App">{renderizadoEtapa()}</div>;
}

export default App;
