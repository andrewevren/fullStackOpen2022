import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const anecdotesByVotes = anecdotes.slice().sort((a,b) => b.votes - a.votes)

  const vote = (id, content) => {
    dispatch(addVote(id))
    dispatch(setNotification(`You voted for '${content}'`))
    setTimeout(()=>dispatch(removeNotification()),5000)
  }

  return(
    <div>
      {anecdotesByVotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList