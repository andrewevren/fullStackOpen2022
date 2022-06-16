const ResultList = ({toShow}) => {return (
    <div>
        {toShow.map(country => { 
            return (
                <p key={country.name.official}>{country.name.common}</p>
            )
        })}
    </div>
)}

export default ResultList