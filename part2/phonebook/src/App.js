import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

const handleNameChange = e => setNewName(e.target.value)

const handleNumberChange = e => setNewNumber(e.target.value)

const handleClick = e => {
  e.preventDefault()

  const checkDuplicates = () => {
    for (const person of persons) {
      if (person.name === newName) return true
    }
    return false
  }

  if (checkDuplicates()) {
    alert(`${newName} is already added to phonebook`)
  } else {
    const newObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newObject))
    setNewName('')
    setNewNumber('')
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button onClick={handleClick} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )}
      </div>
    </div>
  )
}

export default App