import axios from "axios"


const barajar = async (deck) => {
    try {  
        const resp = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/shuffle/?remaining=true`);
        if (!resp.data.success) throw new Error("Hubo un problema al barajar")
    } catch (error) {
        console.error(error);
        throw new Error("Error barajando las cartas")
    }
} 

export default barajar;