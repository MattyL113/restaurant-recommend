const Question = require('../models/questions')

module.exports = {
    index
}

function index(req, res) {
    const questions = Question.getAll()
    res.json(questions)
}