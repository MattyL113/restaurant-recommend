const express = require('express')
const router = express.Router()
const questionsCtrl = require('../controllers/questions')

router.get('/', questionsCtrl.index)

module.exports = router