import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state,action) {
      state.push(action.payload)
    },
    replaceAnecdote(state,action) {
      const changedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
    },
    setAnecdotes(state,action) {
      return action.payload
    }
  }
})

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const postedAnecdote = await anecdoteService.updateAnecdote(changedAnecdote)
    dispatch(replaceAnecdote(postedAnecdote))
  }
}

export const { appendAnecdote, replaceAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer