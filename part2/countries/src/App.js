import { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Body from './components/Body'

const App = () => {
  const [filter, setFilter] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setData(response.data)
      })
    },[])

  const handleChange = e => setFilter(e.target.value)

  const handleClick = e => setFilter(e.target.value)

  return (
    <div>
      <Search value={filter} onChange={handleChange}/>
      <Body filter={filter} data={data} onClick={handleClick}/>
    </div>
  )
}

export default App