const ResultList = props => {return (
    <div>
        {props.toShow.map(country => { 
            return (
                <p key={country.name.official}>
                    {country.name.common}
                    <button onClick={props.onClick} value={country.name.common}>show</button>
                </p>
            )
        })}
    </div>
)}

export default ResultList