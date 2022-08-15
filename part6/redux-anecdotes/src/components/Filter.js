import { useSelector, useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.filter)

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={state}/>
    </div>
  )
}

export default Filter