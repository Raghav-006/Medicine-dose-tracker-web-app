const express = require('express');
const {AllMedicine,addMedicine,editMedicine,deleteMedicine} = require('../controllers/usersController');
const {login, register,users,logout} = require('../controllers/indexController');
const {getProfile,addProfile} = require('../controllers/usersProfile.Controller');
const router = express.Router();
router.route('/register')
.post(register);

router.route('/login')
.post(login);

router.route('/user')
.get(users);

router.route('/addmedicine')
.get(AllMedicine)
.post(addMedicine)

router.route('/reports')
.get(AllMedicine)

router.route('/reports/:id/edit')
.get(editMedicine)

router.route('/deletemedicine/:id')
.delete(deleteMedicine)

router.route('/profile')
.get(getProfile)
.post(addProfile)

router.route('/logout').post(logout);

module.exports = router