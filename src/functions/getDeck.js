import axios from "axios";

const getDeck = async () => {
    try {
        const { data } = await axios.get('http://deckofcardsapi.com/api/deck/new/');
        const deck_id = data.deck_id;

        if (!deck_id) throw new Error("Error recibiendo el deck")

        return deck_id;
    } catch (error) {
        console.log(error)
    }
}
 
export default getDeck;