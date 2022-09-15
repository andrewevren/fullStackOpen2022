interface Arguments {
  target: number,
  hours: Array<number>
}

const parseArguments = (args: Array<string>): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.slice(2).every(e => !isNaN(Number(e)))) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map(e => Number(e))
    }
  } else {
    throw new Error('Provided values were not arguments')
  }
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (target: number, hours: Array<number>): Result => {
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

try {
  const {target, hours} = parseArguments(process.argv)
  console.log(calculateExercises(target,hours))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export {}