import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/anecdoteReducer'

import Filter from './components/Filter'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes())
  },[dispatch])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App