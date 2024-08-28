const express = require('express')
const cors = require('cors')
const logger = require ('morgan')
const restaurantsRouter = require('./routes/restaurants.js')
const questionsRouter = require('./routes/questions.js')

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

//app.use('/restaurants', restaurantsRouter)
app.use('/questions', questionsRouter)
app.use('/recommend', restaurantsRouter)

app.listen(PORT, function() {
    console.log(`Server running on port: ${PORT}`)
})
