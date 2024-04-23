const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('express app for restaurants')
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.send('listing restaurants')
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  res.send(`read restaurant: ${id}`)
})