import "./App.css";
import { useState, useEffect } from "react";
import Carta from "./components/Carta/carta";

import Cancha from "./components/Cancha/cancha";
import ElegirFormacion from "./components/ElegirFormacion/elegirFormacion";
import sonidoOpening from '../src/audios/opening.mp3';
import sonidoLoop from '../src/audios/ambiente1.mp3';
import sonidoPitido from '../src/audios/pitido.mp3'
import sonidoGol from '../src/audios/gol.mp3'
import PartidoTerminado from "./components/PartidoTerminado/PartidoTerminado";


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
		titulo: "Defender",
		descr: "Actua contra carta pase, aumenta probabilidad de finalizar turno rival",
		type: "defensa",
	},
	// {
	// 	titulo: "Foul",
	// 	descr: "Cancela las cartas jugadas por el rival, pero juega de nuevo",
	// 	type: "defensa",
	// },
	// {
	// 	titulo: "Despeje 1",
	// 	descr: "Cancela turno rival. Pelota adelanta 1 lugar. Siguiente jugador aleatorio",
	// 	type: "defensa",
	// },
	// {
	// 	titulo: "Despeje 2",
	// 	descr: "Cancela turno rival. Pelota adelanta 2 lugares. Siguiente jugador aleatorio",
	// 	type: "defensa",
	// },
	{
		titulo: "Atajar",
		descr: "Aumentar probabilidad de atajar",
		type: "defensa",
	},
	{
		titulo: "Adelantar defensa",
		descr: "Adelantar jugador una posicion",
		type: "neutra",
	},
	{
		titulo: "Adelantar mediocampo",
		descr: "Adelantar jugador una posicion",
		type: "neutra",
	},
	{
		titulo: "Retrasar delantero",
		descr: "Retrasar jugador una posicion",
		type: "neutra",
	},
	{
		titulo: "Retrasar mediocampo",
		descr: "Retrasar jugador una posicion",
		type: "neutra",
	},
	// {
	// 	titulo: "Atrasar",
	// 	descr: "Retrasar jugador una posicion",
	// 	type: "movimiento",
	// },
];

function App() {


	const [dialog, setDialog] = useState({
		show: false,
		text: "",
		type: "",
	});

	const [formacion1, setFormacion1] = useState([]);
	const [formacion2, setFormacion2] = useState([]);


	// Etapa 1: Elegir formacion jugador 1
	// Etapa 2: Elegir formacion jugador 2

	// Etapa: Jugar
	// Etapa 3: Elegir carta jugador 1
	// Etapa 4: Jugar cartas jugador 1 (Seleccione las cartas a usar)
	// 			Cuando hace click en la carta implementar accion de cartas jugador 1 y actualizar tablero

	// Etapa 5: Elegir carta jugador 2
	// Etapa 6: Jugar cartas jugador 2 (Seleccione las cartas a usar)
	// 			Cuando hace click en la carta implementar accion de cartas jugador 2 y actualizar tablero

	// Etapa 9: Restar turno restante y volver etapa 3 While turnosRestantes != 0

	// Se fini

	const [etapa, setEtapa] = useState(1);
	const [posicionPelota, setPosicionPelota] = useState(2);

	// Sistema de turnos
	const [turnoJugador1, setTurnoJugador1] = useState(true);
	const [turnosRestantes, setTurnosRestantes] = useState(5);

	//Sistema cartas
	const [cartasJugador1, setcartasJugador1] = useState([]);
	const [cartasJugador2, setcartasJugador2] = useState([]);
	const [cartasAleatorias, setCartasAleatorias] = useState([]);

	// Contador de seleccionar cartas
	const [seleccionadasJugador1, setSeleccionadasJugador1] = useState(0);
	const [seleccionadasJugador2, setSeleccionadasJugador2] = useState(0);

	//Cartas defensa activas
	const [defensaActivaJugador1, setDefensaActivaJugador1] = useState(false);
	const [defensaActivaJugador2, setDefensaActivaJugador2] = useState(false);

	//Cartas atajar activar
	const [atajarActivaJugador1, setAtajarActivaJugador1] = useState(false);
	const [atajarActivaJugador2, setAtajarActivaJugador2] = useState(false);

	const [centroActivaJugador1,setCentroActivaJugador1] = useState(false);
	const [centroActivaJugador2,setCentroActivaJugador2] = useState(false);

	// Puntajes
	const [puntajeJugador1, setPuntajeJugador1] = useState(0);
	const [puntajeJugador2, setPuntajeJugador2] = useState(0);

	// Mezclar las formaciones
	const shuffleFormaciones = () => {
		const shuffledFormaciones = formaciones.sort(() => Math.random() - 0.5);
		return [...shuffledFormaciones];
	};

	const showDialog = (text, type = "") => {
		setDialog({ show: true, text, type });
		// Hide after 3 seconds
		setTimeout(() => {
			setDialog({ show: false, text: "" });
		}, 3000);
	};

	const typeDialog = (type) => {
		switch (type) {
			case "error":
				return "bg-red-200 text-red-500 border-red-400";
				break;
			case "success":
				return "bg-green-200 text-green-500 border-green-400";
				break;
			default:
				return "bg-gray-200 text-gray-500 border-gray-400";
				break;
		}
	};

	const gol = () => {
		let audio = new Audio(sonidoGol);
		audio.play();
		audio.onended=function()
		{
			let audio2 = new Audio(sonidoPitido);
			audio2.play();
		}
		
	}

	const elegirFormacion = (formacion) => {
		if (etapa === 1) {
			setcartasJugador1([]);
			setFormacion1(formacion);
			setEtapa(2);
		} else if (etapa === 2) {
			setcartasJugador2([]);
			setFormacion2(formacion);
			setCartasAleatorias([...elegirNCartas(5)]);

			// Play sound loop 
			let audio = new Audio(sonidoLoop);
			audio.volume = 0.3;
			audio.loop = true;
			audio.play();

			// Play sonido pitido
			let audio2 = new Audio(sonidoPitido);
			audio2.play();


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
		console.log("hace click a carta aleatoria");

		// El jugador 1 tiene mas de 5 cartas
		if (turnoJugador1) {
			if (
				cartasJugador1.length < 5 &&
				seleccionadasJugador1 < 3 &&
				etapa === 3
			) {
				setcartasJugador1([...cartasJugador1, carta]); // Agregar carta a cartasJugador1
				setCartasAleatorias([...elegirNCartas(5)]); // Actualizar cartasAleatorias
				setSeleccionadasJugador1(seleccionadasJugador1 + 1); // Sumo una elegida de carta mas de las 3 que puede usar
				showDialog(`${(2 - seleccionadasJugador1)} cartas restantes`);
				if((2 - seleccionadasJugador1) == 0){
					showDialog("Proceda a jugar");
					setEtapa(4);
				}
			} else {
				showDialog("No puedes seleccionar mas cartas", "error");
			}
		}
		if (!turnoJugador1) {
			console.log("Turno jugador 2");
			if (
				cartasJugador2.length < 5 &&
				seleccionadasJugador2 < 3 &&
				etapa === 5
			) {
				setcartasJugador2([...cartasJugador2, carta]); // Agregar carta a cartasJugador1
				setCartasAleatorias([...elegirNCartas(5)]); // Actualizar cartasAleatorias
				setSeleccionadasJugador2(seleccionadasJugador2 + 1); // Sumo una elegida de carta mas de las 3 que puede usar
				showDialog(`${(2 - seleccionadasJugador2)} cartas restantes`);
				if((2 - seleccionadasJugador2) == 0){
					showDialog("Proceda a jugar");
					setEtapa(6);
				}
			} else {
				showDialog("No puedes seleccionar mas cartas", "error");
			}
		}
	};

	function coinFlip(prob) {
		return Math.random() < prob ? true : false;
	}

	const porcentual = (prob) => {
		// eliminar decimales
		// Truncar sin decimales
		return Math.trunc(prob * 100) + "%";
	};

	const jugarCarta1 = (carta) => {
		if (carta.titulo == "Pase") {
			if (posicionPelota != 3) {
				// Para que el pase se de hay que tener en cuenta 3 cosas
				// 1. Cantidad de jugadores de la linea del jugador 1 de donde sale el pase y a donde llega
				// 2. Cantidad de jugadores de la linea del jugador 2 de donde sale el pase
				// 3. Si el jugador 2 tiene una defensa activa

				let chances = 1;
				let sumaJugadoresPropios = 0;
				let sumaJugadoresRivales = 0;
				if (posicionPelota == 1) {
					sumaJugadoresPropios = formacion1.def + formacion1.med; // 6
					sumaJugadoresRivales = formacion2.del; // 2
				}
				if (posicionPelota == 2) {
					sumaJugadoresPropios = formacion1.del + formacion1.med;
					sumaJugadoresRivales = formacion2.med;
				}
				chances =
					(3 * sumaJugadoresPropios) /
					(3 * sumaJugadoresPropios + sumaJugadoresRivales);

				if (defensaActivaJugador2) {
					// Chances dividadas entre 2
					chances /= 2;
				}
				if (coinFlip(chances)) {
					setPosicionPelota(posicionPelota + 1);
					showDialog(
						`Pase completado con ${porcentual(chances)} chances`,
						"success"
					);
				} else {
					showDialog(
						`Pase errado con ${porcentual(
							chances
						)} chances, turno jugador 2`,
						"error"
					);
					// Arranca el turno del jugador 2
					setTurnoJugador1(false);
					clickBoton();
					return;
				}
				console.log("Se jugo cara pase");
			}
		}
		if (carta.titulo == "Disparo") {
			//A mayor distancia, menos probabilidad de gol
			let sumaJugadoresPropios = 0;
			let sumaJugadoresRivales = 0;
			let chances = 1;
			if (posicionPelota == 3) {
				sumaJugadoresPropios = formacion1.del;
				sumaJugadoresRivales = formacion2.def;
			}
			if (posicionPelota == 2) {
				sumaJugadoresPropios = formacion1.med;
				sumaJugadoresRivales = formacion2.med + formacion2.def;
			}
			if (posicionPelota == 1) {
				sumaJugadoresPropios = formacion1.def;
				sumaJugadoresRivales =
					formacion2.del + formacion2.med + formacion2.def;
			}

			chances =
				0.5 * ((1 / 3) * posicionPelota) +
				0.5 *
					((3 * sumaJugadoresPropios) /
						(3 * sumaJugadoresPropios + sumaJugadoresRivales));

			if (atajarActivaJugador2) {
				// Chances divididas entre 2
				chances /= 2;
			}
			// Divido todo por 2 para que no haya tantos goles
			chances /= 2;

			if (coinFlip(chances)) {
				gol();
				showDialog(
					`Gol! con ${porcentual(chances)} chances`,
					"success"
				);
				setPosicionPelota(2);
				setPuntajeJugador1(puntajeJugador1 + 1);
				
				setTurnoJugador1(false);
				clickBoton();
			} else {
				showDialog(
					`Gol errado con ${porcentual(
						chances
					)} chances, turno jugador 2`,
					"error"
				);
				// Arranca el turno del jugador 2
				setTurnoJugador1(false);
				clickBoton();
				return;
			}
		}
		if(carta.titulo == "Centro"){
			if(posicionPelota == 3){
				setCentroActivaJugador1(true);
			}else{
				showDialog("Los centros se tiran en el area rival");
			}
			return;
		}
		if (carta.titulo == "Cabeza") {
			//A mayor distancia, menos probabilidad de gol
			let sumaJugadoresPropios = 0;
			let sumaJugadoresRivales = 0;
			let chances = 1;
			if (posicionPelota == 3) {
				sumaJugadoresPropios = formacion1.del;
				sumaJugadoresRivales = formacion2.def;
			}
			else{
				showDialog("La cabeza se tiran en el area rival");
				return;
			}

			chances =
				0.5 * ((1 / 3) * posicionPelota) +
				0.5 *
					((3 * sumaJugadoresPropios) /
						(3 * sumaJugadoresPropios + sumaJugadoresRivales));

			if (atajarActivaJugador2) {
				// Chances divididas entre 2
				chances /= 2;
			}

			if (centroActivaJugador1) {
				chances*=2;
				setCentroActivaJugador1(false);
			}
			// Divido todo por 2 para que no haya tantos goles
			chances /= 2;

			if (coinFlip(chances)) {
				gol();
				showDialog(
					`Gol! con ${porcentual(chances)} chances`,
					"success"
				);
				setPosicionPelota(2);
				setPuntajeJugador1(puntajeJugador1 + 1);
				// Arranca el turno del jugador 2
				setTurnoJugador1(false);
				clickBoton();
				return;
			} else {
				showDialog(
					`Gol errado con ${porcentual(
						chances
					)} chances, turno jugador 2`,
					"error"
				);
				// Arranca el turno del jugador 2
				setTurnoJugador1(false);
				clickBoton();
				return;
			}
		}
		if (carta.titulo == "Atajar") {
			setAtajarActivaJugador1(true);
			return;
		}
		if (carta.titulo == "Defender") {
			setDefensaActivaJugador1(true);
			return;
		}
		if (carta.titulo == "Adelantar defensa") {
			if (formacion1.def == 1){
				showDialog("No puedes quedarte sin defensa");
				return;
			} 
			setFormacion1({
				def: formacion1.def -1 ,
				med: formacion1.med + 1,
				del: formacion1.del,
				name: (formacion1.def -1) + "-" +(formacion1.med + 1 )+ "-" + formacion1.del,
			})
		}
		if (carta.titulo == "Adelantar mediocampo") {
			if (formacion1.med == 1){
				showDialog("No puedes quedarte sin mediocampo");
				return;
			}
			setFormacion1({
				def: formacion1.def,
				med: formacion1.med - 1,
				del: formacion1.del + 1,
				name: formacion1.def + "-" + (formacion1.med - 1) + "-" + (formacion1.del + 1),
			})
		}
		if (carta.titulo == "Retrasar delantero"){
			if (formacion1.del == 1){
				showDialog("No puedes quedarte sin delantero");
				return;
			}
			setFormacion1({
				def: formacion1.def ,
				med: formacion1.med + 1,
				del: formacion1.del - 1,
				name: formacion1.def+ "-" + (formacion1.med + 1) + "-" + (formacion1.del - 1),
			})
		}
		if (carta.titulo == "Retrasar mediocampo"){
			if (formacion1.med == 1){
				showDialog("No puedes quedarte sin mediocampo");
				return;
			}
			setFormacion1({
				def: formacion1.def + 1,
				med: formacion1.med - 1,
				del: formacion1.del,
				name: (formacion1.def + 1) + "-" + (formacion1.med - 1) + "-" + formacion1.del,
			})
		}
	};

	const jugarCarta2 = (carta) => {
		if (carta.titulo == "Pase") {
			if (posicionPelota != 1) {
				// Para que el pase se de hay que tener en cuenta 3 cosas
				// 1. Cantidad de jugadores de la linea del jugador 1 de donde sale el pase y a donde llega
				// 2. Cantidad de jugadores de la linea del jugador 2 de donde sale el pase
				// 3. Si el jugador 2 tiene una defensa activa

				let chances = 1;
				let sumaJugadoresPropios = 0;
				let sumaJugadoresRivales = 0;
				if (posicionPelota == 3) {
					sumaJugadoresPropios = formacion1.def + formacion1.med; // 6
					sumaJugadoresRivales = formacion2.del; // 2
				}
				if (posicionPelota == 2) {
					sumaJugadoresPropios = formacion1.del + formacion1.med;
					sumaJugadoresRivales = formacion2.med;
				}
				chances =
					(3 * sumaJugadoresPropios) /
					(3 * sumaJugadoresPropios + sumaJugadoresRivales);

				if (defensaActivaJugador2) {
					// Chances dividadas entre 2
					chances /= 2;
				}
				if (coinFlip(chances)) {
					showDialog(
						`Pase completado con ${porcentual(chances)} chances`,
						"success"
					);
					setPosicionPelota(posicionPelota - 1);
				} else {
					showDialog(
						`Pase errado con ${porcentual(
							chances
						)} chances, turno jugador 1`,
						"error"
					);
					// Arranca el turno del jugador 2
					setTurnoJugador1(true);
					clickBoton();
					return;
				}
			}
		}
		if (carta.titulo == "Disparo") {
			//A mayor distancia, menos probabilidad de gol
			let sumaJugadoresPropios = 0;
			let sumaJugadoresRivales = 0;
			let chances = 1;
			if (posicionPelota == 1) {
				sumaJugadoresPropios = formacion2.del;
				sumaJugadoresRivales = formacion1.def;
			}
			if (posicionPelota == 2) {
				sumaJugadoresPropios = formacion2.med;
				sumaJugadoresRivales = formacion1.med + formacion1.def;
			}
			if (posicionPelota == 3) {
				sumaJugadoresPropios = formacion2.def;
				sumaJugadoresRivales =
					formacion1.del + formacion1.med + formacion1.def;
			}

			chances =
				0.5 * (1/ posicionPelota) +
				0.5 *
					((3 * sumaJugadoresPropios) /
						(3 * sumaJugadoresPropios + sumaJugadoresRivales));

			if (atajarActivaJugador2) {
				// Chances divididas entre 2
				chances /= 2;
			}
			// Divido todo por 2 para que no haya tantos goles
			chances /= 2;

			if (coinFlip(chances)) {
				gol();
				showDialog(`Gol! con ${porcentual(chances)} chances`, "success");
				setPosicionPelota(2);
				setPuntajeJugador2(puntajeJugador2 + 1);
				// Arranca el turno del jugador 1
				setTurnoJugador1(true);
				clickBoton();
				return;
			} else {
				showDialog(
					`Gol errado con ${porcentual(chances)} chances, turno jugador 2`,
					"error"
				);
				// Arranca el turno del jugador 1
				setTurnoJugador1(true);
				clickBoton();
				return;
			}
		}
		if(carta.titulo == "Centro"){
			if(posicionPelota == 1){
				setCentroActivaJugador2(true);
			}else{
				showDialog("Los centros se tiran en el area rival");
			}
			return;
		}
		if (carta.titulo == "Cabeza") {
			//A mayor distancia, menos probabilidad de gol
			let sumaJugadoresPropios = 0;
			let sumaJugadoresRivales = 0;
			let chances = 1;
			if (posicionPelota == 1) {
				sumaJugadoresPropios = formacion2.del;
				sumaJugadoresRivales = formacion1.def;
			}
			else{
				showDialog("La cabeza se tiran en el area rival");
				return;
			}

			chances =
				0.5 * (1/ posicionPelota) +
				0.5 *
					((3 * sumaJugadoresPropios) /
						(3 * sumaJugadoresPropios + sumaJugadoresRivales));

			if (atajarActivaJugador1) {
				// Chances divididas entre 2
				chances /= 2;
			}

			if (centroActivaJugador2) {
				chances*=2;
				setCentroActivaJugador2(false);
			}
			// Divido todo por 2 para que no haya tantos goles
			chances /= 2;

			if (coinFlip(chances)) {
				gol();
				showDialog(
					`Gol! con ${porcentual(chances)} chances`,
					"success"
				);
				setPosicionPelota(2);
				setPuntajeJugador2(puntajeJugador2 + 1);
				// Arranca el turno del jugador 2
				setTurnoJugador1(true);
				clickBoton();
				return;
			} else {
				showDialog(
					`Gol errado con ${porcentual(
						chances
					)} chances, turno jugador 2`,
					"error"
				);
				// Arranca el turno del jugador 2
				setTurnoJugador1(true);
				clickBoton();
				return;
			}
		}
		if (carta.titulo == "Atajar") {
			setAtajarActivaJugador2(true);
			return;
		}
		if (carta.titulo == "Defender") {
			setDefensaActivaJugador2(true);
			return;
		}
		if (carta.titulo == "Adelantar defensa") {
			if (formacion2.def == 1){
				showDialog("No puedes quedarte sin defensa");
				return;
			} 
			setFormacion2({
				def: formacion2.def -1 ,
				med: formacion2.med + 1,
				del: formacion2.del,
				name: (formacion2.def -1) + "-" + (formacion2.med + 1) + "-" + formacion2.del,
			})
		}
		if (carta.titulo == "Adelantar mediocampo") {
			if (formacion2.med == 1){
				showDialog("No puedes quedarte sin mediocampo");
				return;
			}
			setFormacion2({
				def: formacion2.def,
				med: formacion2.med - 1,
				del: formacion2.del + 1,
				name: formacion2.def + "-" + (formacion2.med - 1) + "-" + (formacion2.del + 1),
			})
		}
		if (carta.titulo == "Retrasar delantero"){
			if (formacion2.del == 1){
				showDialog("No puedes quedarte sin delantero");
				return;
			}
			setFormacion2({
				def: formacion2.def ,
				med: formacion2.med + 1,
				del: formacion2.del - 1,
				name: formacion2.def+ "-" + (formacion2.med + 1) + "-" + (formacion2.del - 1),
			})
		}
		if (carta.titulo == "Retrasar mediocampo"){
			if (formacion2.med == 1){
				showDialog("No puedes quedarte sin mediocampo");
				return;
			}
			setFormacion2({
				def: formacion2.def + 1,
				med: formacion2.med - 1,
				del: formacion2.del,
				name: (formacion2.def + 1) + "-" + (formacion2.med - 1) + "-" + formacion2.del,
			})
		}
	};

	const clickCartaJugador1 = (carta, key) => {
		if (!turnoJugador1) return; // Si no es el turno del jugador 1 no hago nada
		// Ver que etapa está
		if (etapa === 3) {
			// Elimino la carta del array de cartasJugador1 en la key
			// Preguntar si quiere borrarla
			if (window.confirm("¿Quieres borrar la carta " + carta.titulo + "?")) {
				setcartasJugador1(cartasJugador1.filter((c, i) => i !== key));
			};
		}
		if (etapa === 4) {
			//Juega la carta y la elimino del array de cartasJugador1 en la key
			jugarCarta1(carta);
			setcartasJugador1(cartasJugador1.filter((c, i) => i !== key)); // Elimino la carta del array de cartasJugador1 en la key
		}
	};

	const clickCartaJugador2 = (carta, key) => {
		if (turnoJugador1) return; // Si no es el turno del jugador 1 no hago nada

		// Elimino la carta del array de cartasJugador2 en la key
		if (etapa === 5) {
			// Elimino la carta del array de cartasJugador1 en la key
			if (window.confirm("¿Quieres borrar la carta " + carta.titulo + "?")) {
				setcartasJugador2(cartasJugador2.filter((c, i) => i !== key));
			};
		}
		if (etapa === 6) {
			//Juega la carta y la elimino del array de cartasJugador2 en la key
			jugarCarta2(carta);
			setcartasJugador2(cartasJugador2.filter((c, i) => i !== key)); // Elimino la carta del array de cartasJugador2 en la key
		}
	};

	const clickBoton = () => {

		// Seteo todos los centros en false
		setCentroActivaJugador1(false);
		setCentroActivaJugador2(false);

		// Actualizar turnos restantes
		if (turnoJugador1) setSeleccionadasJugador1(0);
		else setSeleccionadasJugador2(0);

		// Actualizar turno
		if (etapa == 4) {
			// Seteo en falso todas las cartas que duran un turno
			setAtajarActivaJugador2(false);
			setCentroActivaJugador2(false);
			setDefensaActivaJugador2(false);

			setTurnoJugador1(!turnoJugador1); // Cambiamos
		}

		if (etapa === 6) {
			// Arranca el turno del jugador 1
			
			// Seteo en falso todas las cartas que duran un turno
			setAtajarActivaJugador1(false);
			setCentroActivaJugador1(false);
			setDefensaActivaJugador1(false);

			setTurnoJugador1(true);
			setTurnosRestantes(turnosRestantes - 1); // Turnos de toda la partida
			if (turnosRestantes < 1 ){
				setEtapa(7);
			}
			setEtapa(3);
		} else {
			// Actualizar etapa
			setEtapa(etapa + 1);
		}

		if (turnosRestantes === 0) {
			setEtapa(7);
			return;
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
			case 4:
			case 5:
			case 6:
				return (
					<>
						<Cancha
							clickCartaAleatoria={clickCartaAleatoria}
							clickCartaJugador1={clickCartaJugador1}
							clickCartaJugador2={clickCartaJugador2}
							finalizarTurno={clickBoton}
							formacion1={formacion1}
							formacion2={formacion2}
							posPelota={posicionPelota}
							cartas={cartas}
							cartasJugador1={cartasJugador1}
							cartasJugador2={cartasJugador2}
							etapa={etapa}
							cartasAleatorias={cartasAleatorias}
							seleccionadasJugador1={seleccionadasJugador1}
							seleccionadasJugador2={seleccionadasJugador2}
							turnoJugador1={turnoJugador1}
							puntajeJugador1={puntajeJugador1}
							puntajeJugador2={puntajeJugador2}
							turnosRestantes={turnosRestantes}
							atajarActivaJugador1={atajarActivaJugador1}
							atajarActivaJugador2={atajarActivaJugador2}
							centroActivaJugador1={centroActivaJugador1}
							centroActivaJugador2={centroActivaJugador2}
							defensaActivaJugador1={defensaActivaJugador1}
							defensaActivaJugador2={defensaActivaJugador2}
							
						/>
						{dialog.show && (
							<div className="absolute top-0 left-0 right-0 mt-4 grid justify-items-center">
								<div
									className={
										"py-4 px-6 w-min border rounded shadow-md text-3xl " +
										typeDialog(dialog.type)
									}
								>
									{dialog.text}
								</div>
							</div>
						)}
					</>
				);
			case 7:
				return (
					<PartidoTerminado
						puntajeJugador1={puntajeJugador1}
						puntajeJugador2={puntajeJugador2}
						/>
				)
			default:
				return "";
		}
	};

	return <div className="App">{renderizadoEtapa()}</div>;
}

export default App;
