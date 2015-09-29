var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/getNews', function(req, res, next) {
	request("http://o.go2yd.com/oapi/hkfdt/news_list_for_finance?channel_id=" + req.query["chnId"],function(error, response, html) {
		var jsonObj = JSON.parse(html);
		res.json(jsonObj)
		
	})
  	//res.render('news', { title: 'News from Yidian' });
});

module.exports = router;
