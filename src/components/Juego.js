import React, { useEffect, useState } from "react";
import { useDeck } from "../context/deck-id";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Jugadores, ContenedorCartas } from "../styles/juego"
import {ReactComponent as IconoPlay} from '../img/play.svg'
import {ReactComponent as IconoWin} from '../img/win.svg'
import {ReactComponent as IconoFail} from '../img/fail.svg'
import {ReactComponent as IconoReiniciar} from '../img/reiniciar.svg'
import getCartas from "../functions/getCartas";
import getDeck from "../functions/getDeck";
import Cartas from "../elements/Cartas";


const Juego = ({jugador1, jugador2}) => {
    const [ganador, cambiarGanador] = useState({
        nombre: "",
        cartasGanadoras: [],
        empate: [],
        hayGanador: false
    });
    const [cartasJugador1, cambiarCartasJugador1] = useState([]);
    const [cartasJugador2, cambiarCartasJugador2] = useState([]);   
    const [jugando, cambiarJugando] = useState(true);

    const { deckId, cambiarDeckId } = useDeck();
    const navigate = useNavigate();


    useEffect(() => {
        if (!deckId) {
            navigate("/")
        } else {
            cambiarJugando(true)
            recibirCartas(getCartas(deckId))
        }
    }, [deckId, navigate])

    useEffect(() => {
        const repetidasJ1 = buscarRepetida(cartasJugador1);
        const repetidasJ2 = buscarRepetida(cartasJugador2);

        if (repetidasJ1.length > 0 && repetidasJ2.length > 0) {
            // Hacer desempate por pintas
            const puntajeJ1 = puntaje(repetidasJ1);
            const puntajeJ2 = puntaje(repetidasJ2);
            
            if (puntajeJ1 > puntajeJ2) gameOver(jugador1, repetidasJ1)
            if (puntajeJ1 < puntajeJ2) gameOver(jugador2, repetidasJ2)
            if (puntajeJ1 === puntajeJ2) gameOver("empate", repetidasJ1, repetidasJ2)

        } else if (repetidasJ1.length > 0) {
            gameOver(jugador1, repetidasJ1)
        } else if (repetidasJ2.length > 0) {
            gameOver(jugador2, repetidasJ2)
        }

    }, [cartasJugador1, cartasJugador2, jugador1, jugador2])

    const recibirCartas = (cartas) => {
        cartas.then((resp) => {

            cambiarCartasJugador1([...cartasJugador1, resp[0]])
            cambiarCartasJugador2([...cartasJugador2, resp[1]])

        }).catch((error) => console.log(error))
    }

    const buscarRepetida = (cartas) => {
        const busqueda = cartas.reduce((acc, carta) => {
            acc[carta.code.charAt()] = ++acc[carta.code.charAt()] || 0;
            return acc;
        }, {});
        
        const duplicados = cartas.filter( (carta) => {
            return busqueda[carta.code.charAt()];
        });
          
        return duplicados;
    }

    const puntaje = (cartas) => {            
        let puntaje = 0;

        cartas.forEach(carta => {
            if (carta.suit === "HEARTS") puntaje += 4;
            if (carta.suit === "SPADES") puntaje += 3;
            if (carta.suit === "DIAMONDS") puntaje += 2;
            if (carta.suit === "CLUBS") puntaje += 1;
        });

        return puntaje;
    }

    const gameOver = (winner, cartas, cartas2) => {        
        cambiarJugando(false);

        if (cartas2) {
            cambiarGanador({
                nombre: "empate",
                cartasGanadoras: [],
                empate: [cartas, cartas2],
                hayGanador: true
            });
        } else {
            cambiarGanador({
                nombre: winner,
                cartasGanadoras: cartas,
                empate: [],
                hayGanador: true
            });
        }
    }

    const reiniciar = async () => {
        try {
            const deck_id = await getDeck();
            cambiarDeckId(deck_id);

            cambiarJugando(true);
            cambiarGanador({
                nombre: "",
                cartasGanadoras: [],
                hayGanador: false,
                hayEmpate: false
            });
            cambiarCartasJugador1([]);
            cambiarCartasJugador2([]);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <Helmet>
                <title>Pokerduel</title>
            </Helmet>

            <Jugadores>
                <div>
                    <p>Jugador 1: {jugador1}</p>
                    {ganador.hayGanador && ( ganador.nombre === jugador1 || ganador.nombre === "empate") &&
                        <IconoWin className="win" />
                    }
                    {ganador.hayGanador && ganador.nombre === jugador2 &&
                        <IconoFail className="fail" />
                    }
                </div>
                {jugando ? 
                    <span>
                        <IconoPlay onClick={() => recibirCartas(getCartas(deckId))} />
                        <p>Obtener carta</p>
                    </span>
                :
                    <span>
                        <IconoReiniciar onClick={() => reiniciar()} />
                        <p>Reiniciar juego</p>
                    </span>
                }
                <div>
                    <p>Jugador 2: {jugador2}</p>
                    {ganador.hayGanador && ( ganador.nombre === jugador2 || ganador.nombre === "empate") &&
                        <IconoWin className="win" />
                    }
                    {ganador.hayGanador && ganador.nombre === jugador1 &&
                        <IconoFail className="fail" />
                    }
                </div>
            </Jugadores>

            {ganador.hayGanador &&
                <ContenedorCartas style={{ background: '#009929' }}>
                    <div className="izquierda ganador">
                        {(ganador.nombre === jugador1 || ganador.nombre === "empate") && 
                            <>
                                <p>{ganador.nombre === jugador1 ? "Cartas ganador" : "Hubo un empate"}</p>
                                <Cartas cartas={ganador.cartasGanadoras.length > 0 ? ganador.cartasGanadoras : ganador.empate[0]} />
                            </>
                        }
                    </div>
                    <div className="ganador">
                        {(ganador.nombre === jugador2 || ganador.nombre === "empate") && 
                            <>
                                <p>{ganador.nombre === jugador2 ? "Cartas ganador" : "Hubo un empate"}</p>
                                <Cartas cartas={ganador.cartasGanadoras.length > 0 ? ganador.cartasGanadoras : ganador.empate[1]} />
                            </>
                        }
                    </div>
                </ContenedorCartas>
            }

            <ContenedorCartas>
                <div className="izquierda">
                    <p>Cartas Obtenidas</p>
                    {cartasJugador1.length > 0 && 
                        <Cartas cartas={cartasJugador1} />
                    }
                </div>
                <div>
                    <p>Cartas Obtenidas</p>
                    {cartasJugador2.length > 0 && 
                        <Cartas cartas={cartasJugador2} />
                    }
                </div>
            </ContenedorCartas>
        </>
    );
}
 
export default Juego;