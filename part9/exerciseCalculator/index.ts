import express from 'express'
import bmiCalculator from './bmiCalculator'

const app = express()

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

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})