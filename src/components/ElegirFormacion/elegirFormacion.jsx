import Formacion from "../Formacion/formacion";

export default function ElegirFormacion({formaciones, elegirFormacion, nJugador}) {

    const formacionClick = (formacion) => {
        //alert("Formacion elegida: " + formacion.name);
        elegirFormacion(formacion);
    }

    return(
        <header className="App-header">
            Jugador {nJugador} elija formación
            <div className="flex gap-4 mt-8">
                {
                formaciones.map((formacion) => (
                    <Formacion
                        key={formacion.name}
                        formacion={formacion}
                        clickCarta={formacionClick}
                    />
                ))
                }
            </div>
        </header>
    )
}