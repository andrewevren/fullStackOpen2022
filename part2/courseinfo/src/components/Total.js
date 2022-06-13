const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)

    const sum = (a,b) => a+b

    return (
        <h3>total of {exercises.reduce(sum, 0)} exercises</h3>
    )
}

export default Total