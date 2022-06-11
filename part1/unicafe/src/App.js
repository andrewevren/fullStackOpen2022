import { useState } from 'react'

const Button = ({text,onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all=good+neutral+bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good-bad)/all}</p>
      <p>positive {100*good/all}%</p>
    </div>
  )
}

export default App;