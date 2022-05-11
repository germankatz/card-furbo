import "./formacion.css";

export default function Formacion({ formacion, clickCarta }) {
	const elegirCarta = () => {
		clickCarta(formacion);
	};

	return (
		<div className="formacion">
			<div
				className="bg-green-500 px-8 h-40 hover:bg-green-600 hover:-translate-y-4 transition-all cursor-pointer rounded"
				onClick={elegirCarta}
			>
				<div className="flex gap-4">
					<div className="flex text-green-800 font-bold">
						<div className="grid grid-cols-1 content-center h-40">
							{[...Array(formacion.def)].map((e, i) => (
								<div key={i}>
									o
								</div>
							))}
						</div>
						<div className="h-40 bg-green-300 w-1 mx-8"></div>
						<div className="grid grid-cols-1 content-center h-40">
							{[...Array(formacion.med)].map((e, i) => (
								<div key={i} className="">
									o
								</div>
							))}
						</div>
						<div className="h-40 bg-green-300 w-1 mx-8"></div>
						<div className="grid grid-cols-1 content-center h-40">
							{[...Array(formacion.del)].map((e, i) => (
								<div key={i} className="">
									o
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="mt-2">{formacion.name}</div>
		</div>
	);
}
