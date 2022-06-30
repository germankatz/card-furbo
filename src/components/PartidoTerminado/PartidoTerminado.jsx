import { useEffect } from "react";
import Formacion from "../Formacion/formacion";
import Confetti from 'react-confetti'
import sonidoOpening from '../../../src/audios/opening.mp3';



export default function PartidoTerminado({puntajeJugador1, puntajeJugador2}) {

    const refreshPage = () =>{
        window.location.reload();
    } 

    const reproducirSonido = () => {
        const audio = new Audio(sonidoOpening);
        audio.play();
    }

    return(
        <header className="App-header">
            {reproducirSonido()}
            <Confetti
            />
            <div className="text-8xl mb-32 font-bold">CARD FURBO</div>
            {puntajeJugador1 == puntajeJugador2 ? <div className="text-4xl font-bold">EMPATE</div> : 
            
            puntajeJugador1 > puntajeJugador2 ? <div className="text-4xl  font-bold">GANÓ JUGADOR 1</div> :
            <div className="text-4xl font-bold">GANÓ JUGADOR 2</div>}

            <div className="text-6xl">{puntajeJugador1} - {puntajeJugador2}</div>

            <div onClick={refreshPage} className="mt-16 uppercase font-bold cursor-pointer px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 transition-all text-3xl">Nuevo juego</div>
            
        </header>
    )
}