import CountryData from "./CountryData"
import ResultList from "./ResultList"

const Body = (props) => {
    const toShow = props.data.filter(country => 
        country.name.common.toLowerCase().includes(props.filter.toLowerCase()))

    if (toShow.length > 10) return <div>Too many matches, specify another filter</div>
    
    if (toShow.length > 1) return <ResultList toShow={toShow} />

    if (toShow.length === 1) return <CountryData country={toShow[0]} />
}

export default Body