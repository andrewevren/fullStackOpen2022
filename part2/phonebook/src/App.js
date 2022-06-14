import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
      id: persons.length + 1
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
      <Filter onChange={handleFilterChange} value={newFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        handleNameChange={handleNameChange} newName={newName}
        handleNumberChange={handleNumberChange} newNumber={newNumber}
        handleClick={handleClick} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App