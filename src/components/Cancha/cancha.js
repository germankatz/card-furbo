import Carta from "../Carta/carta";
import CartaVacia from "../Carta/cartaVacia";

export default function Cancha({
	formacion1,
	formacion2,
	posPelota,
	cartas,
	cartasJugador1,
	cartasJugador2,
	etapa,
	cartasAleatorias,
	clickCartaAleatoria,
	clickCartaJugador1,
	clickCartaJugador2,
	seleccionadasJugador1,
	seleccionadasJugador2,
	finalizarTurno,
	turnoJugador1,
	puntajeJugador1,
	puntajeJugador2,
	turnosRestantes,
	atajarActivaJugador1,
	atajarActivaJugador2,
	centroActivaJugador1,
	centroActivaJugador2,
	defensaActivaJugador1,
	defensaActivaJugador2,
}) {
	// Etapa: Jugar
	// Etapa 3: Elegir carta jugador 1
	// Etapa 4: Jugar cartas jugador 1 (Seleccione las cartas a usar)
	// Etapa 5: Implementar accion de cartas jugador 1 y actualizar tablero

	// Etapa 6: Elegir carta jugador 2
	// Etapa 7: Jugar cartas jugador 2 (Seleccione las cartas a usar)
	// Etapa 8: Implementar accion de cartas jugador 2 y actualizar tablero

	// Etapa 9: Restar turno restante y volver etapa 3 While turnosRestantes != 0


	const descrBoton = () => {
		switch (etapa) {
			case 1:
				return "Elegir formacion";
			case 2:
				return "Elegir formacion";
			case 3:
				return "Jugar cartas";
			case 4:
				return "Finalizar turno";
			case 5:
				return "Finalizar turno";
			case 6:
				return "Jugar cartas";
			case 7:
				return "Finalizar turno";
			case 8:
				return "Finalizando turno";
			case 9:
				return "-";
			default:
				return "";
		}
	};

	const explicacionTablero = () => {
		switch (etapa) {
			case 3:
				return (
					"Elegir carta jugador 1 - " +
					(3 - seleccionadasJugador1) +
					" restantes"
				);
			case 4:
				return "Jugar cartas jugador 1";
			case 5:
				return "Elegir carta jugador 2 - "  +
				(3 - seleccionadasJugador2) +
				" restantes";
			case 6:
				return "Jugar cartas jugador 2";
			case 7:
				return "Jugar cartas jugador 2";
			case 8:
				return "";
			case 9:
				return "";
			default:
				return "";
		}
	};

	const mazoJugador1 = () => {
		let cantCartasJugador1 = cartasJugador1.length;
		let mazo = [];
		cartasJugador1.map((carta, i) =>
			mazo.push(
				<Carta
					key={i}
					id={i}
					carta={carta}
					className="w-1/5"
					clickCarta={eleccionCartaJugador1}
				/>
			)
		);
		console.log(cartasJugador1);

		for (let index = 0; index < 5 - cantCartasJugador1; index++) {
			mazo.push(
				<CartaVacia
					key={index + cantCartasJugador1}
					className="w-1/5"
				/>
			);
		}
		return mazo;
	};

	const mazoJugador2 = () => {
		let cantCartasJugador2 = cartasJugador2.length;
		let mazo = [];

		cartasJugador2.map((carta, i) =>
			mazo.push(
				<Carta
					key={i}
					id={i}
					carta={carta}
					className="w-1/5"
					clickCarta={eleccionCartaJugador2}
				/>
			)
		);

		for (let index = 0; index < 5 - cantCartasJugador2; index++) {
			mazo.push(
				<CartaVacia
					key={index + cantCartasJugador2}
					className="w-1/5"
				/>
			);
		}
		return mazo;
	};

	const eleccionCartaJugador1 = (carta, id) => {
		console.log("click carta cancha ", carta);
		clickCartaJugador1(carta, id);
	};

	const eleccionCartaAleatoria = (carta, key) => {
		clickCartaAleatoria(carta);
	};

	const terminarTurno = () => {
		finalizarTurno();
	};

	const eleccionCartaJugador2 = (carta, id) => {
		clickCartaJugador2(carta, id);
	};

	const graficarPelota = (posCancha) => {
		if (posCancha == posPelota) {
			return (
				<div className="grid grid-cols-1 content-center">
					<svg
						className="h-8 w-8 border-white animate-bounce "
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path d="M177.1 228.6L207.9 320h96.5l29.62-91.38L256 172.1L177.1 228.6zM255.1 0C114.6 0 .0001 114.6 .0001 256S114.6 512 256 512s255.1-114.6 255.1-255.1S397.4 0 255.1 0zM416.6 360.9l-85.4-1.297l-25.15 81.59C290.1 445.5 273.4 448 256 448s-34.09-2.523-50.09-6.859L180.8 359.6l-85.4 1.297c-18.12-27.66-29.15-60.27-30.88-95.31L134.3 216.4L106.6 135.6c21.16-26.21 49.09-46.61 81.06-58.84L256 128l68.29-51.22c31.98 12.23 59.9 32.64 81.06 58.84L377.7 216.4l69.78 49.1C445.8 300.6 434.8 333.2 416.6 360.9z" />
					</svg>
				</div>
			);
		} else {
			return (
				<div className="grid grid-cols-1 content-center">
					<svg
						className="h-8 w-8 border-white animate-bounce opacity-0"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path d="M177.1 228.6L207.9 320h96.5l29.62-91.38L256 172.1L177.1 228.6zM255.1 0C114.6 0 .0001 114.6 .0001 256S114.6 512 256 512s255.1-114.6 255.1-255.1S397.4 0 255.1 0zM416.6 360.9l-85.4-1.297l-25.15 81.59C290.1 445.5 273.4 448 256 448s-34.09-2.523-50.09-6.859L180.8 359.6l-85.4 1.297c-18.12-27.66-29.15-60.27-30.88-95.31L134.3 216.4L106.6 135.6c21.16-26.21 49.09-46.61 81.06-58.84L256 128l68.29-51.22c31.98 12.23 59.9 32.64 81.06 58.84L377.7 216.4l69.78 49.1C445.8 300.6 434.8 333.2 416.6 360.9z" />
					</svg>
				</div>
			);
		}
	};

	return (
		<div>
			<div className="w-full h-screen bg-green-500 p-8 overflow-hidden">
				{/* Marcador del juego juego */}
				<div className="flex justify-between  mb-8 text-2xl font-bold px-16 uppercase">
					<div className="text-white flex gap-4">
						<div>
							<div className={"rounded-full w-5 h-5 bg-blue-500 mt-2 absolute "}></div>
							<div className={"rounded-full w-5 h-5 bg-blue-500 mt-2 absolute " + (turnoJugador1?  "animate-ping" : null)}></div>
						</div>
						<div className="ml-4">
							<div>Jugador 1</div>
							<div className="text-left">{formacion1.name} </div>
							{atajarActivaJugador1 ? (<div className="mt-2 -ml-2 text-sm rounded-full bg-blue-900 text-white px-3 py-1">Atajar activo</div>) : null}
							{defensaActivaJugador1 ? (<div className="mt-2 -ml-2 text-sm rounded-full bg-blue-900 text-white px-3 py-1">Defender activo</div>) : null}
						</div>
					</div>
					<div className="text-white text-5xl grid justify-items-center">
						<div className="text-sm">
							{turnosRestantes} turnos restantes
						</div>
						<div>
							{puntajeJugador1} - {puntajeJugador2}
						</div>
						<div className="text-center text-lg ">
							{explicacionTablero()}
						</div>
						<div
							onClick={terminarTurno}
							className="px-4 py-3 flex bg-green-800 text-sm rounded-full w-min shadow-sm cursor-pointer hover:bg-green-900"
						>
							Siguiente 
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
							</svg>
						</div>
					</div>
					<div className="text-white flex gap-4">
						<div>
							<div>Jugador 2</div>
							<div className="text-right">{formacion2.name} </div>
							{atajarActivaJugador2 ? (<div className="mt-2 -mr-2 text-sm rounded-full bg-red-900 text-white px-3 py-1">Atajar activo</div>) : null}
							{defensaActivaJugador2 ? (<div className="mt-2 -mr-2 text-sm rounded-full bg-red-900 text-white px-3 py-1">Defender activo</div>) : null}
						</div>
						<div>
							<div className={"rounded-full w-5 h-5 bg-red-500 mt-2 absolute" }></div>
							<div className={"rounded-full w-5 h-5 bg-red-500 mt-2 absolute " + (!turnoJugador1? "animate-ping": null)}></div>
						</div>
					</div>
				</div>

				{/* Tablero de juego */}
				<div className="h-[60%] mx-32 flex justify-between  border-8 border-white">
					<div className="grid grid-cols-1 content-center -mx-2 w-16 h-full">
						<div className="h-32 border-8 border-white grid grid-cols-1">
							<div className="w-8 h-8 rounded-full bg-gray-800 place-self-center"></div>
						</div>
					</div>
					<div className="grid grid-cols-1 content-around">
						{[...Array(formacion1.def)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-blue-500"></div>
							</div>
						))}
					</div>
					{graficarPelota(1)}
					<div className="grid grid-cols-1 content-around">
						{[...Array(formacion2.del)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-red-500"></div>
							</div>
						))}
					</div>
					<div className="h-full bg-green-300 w-3 "></div>
					<div className="grid grid-cols-1 content-around">
						{[...Array(formacion1.med)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-blue-500"></div>
							</div>
						))}
					</div>
					{graficarPelota(2)}
					<div className="grid grid-cols-1 content-around">
						{[...Array(formacion2.med)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-red-500"></div>
							</div>
						))}
					</div>

					<div className="h-full bg-green-300 w-3 "></div>
					<div className="grid grid-cols-1 content-around">
						{[...Array(formacion1.del)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-blue-500"></div>
							</div>
						))}
					</div>
					{graficarPelota(3)}
					<div className="grid grid-cols-1 content-around">
						{[...Array(formacion2.def)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-red-500"></div>
							</div>
						))}
					</div>
					<div className="grid grid-cols-1 content-center -mx-2 w-16 h-full ">
						<div className="h-32 border-8 border-white grid grid-cols-1">
							<div className="w-8 h-8 rounded-full  bg-gray-800 place-self-center"></div>
						</div>
					</div>
				</div>

				{/* Mazos de cartas */}
				<div className="flex gap-8 mt-6">
					{/* Cartas en Mano J1 (izquierda abajo, max 5)*/}
					<div className="flex gap-1 mt-0 w-1/3">
						{mazoJugador1()}
					</div>

					{/*Cartas para elegir (aparecen abajo en el medio, max 5)*/}
					<div className="flex gap-1 mt-0 w-1/3">
						{cartasAleatorias.map((carta, i) => (
							<Carta
								key={i + 5}
								id={i + 5}
								carta={carta}
								clickCarta={eleccionCartaAleatoria}
							/>
						))}
					</div>

					{/* Cartas en Mano J2 derecha abajo, max 5*/}
					<div className="flex gap-1 mt-0 w-1/3">
						{mazoJugador2()}
					</div>
				</div>
			</div>
		</div>
	);
}
