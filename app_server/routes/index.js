var express = require('express');
var router = express.Router();
const ctrl = require ('../controllers/ctrl');
/* GET home page. */
router.get('/', ctrl.home);

module.exports = router;
