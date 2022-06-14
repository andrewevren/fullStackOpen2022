const PersonForm = props => {
    return (
        <form>
        <div>
          name: <input onChange={props.handleNameChange} value={props.newName}/>
        </div>
        <div>
          number: <input onChange={props.handleNumberChange} value={props.newNumber}/>
        </div>
        <div>
          <button onClick={props.handleClick} type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm