import './CardWeather.css';
import { FaCloud, FaCloudShowersHeavy, FaRegSnowflake, FaWind, FaSun, FaTemperatureHigh, FaExchangeAlt, FaStar, FaMoon } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { MdWaterDrop } from "react-icons/md";
import { BsFillCloudsFill } from "react-icons/bs";
import { useState, useEffect } from 'react';

export function IconWeather({ state }) {
    if (state === 'Clouds') return <FaCloud className='icon' color='gray' />;
    if (state === 'Rain') return <FaCloudShowersHeavy className='icon' color='skyblue' />;
    if (state === 'Snow') return <FaRegSnowflake className='icon' color='white' />;
    if (state === 'Wind') return <FaWind className='icon' />;
    if (state === 'Mist') return <BsFillCloudsFill className='icon' color='gray' />;
    if (state === 'Fog') return <BsFillCloudsFill className='icon' color='gray' />;
    if (state === 'Haze') return <BsFillCloudsFill className='icon' color='gray' />;
    return <FaSun className='icon' color='orange' />;
}

function TranslateWeatherState(estado) {
    const translations = {
        Clear: 'Despejado',
        Clouds: 'Nublado',
        Rain: 'Lluvia',
        Snow: 'Nevando',
        Wind: 'Fuerte Viento',
        Mist: 'Neblina',
        Fog: 'Neblina',
        Haze: 'Bruma',
        Drizzle: 'Llovizna',
        Thunderstorm: 'Tormenta eléctrica',
        Smoke: 'Humo',
        Dust: 'Polvo',
        Sand: 'Tormenta de arena',
        Ash: 'Ceniza volcánica',
        Squall: 'Chubasco',
        Tornado: 'Tornado'
    };
    return translations[estado] || estado;
}


export function CardWeather({ data, dataTime }) {
    const [temp, setTemp] = useState(data.main.temp);
    const [grados, setGrados] = useState('°C');
    const [sensTermica, setSensTermica] = useState(data.main.feels_like);

    useEffect(() => {
        setTemp(data.main.temp);
        setSensTermica(data.main.feels_like);
        setGrados('°C');
    }, [data]);

    const CambiarGrados = () => {
        if (grados === '°C') {
            setTemp((temp * 9/5) + 32);
            setGrados('°F');
        } else {
            setTemp((temp - 32) * 5/9);
            setGrados('°C');
        }
    };

    const CambiarFeelsLike = () => {
        if (grados === '°C') {
            setSensTermica((sensTermica * 9/5) + 32);
        } else {
            setSensTermica((sensTermica - 32) * 5/9);
        }
    };

    return (
        <main className='cardContainer'>
            <section className='dataImportante'>
                <h1 className='nombreCiudad'>{data.name}</h1>
                <h2><IconWeather state={data.weather[0].main} /> {TranslateWeatherState(data.weather[0].main)}</h2>
                <div className='temperaturaContainer'>
                    <p className='temperatura'>{temp.toFixed(1)} {grados}</p>
                    <div className='cambiarGrados' type='button' onClick={() => { CambiarGrados(); CambiarFeelsLike(); }}>
                        <FaExchangeAlt className='change' size={18} />
                    </div>
                </div>
            </section>
            <section className='dataNoImportante'>                
                <h3 className='horario'>{dataTime ? dataTime.formatted.split(' ')[1].split(':').slice(0,2).join(':') + ' hs' : "Cargando hora..."}</h3>
                <p>
                {dataTime ?
                    (dataTime.formatted.split(' ')[1].split(':').slice(0, 1)[0] >= 20 || 
                    dataTime.formatted.split(' ')[1].split(':').slice(0, 1)[0] <= 5) 
                    ? <><FaStar className='estrellaNoche1'/> <FaStar className='estrellaNoche2'/> <FaStar className='estrellaNoche3'/> <FaMoon className='lunita'/> </>
                    : <><FaSun className='solDia'/><FaCloud className='nubeDia'/></>
                    : ''
                }
                </p>
                <p><TbWorld color='aqua' />  País: {dataTime ? dataTime.countryName : " "}</p>
                <p><MdWaterDrop color='skyblue' />  Humedad: {data.main.humidity}%</p>
                <p><FaTemperatureHigh color='crimson' />  Sensación térmica: {sensTermica.toFixed(1)} {grados}</p>
                <p><FaWind color='white' />  Viento: {data.wind.speed} m/s</p>
            </section>
        </main>
    );
}
