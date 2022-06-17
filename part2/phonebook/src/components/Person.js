const Person = ({person, onClick}) => {
    return (
        <div>
            <p>
                {person.name} {person.number} 
                <button onClick={() => onClick(person.id,person.name)}>delete</button>
            </p>
        </div>
    )
}

export default Person