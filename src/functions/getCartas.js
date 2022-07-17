import axios from "axios"


const getCartas = async (deck) => {
    try {  
        const resp = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/shuffle/?remaining=true`);
        if (!resp.data.success) throw new Error("Hubo un problema al barajar")

        const { data } = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/?count=2`);
        if (!data) throw new Error("Hubo un problema al recibir las cartas")

        const cartas = data.cards;
        
        return cartas;
    } catch (error) {
        console.error(error);
        throw new Error("Error recibiendo cartas")
    }
} 

export default getCartas;