var express = require('express');
var router = express.Router();
var note = require('../controllers/user_ctrl');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index',{title:"user page"});
});
router.post('/note',note.create);
router.get('/note/:noteId',note.findone);
router.put('/note/:noteId',note.update);
router.delete('/note/:noteId',note.del);

module.exports = router;
