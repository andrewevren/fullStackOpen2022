const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)

    const sum = (a,b) => a+b

    const sumArr = arr => arr.reduce(sum, 0)

    return (
        <h3>total of {sumArr(exercises)} exercises</h3>
    )
}

export default Total