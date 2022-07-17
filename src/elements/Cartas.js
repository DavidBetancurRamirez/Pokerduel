import React from 'react';
import { Carta } from "../styles/juego"


const Cartas = ({ cartas }) => {
    if (!cartas) console.log("No llegaron cartas");

    return (
        <section>
            {cartas.map(carta => (
                <Carta key={carta.code}>
                    <img src={carta.image} alt="Carta" />
                </Carta>
            ))}
        </section>
    );
}
 
export default Cartas;