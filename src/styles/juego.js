import styled from "styled-components"

const Jugadores = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #000;

    div { 
        width: 45%; 
        display: flex;
        position: relative;

        svg {
            position: absolute;
            top: 8px;
            right: 80px;
            height: 50px;
            width: 50px;
        }

        .win { fill: #009929 !important; }
        .fail { fill: #f30000 !important; }
    }

    p {
        font-size: 25px;
        font-weight: 900;
        margin: 15px;
        text-align: center;
        width: 100%;
    }

    span {
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
            font-weight: 300;
            font-size: 16px;
            width: auto;
            margin: 0;
        }
        svg {
            height: 40px;
            width: 40px;
            margin: auto;
            cursor: pointer;
        }
    }
`
const ContenedorCartas = styled.div`
    display: flex;
    border-bottom: 2px solid #fff;
    background-color: green;

    .izquierda { border-right: 2px solid #fff; }

    div {
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 20px;

        p {
            font-weight: 600;
            font-size: 18px;
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            color: #fff;
        }

        section {
            display: flex;
            justify-content: center;
            flex-wrap: wrap
        }
    }
`
const Carta = styled.article`
    width: 145px;
    height: 225px;
    margin: 15px;

    img {
        vertical-align: top;
        width: 100%;
        height: 100%;
    }
`

export { Jugadores, ContenedorCartas, Carta }