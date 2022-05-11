import "./App.css";
import { useState } from "react";
import Carta from "./components/carta";
import Formacion from "./components/formacion";

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

	// Mezclar las formaciones
	const shuffleFormaciones = () => {
		const shuffledFormaciones = formaciones.sort(() => Math.random() - 0.5);
		return shuffledFormaciones;
	};

	const elegirFormacion = (formacion) => {
		console.log(formacion);
	};

	return (
		<div className="App">
			<header className="App-header">
				Elegir una de las formaciones
				<div className="flex gap-4 mt-8">
					{formaciones.map((formacion) => (
						<Formacion
							key={formacion.name}
							formacion={formacion}
							onClick={elegirFormacion}
						/>
					))}
				</div>
			</header>
			<header className="App-header">
				Elegir una de las cartas
				<div className="flex gap-4 mt-8">
					{cartas.map((carta, i) => (
						<Carta key={i} carta={carta} />
					))}
				</div>
			</header>
		</div>
	);
}

export default App;
