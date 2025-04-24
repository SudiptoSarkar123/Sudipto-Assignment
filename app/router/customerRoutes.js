const express = require('express')
const router = express.Router()


const customerController = require('../controller/customerRoute')


router.get('/',customerController.home)

module.exports = router ;