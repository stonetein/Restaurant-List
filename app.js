const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results


app.use(express.static('public'))

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  const keyword = req.query.search?.trim();
  const matchedRes = keyword ? restaurants.filter((rt) =>
    (typeof rt.name === 'string' && rt.name.toLowerCase().includes(keyword.toLowerCase())) ||
    (typeof rt.category === 'string' && rt.category.toLowerCase().includes(keyword.toLowerCase()))
  ) : restaurants;
  res.render('index', { restaurants: matchedRes, keyword });
})



app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((rt) => rt.id.toString() === id)
  res.render('detail', {restaurant})
})

