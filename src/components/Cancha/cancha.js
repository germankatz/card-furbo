import Carta from "../Carta/carta";
import CartaVacia from "../Carta/cartaVacia";

export default function Cancha({
	formacion1,
	formacion2,
	posPelota,
	cartas,
	cartasJugador1,
}) {
	const mazoJugador1 = () => {
		let cantCartasJuagdor1 = cartasJugador1.length;
		let mazo = [];

		cartasJugador1.map((carta, i) =>
			mazo.push(<Carta key={i} carta={carta} className="w-1/5" />)
		);

		for (let index = 0; index < 5 - cantCartasJuagdor1; index++) {
			mazo.push(
				<CartaVacia
					key={index + cantCartasJuagdor1}
					className="w-1/5"
				/>
			);
		}
		return mazo;
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

	const graficarPelota = (posCancha) => {
		if (posCancha == posPelota) {
			return (
				<div className="grid grid-cols-1 content-center">
					<svg
						className="h-8 w-8 border-white animate-bounce"
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
				{/* Tablero juego */}
				<div className="flex justify-between  mb-8 text-2xl font-bold px-16 uppercase">
					<div className="text-white flex gap-4">
						<div className="rounded-full w-5 h-5 bg-blue-500 mt-2"></div>
						<div>
							<div>Jugador 1</div>
							<div className="text-left">{formacion1.name} </div>
						</div>
					</div>
					<div className="text-white text-5xl">0 - 0</div>
					<div className="text-white flex gap-4">
						<div>
							<div>Jugador 2</div>
							<div className="text-right">{formacion2.name} </div>
						</div>
						<div className="rounded-full w-5 h-5 bg-red-500 mt-2"></div>
					</div>
				</div>

				{/* Tablero de juego */}
				<div className="h-[60%] mx-32 flex justify-between  border-8 border-white">
					<div className="grid grid-cols-1 content-center -mx-2 w-16 h-full">
						<div className="h-32 border-8 border-white grid grid-cols-1">
							<div className="w-8 h-8 rounded-full bg-gray-800 place-self-center"></div>
						</div>
					</div>
					<div className="grid grid-cols-1 content-center h-full gap-24">
						{[...Array(formacion1.def)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-blue-500"></div>
							</div>
						))}
					</div>
					{graficarPelota(1)}
					<div className="grid grid-cols-1 content-center h-full gap-24">
						{[...Array(formacion2.del)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-red-500"></div>
							</div>
						))}
					</div>
					<div className="h-full bg-green-300 w-3 "></div>
					<div className="grid grid-cols-1 content-center h-full gap-24">
						{[...Array(formacion1.med)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-blue-500"></div>
							</div>
						))}
					</div>
					{graficarPelota(2)}
					<div className="grid grid-cols-1 content-center h-full gap-24">
						{[...Array(formacion2.med)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-red-500"></div>
							</div>
						))}
					</div>

					<div className="h-full bg-green-300 w-3 "></div>
					<div className="grid grid-cols-1 content-center h-full gap-24">
						{[...Array(formacion1.del)].map((e, i) => (
							<div key={i}>
								<div className="w-8 h-8 rounded-full bg-blue-500"></div>
							</div>
						))}
					</div>
					{graficarPelota(3)}
					<div className="grid grid-cols-1 content-center h-full gap-24">
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

				<div className="flex gap-8 mt-6">
					{/* Cartas en Mano J1 (izquierda abajo, max 5)*/}
					<div className="flex gap-1 mt-0 w-1/3">
						{mazoJugador1()}
					</div>

					{/*Cartas para elegir (aparecen abajo en el medio, max 5)*/}
					<div className="flex gap-1 mt-0 w-1/3">
						{elegirNCartas(5).map((carta, i) => (
							<Carta key={i + 5} carta={carta} />
						))}
					</div>

					{/* Cartas en Mano J2 derecha abajo, max 5*/}
					<div className="flex gap-1 mt-0 w-1/3">
						{elegirNCartas(5).map((carta, i) => (
							<Carta key={i + 10} carta={carta} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
