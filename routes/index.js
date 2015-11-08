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

router.get('/getMergedNews', function(req, res, next) {
	request("http://121.43.73.191:8080/news?pages=2&category_id=" + req.query["chnId"],function(error, response, html) {
		var jsonObj = JSON.parse(html);
		res.json(jsonObj)	
	})
  	//res.render('news', { title: 'News from Yidian' });
});

function _getData(chnId, dataArr, cb) {
	console.info(dataArr.length)
	request("http://o.go2yd.com/oapi/hkfdt/news_list_for_finance?channel_id=" + chnId, function(error, response, html) {
		var thisArr = JSON.parse(html).result;
		var dataArr = thisArr.concat(dataArr)
		cb(dataArr)
	});
}

module.exports = router;
