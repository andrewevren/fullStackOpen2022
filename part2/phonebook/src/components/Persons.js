import Person from './Person'

const Persons = ({personsToShow, deletePerson}) => {
    return (
        <div>
        {personsToShow.map(person =>
          <Person key={person.id} person={person} onClick={deletePerson}/>
        )}
      </div>
    )
}

export default Persons