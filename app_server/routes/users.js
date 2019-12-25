var express = require('express');
var router = express.Router();
var note = require('../controllers/user_ctrl');
var front = require('../controllers/ctrl_f');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index',{title:"user page"});
});
//conteroler and model 
router.post('/note',note.create);
router.get('/note',note.findall);
router.get('/note/:noteId',note.findone);
router.put('/note/:noteId',note.update);
router.delete('/note/:noteId',note.del);

//controllers and views
router.get('/post',front.post);
router.get('/view',front.view);

module.exports = router;
