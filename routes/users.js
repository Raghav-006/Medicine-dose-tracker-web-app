var express = require('express');
var router = express.Router();

const { getAllTasks,
  createTask,  
  getTask,
  updateTask,
  deleteTask,} = require('../controllers/users');



/* GET users listing. */
router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

router.delete('/users/me', async function(req, res, next){
  try{
    await req.user.remove();
    res.json(req.user);
  }catch(err){
    res.status(400).json({
      error: "Something went wrong "+ err
    })
  }
});

module.exports = router;