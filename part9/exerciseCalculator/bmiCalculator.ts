const bmiCalculator = (height: number, weight: number): string => {
  const bmi: number = weight / (height/100) ** 2

  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    return 'Normal weight'
  } else if (bmi >= 25 && bmi <= 29.9 ) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

/*
interface Arguments {
  height: number,
  weight: number
}

const parseArguments = (args: Array<string>): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const {height, weight} = parseArguments(process.argv)
  console.log(bmiCalculator(height,weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
*/

export default bmiCalculator