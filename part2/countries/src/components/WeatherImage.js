const WeatherImage = ({weather}) => {
    if (weather.icon != null) { return(
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
        alt={weather.description}/>
    )}
}

export default WeatherImage