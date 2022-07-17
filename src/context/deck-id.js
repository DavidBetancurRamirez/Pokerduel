import React, { useState, useMemo } from 'react';


const DeckContext = React.createContext();

export const DeckProvider = (props) => {
    const [deckId, cambiarDeckId] = useState("")

    const value = useMemo(() => {
        return ({
            deckId, 
            cambiarDeckId
        })
    }, [deckId])

    return <DeckContext.Provider value={value} {...props} />
}

export const useDeck = () => {
    const context = React.useContext(DeckContext);
    if (!context) throw new Error("No hay un proveedor para este contexto")

    return context;
}