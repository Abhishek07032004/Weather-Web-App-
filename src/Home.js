import React, { useState } from 'react';
import Header from './Header';
import mainimg from './imagess/plant.png';
import './home.css';

export default function Home() {
    let [city, setCity] = useState('');
    let [wdetails, setWdetails] = useState();
    let [error, setError] = useState(null);

    let handle = (event) => {
        event.preventDefault();

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9834315b82397a3716761c32e734b7bf&units=metric`)
            .then((res) => res.json())
            .then((finalres) => {
                if (finalres.cod === "404") {
                    setWdetails(undefined);
                    setError('City not found.');
                } else {
                    setWdetails(finalres);
                    setError(null);
                }
                setCity('');
            })
            .catch((error) => {
                console.error('Error fetching the weather data:', error);
                setError('Failed to fetch weather data. Please try again later.');
            });
    };

    return (
        <div>
            <Header />
            <div className="image-container">
                <img src={mainimg} alt="Main" className="main-image" />
                <div className="overlay-texts">Weather forecasts</div>
                <div className="overlay-text">Weather forecasts, nowcasts and history in a fast and elegant way</div>
            </div>
            <form onSubmit={handle}>
                <div className='search'>
                    <input 
                        type='text' 
                        required 
                        placeholder='Search City' 
                        value={city} 
                        onChange={(e) => setCity(e.target.value)} 
                    /> 
                    <button>Search</button>
                </div>
            </form>
            
            <div className='data'>
                {error ? (
                    <div className="error">{error}</div>
                ) : wdetails ? (
                    <>
                        <h3 className='fw-bold fs-4 ms-sm-5'>
                            {wdetails.name} <span className='text-warning'>{wdetails.sys.country}</span>
                        </h3>
                        <h3 className='fw-bold fs-1 ms-sm-5'>{wdetails.main.temp}°C</h3>
                        <img 
                            className='fw-bold fs-1 ms-sm-5' 
                            src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`} 
                            alt="Weather icon" 
                        />
                        <h4 className='ms-lg-5'>{wdetails.weather[0].description}</h4>
                    </>
                ) : (
                    "No city found"
                )}
            </div>
        </div>
    );
}
