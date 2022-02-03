var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const t = req.body
  /*res.render('login', {
    title: 'Express',
    layout: 'home',
    head: 'Login'
  });*/
  res.json({"local":"Mavhungu","t":req,body})
});
router.get('/register', function(req, res, next) {
  /*res.render('register', {
    title: 'Express',
    layout: 'home',
    head: 'Login'
  });*/
  res.json({})
});
router.post('/',async (req,res,next)=>{
  console.log(req.body)
  res.json({
    "t": req.body
  })

})


module.exports = router;
