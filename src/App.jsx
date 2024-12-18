import './App.css'
import { useState, useEffect } from 'react';
import { FormWeather } from './components/FormWeather';
import { CardWeather } from './components/CardWeather';
import { FaGithub } from "react-icons/fa";

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [dataTime, setDataTime] = useState(null);

  const newCity = (value) => {
    setCity(value.toLowerCase());
  };

  const API_KEY = "1caa1420ec8baa7a3150d8a873010a06";

  const ApiCall = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const json = await response.json();

      if (response.ok) {
        setData(json);
        console.log("OK");
      } else {
        console.error("Error en la API de OpenWeather:", json.message);
      }
    } catch (error) {
      console.error("Error en la solicitud a OpenWeather:", error);
    }
  };

  const ApiCallTime = async () => {
    if (data && data.coord) {
      const API_KEY_TIME = "G3FHN7R7IX8S";
      const API_URL_TIME = `https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY_TIME}&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`;

      try {
        const responseTime = await fetch(API_URL_TIME);
        const jsonTime = await responseTime.json();

        if (responseTime.ok) {
          setDataTime(jsonTime);
          console.log("OK");
        } else {
          console.error("Error en la API de TimezoneDB:", jsonTime.message);
        }
      } catch (error) {
        console.error("Error en la solicitud a TimezoneDB:", error);
      }
    } else {
      console.warn("No hay datos de coordenadas disponibles.");
    }
  };

  useEffect(() => {
    if (data) {
      ApiCallTime();
    }
  }, [data]);

  return (
    <>
      <p className='titulo'>Weather App by Facu</p>
      <div className="container">
      <FormWeather city={city} newCity={newCity} ApiCall={ApiCall} />
        {data && <CardWeather city={city} data={data} dataTime={dataTime} />}
      </div>
      <a href='https://github.com/FacuBoniDev' target='blank'><FaGithub className='github'/></a>
    </>
  );
}

export default App;

