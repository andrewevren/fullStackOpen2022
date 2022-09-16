import express from 'express'
import bmiCalculator from './bmiCalculator'
import calculateExercises from './exerciseCalculator'

const app = express()

app.use(express.json())

app.get('/hello', (_req,res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req,res) => {
  const bmi = bmiCalculator(Number(req.query.height), Number(req.query.weight))
  if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
    res.json({
      weight:req.query.weight,
      height:req.query.height,
      bmi:bmi
    })
  } else {
    res.status(400).json({error: "malformatted parameters"})
  }
})

app.post('/exercises', (req,res) => {
  if (!(req.body.target && req.body.daily_exercises)) {
    res.status(400).json({error: "parameters missing"})
  } else if (req.body.daily_exercises.every((e: number) => !isNaN(Number(e))) && !isNaN(Number(req.body.target)))
    try {
      res.json(calculateExercises(req.body.target,req.body.daily_exercises))
    } catch (error: unknown) {
      res.status(400).json({error: "malformatted parameters"})
  } else {
    res.status(400).json({error: "malformatted parameters"})
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})