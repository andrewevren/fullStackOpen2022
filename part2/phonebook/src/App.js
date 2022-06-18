import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import backEndService from './services/backend'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    backEndService.getAll()
        .then(initialPersons => 
          {setPersons(initialPersons)})
  }, [])

  const handleNameChange = e => setNewName(e.target.value)

  const handleNumberChange = e => setNewNumber(e.target.value)

  const handleFilterChange = e => setNewFilter(e.target.value)

  const displayMessage = newMessage => {
    setMessage(newMessage)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
  }

  const handleClick = e => {
    e.preventDefault()

    const oldPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (oldPerson) {
      if (window.confirm(`${oldPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const changedObject = {...oldPerson, number: newNumber}

        backEndService.replace(changedObject)
          .then(returnedObject => {
            setPersons(persons.map(p => p.id !== changedObject.id 
              ? p : returnedObject))
            displayMessage(`Contact number changed for ${changedObject.name}`)
            setNewName('')
            setNewNumber('')
          })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      const newObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      backEndService.create(newObject)
        .then(returnedObject => {
          setPersons(persons.concat(returnedObject))
          displayMessage(`Added ${newObject.name}`)
          setNewName('')
          setNewNumber('')
      })
    }
  }

  const deletePerson = (id,name) => {
    if (window.confirm(`Delete ${name}?`)) {
      backEndService.remove(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
      displayMessage(`Deleted ${name}`)
    }
  }

  const personsToShow = newFilter===''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter onChange={handleFilterChange} value={newFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        handleNameChange={handleNameChange} newName={newName}
        handleNumberChange={handleNumberChange} newNumber={newNumber}
        handleClick={handleClick} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App