interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength: number = hours.length
  const totalHours: number = hours.reduce((a,b)=>a+b,0)
  const average: number = totalHours/periodLength
  let rating: number
  let ratingDescription: string
  if (average/target < .5) {
    rating = 1
    ratingDescription = 'keep trying and you will get there'
  } else if (average/target < 1) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'wow you met your goal, keep going'
  }

  return ({
    periodLength: periodLength,
    trainingDays: hours.filter(hour => hour != 0).length,
    success: average >= target ? true : false,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  })
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))