import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

const handleNameChange = e => setNewName(e.target.value)

const handleNumberChange = e => setNewNumber(e.target.value)

const handleFilterChange = e => setNewFilter(e.target.value)

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
      number: newNumber,
      id: persons.length
    }

    setPersons(persons.concat(newObject))
    setNewName('')
    setNewNumber('')
  }
}

const personsToShow = newFilter===''
  ? persons
  : persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterChange} value={newFilter}/>
      </div>
      <h2>add a new</h2>
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
        {personsToShow.map(person =>
          <p key={person.id}>{person.name} {person.number}</p>
        )}
      </div>
    </div>
  )
}

export default App