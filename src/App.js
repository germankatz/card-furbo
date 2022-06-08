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

	// Etapa 1: Elegir formacion jugador 1
	// Etapa 2: Elegir formacion jugador 2

	// Etapa: Jugar
	// Etapa 3: Elegir carta jugador 1
	// Etapa 4: Jugar cartas jugador 1 (Seleccione las cartas a usar)
	// Etapa 5: Implementar accion de cartas jugador 1 y actualizar tablero

	// Etapa 6: Elegir carta jugador 2
	// Etapa 7: Jugar cartas jugador 2 (Seleccione las cartas a usar)
	// Etapa 8: Implementar accion de cartas jugador 2 y actualizar tablero

	// Etapa 9: Restar turno restante y volver etapa 3 While turnosRestantes != 0

	// Se fini

	const [etapa, setEtapa] = useState(1);
	const [posicionPelota, setPosicionPelota] = useState(3);

	// Sistema de turnos
	const [turnoJugador1, setTurnoJugador1] = useState(true);
	const [turnosRestantes, setTurnosRestantes] = useState(20);

	//Sistema cartas
	const [cartasJugador1, setcartasJugador1] = useState([]);
	const [cartasJugador2, setcartasJugador2] = useState([]);
	const [cartasAleatorias, setCartasAleatorias] = useState([]);

	// Contador de seleccionar cartas
	const [seleccionadasJugador1, setSeleccionadasJugador1] = useState(0);
	const [seleccionadasJugador2, setSeleccionadasJugador2] = useState(0);

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
			setcartasJugador2([
				{
					titulo: "Pase largo",
					descr: "Adelanta pelota dos lugares",
					type: "ataque",
				},
				{
					titulo: "Centro",
					descr: "Realizar centro",
					type: "ataque",
				},
			]);
			setFormacion2(formacion);
			setCartasAleatorias([...elegirNCartas(5)]);
			setEtapa(3);
		}
	};

	const elegirNCartas = (n) => {
		// Choose n cards from cartas randomly
		const cartasN = [];
		const cartasEdit = [...cartas];
		for (let i = 0; i < n; i++) {
			const index = Math.floor(Math.random() * cartasEdit.length);
			cartasN.push(cartasEdit[index]);
			cartasEdit.splice(index, 1); // Quito 1 carta a partir del indice
		}
		return cartasN;
	};

	const clickCartaAleatoria = (carta) => {
		// Vemos de quien es el turno
		// turnoJugador1 <- Booleano que nos dice de quien es el turno;

		// El jugador 1 tiene mas de 5 cartas
		if (turnoJugador1) {
			if (cartasJugador1.length < 5 && seleccionadasJugador1 < 3) {
				setcartasJugador1([...cartasJugador1, carta]); // Agregar carta a cartasJugador1
				setCartasAleatorias([...elegirNCartas(5)]); // Actualizar cartasAleatorias
				setSeleccionadasJugador1(seleccionadasJugador1 + 1); // Sumo una elegida de carta mas de las 3 que puede usar
			}
		}
		if (!turnoJugador1) {
			if (cartasJugador2.length < 5 && seleccionadasJugador2 < 3) {
				setcartasJugador2([...cartasJugador2, carta]); // Agregar carta a cartasJugador1
				setCartasAleatorias([...elegirNCartas(5)]); // Actualizar cartasAleatorias
				setSeleccionadasJugador2(seleccionadasJugador2 + 1); // Sumo una elegida de carta mas de las 3 que puede usar
			}
		}
	};

	const clickCartaJugador1 = (carta, key) => {
		if (!turnoJugador1) return; // Si no es el turno del jugador 1 no hago nada

		// Elimino la carta del array de cartasJugador1 en la key
		setcartasJugador1(cartasJugador1.filter((c, i) => i !== key));
	};

	const clickCartaJugador2 = (carta, key) => {
		if (turnoJugador1) return; // Si no es el turno del jugador 1 no hago nada

		// Elimino la carta del array de cartasJugador2 en la key
		setcartasJugador2(cartasJugador2.filter((c, i) => i !== key));
	};

	const finalizarTurno = () => {
		console.log("Finalizar turno");

		// Actualizar turnos restantes
		if (turnoJugador1) setSeleccionadasJugador1(0);
		else setSeleccionadasJugador2(0);

		// Actualizar turno
		setTurnoJugador1(!turnoJugador1); // Cambiamos
		setTurnosRestantes(turnosRestantes - 1); // Turnos de toda la partida

		// Actualizar etapa
		setEtapa(etapa + 1);
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
			case 3: case 4: case 5: case 6: 
				return (
					<Cancha
						formacion1={formacion1}
						formacion2={formacion2}
						posPelota={posicionPelota}
						cartas={cartas}
						cartasJugador1={cartasJugador1}
						cartasJugador2={cartasJugador2}
						etapa={etapa}
						cartasAleatorias={cartasAleatorias}
						clickCartaAleatoria={clickCartaAleatoria}
						clickCartaJugador1={clickCartaJugador1}
						clickCartaJugador2={clickCartaJugador2}
						seleccionadasJugador1={seleccionadasJugador1}
						seleccionadasJugador2={seleccionadasJugador2}
						finalizarTurno={finalizarTurno}
						turnoJugador1={turnoJugador1}
					/>
				);
			default:
				return "";
		}
	};

	return <div className="App">{renderizadoEtapa()}</div>;
}

export default App;
