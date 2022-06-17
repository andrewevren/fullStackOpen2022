import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import backEndService from './services/backend'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    backEndService.getAll()
        .then(initialPersons => 
          {setPersons(initialPersons)})
  }, [])

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

      backEndService.create(newObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          setNewName('')
          setNewNumber('')
      })
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