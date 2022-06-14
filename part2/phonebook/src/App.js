import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

const handleChange = e => setNewName(e.target.value)

const handleClick = e => {
  e.preventDefault()
  const newObject = {
    name: newName
  }

  setPersons(persons.concat(newObject))
  setNewName('')
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleChange} value={newName}/>
        </div>
        <div>
          <button onClick={handleClick} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <p key={person.name}>{person.name}</p>
        )}
      </div>
    </div>
  )
}

export default App