import { useEffect } from "react";
import Formacion from "../Formacion/formacion";
import Confetti from 'react-confetti'
import sonidoOpening from '../../../src/audios/opening.mp3';



export default function ElegirFormacion({formaciones, elegirFormacion, nJugador = 0}) {

    const formacionClick = (formacion) => {
        //alert("Formacion elegida: " + formacion.name);
        elegirFormacion(formacion);
    }

    const playSonidoOpening = () => {
        const audio = new Audio(sonidoOpening);
        audio.play();
    }

    useEffect(() => {
        if (nJugador === 1) {
            playSonidoOpening();
        }
    }, []);



    return(
        <header className="App-header">
            <Confetti
            />
            <div className="text-8xl mb-16 font-bold">CARD FURBO</div>
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