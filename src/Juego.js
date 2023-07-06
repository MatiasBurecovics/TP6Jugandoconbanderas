import './Juego.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Juego() {
    const [paises, setPaises] = useState([{}]);
    const [flag, setFlag] = useState({});
    const [answer, setAnswer] = useState("");
    const [puntos, setPuntos] = useState(0);
    const [timer, setTimer] = useState(15);

    useEffect(() => {
        axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
            .then((res) => {
                setPaises(res.data.data);
                setFlag(ConseguirBandera(res.data.data));
            })
            .catch((error) => {
                console.log(error);
            });
            const RestarTimer = setInterval(() => {
                setTimer(timer => {
                    if (timer === 0) {
                        
                        setFlag(ConseguirBandera(paises));
                        console.log('¡Tiempo terminado!');
                        return timer = 15;
                    }
                    return timer - 1;
                    
                });
            }, 1000);
            return () => clearInterval(RestarTimer);
    }, []);




    


    const ConseguirBandera = (paises) => {
        const posicion = Math.floor(Math.random() * paises.length);
        let newFlag = {
            nombre: paises[posicion].name,
            imagen: paises[posicion].flag,
        };
        return newFlag;
    };

    const VerifyAnswer = () => {
        console.log(typeof (answer));
        console.log(answer);
        if (answer.toLowerCase() === flag.nombre.toLowerCase()) {
            setPuntos(puntos + 10 + timer);
            setAnswer("");
            setFlag(ConseguirBandera(paises));
        } else {
            setPuntos(puntos - 1);
        }
    };

    return (
        <div className='App'>

            <h3>¿Qué bandera es esta?</h3>
            <img alt='Bandera' src={flag.imagen} />
            <input
                type='text'
                id='bandera'
                name='bandera'
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={VerifyAnswer}>Enviar</button>
            <p>Puntos: {puntos}</p>
            <p>Tiempo: {timer}</p>
        </div>
    );
}

export default Juego;
