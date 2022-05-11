import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Carta({ carta, onClick }) {
	return (
		<div className="carta" onClick={onClick}>
			<div className="rounded bg-white text-gray-800 hover:-translate-y-4 transition-all cursor-pointer w-56">
				<div className="text-lg align-center font-semibold py-4">
					{carta.titulo}
				</div>
				<div className="bg-sky-300 h-32">
					<FontAwesomeIcon icon="fa-solid fa-futbol" />
				</div>
				<FontAwesomeIcon icon="fa-solid fa-arrows-turn-right" />
				<div className="p-4 text-sm">{carta.descr}</div>
			</div>
		</div>
	);
}
