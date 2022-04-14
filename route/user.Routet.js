const express = require('express');
const router = express.Router()
const {AllMedicine} = require('../controllers/users.Controller')

router.route('/').get(AllMedicine)



module.exports = router