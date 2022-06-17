import axios from "axios"
import { useState, useEffect } from "react"
import WeatherImage from "./WeatherImage"

const CountryData = ({country}) => {
    const [weatherData, setWeatherData] = useState(
        {weather:[{description:null, icon:null}],main:{temp:null},wind:{speed:null}}
      )

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
            .then(response => {setWeatherData(response.data)})
    },[])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="250"/>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {weatherData.main.temp} Celsius</p>
            <WeatherImage weather={weatherData.weather[0]}/>
            <p>wind {weatherData.wind.speed} m/s</p>
        </div>
)}

export default CountryData