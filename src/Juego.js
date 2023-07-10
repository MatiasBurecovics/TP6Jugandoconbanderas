import "./Juego.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Juego() {
  const [paises, setPaises] = useState([{}]);
  const [flag, setFlag] = useState({});
  const [answer, setAnswer] = useState("");
  const [puntos, setPuntos] = useState(0);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    fetchPaises();
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      handler();
    }

    return () => {
      clearInterval(intervalo);
    };
  }, [timer]);

  const fetchPaises = () => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((res) => {
        setPaises(res.data.data);
        setFlag(ConseguirBandera(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handler = () => {
    setAnswer("");
    setFlag(ConseguirBandera(paises));
    setTimer(15);
  };

  const ConseguirBandera = (paises) => {
    const posicion = Math.floor(Math.random() * paises.length);
    let newFlag = {
      nombre: paises[posicion].name,
      imagen: paises[posicion].flag,
    };
    return newFlag;
  };

  const VerifyAnswer = () => {
    if (answer.toLowerCase() === flag.nombre.toLowerCase()) {
    setPuntos(puntos + 10 + timer);

      handler();
    } else {
      setPuntos(puntos - 1);
      handler()
    }
  };

  return (
    <div className="App">
      <h3>¿Qué bandera es esta?</h3>
      <img alt="Bandera" src={flag.imagen} />
      <input
        type="text"
        id="bandera"
        name="bandera"
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

