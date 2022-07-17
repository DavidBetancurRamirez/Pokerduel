import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Juego from "./components/Juego";
import Registro from "./components/Registro"


const App = () => {  
  const [jugador1, cambiarJugador1] = useState("")
  const [jugador2, cambiarJugador2] = useState("")

  return (
    <Routes>
      <Route path="/" element={<Registro jugador1={jugador1} cambiarJugador1={cambiarJugador1} jugador2={jugador2} cambiarJugador2={cambiarJugador2} />} />
      <Route path="/juego" element={<Juego jugador1={jugador1} cambiarJugador1={cambiarJugador1} jugador2={jugador2} cambiarJugador2={cambiarJugador2} />} />
    </Routes>
  );
}
 
export default App;
