import React, { useState } from "react";
import "../styles/registro.css"
import { useNavigate } from 'react-router-dom';
import { useDeck } from "../context/deck-id";
import { Helmet } from 'react-helmet-async';
import getDeck from "../functions/getDeck";
import {ReactComponent as Logo} from '../img/logo.svg'

const Registro = ({jugador1, cambiarJugador1, jugador2, cambiarJugador2}) => {
    const [clicked1, cambiarClicked1] = useState(false)
    const [clicked2, cambiarClicked2] = useState(false)

    const navigate = useNavigate();
    const { cambiarDeckId } = useDeck();

    const click = (e) => {
        if (jugador1 === "" && e.target.name === "jugador-1") {
            cambiarClicked1(false)
        } else if (jugador2 === "" && e.target.name === "jugador-2") {
            cambiarClicked2(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (jugador1 === "" || jugador2 === "") {
            console.log("Se deben ingresar los nombres de los jugadores");
        } else {
            try {
                const deck_id = await getDeck();
                cambiarDeckId(deck_id);
                navigate("/juego");                
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>Registro</title>
                <link rel="icon" href="../img/logo.svg" />
            </Helmet>

            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={handleSubmit}>
                            <span className="login100-form-title p-b-26">
                                Pokerduel
                            </span>
                            <span className="login100-form-title p-b-48">
                                <Logo width="150px" height="150px" />
                            </span>

                            <div className="wrap-input100 validate-input">
                                <input  className={`input100 ${clicked1 && `has-val`}`} 
                                        type="text" name="jugador-1" 
                                        onFocus={(e) => cambiarClicked1(true)} onBlur={click} 
                                        value={jugador1} onChange={(e) => cambiarJugador1(e.target.value)} 
                                />
                                <span className="focus-input100" data-placeholder="Jugador #1"></span>
                            </div>
                            
                            <div className="wrap-input100 validate-input">
                                <input  className={`input100 ${clicked2 && `has-val`}`} 
                                        type="text" name="jugador-2" 
                                        onFocus={(e) => cambiarClicked2(true)} onBlur={click} 
                                        value={jugador2} onChange={(e) => cambiarJugador2(e.target.value)} 
                                />
                                <span className="focus-input100" data-placeholder="Jugador #2"></span>
                            </div>

                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                    <button type="submit" className="login100-form-btn">
                                        Ingresar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Registro;