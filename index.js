var express = require('express');
var app = express();

app.set('views', './public');
app.set('view engine','pug');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/home', function (req, res) {
  var title=req.query.title
  res.render('index', { title: title, message: 'Hello there!' })
});

app.post('/',function(req,res){
  res.send('got a POST request');
  console.log('got a POST request');
});

app.delete('/user',function(req,res){
   res.send('Got a DELETE at /user')
});

let router=express.Router();
router.get('/test-api',function(req,res){
   res.send({ret:1000});
});

router.get('/:id',function(req,res){
   var id=req.params.id;
   var query_id=req.query.id;
   console.log('id:'+id+',query_id:'+query_id);
   res.send(id);
});

app.use('/v1' ,router);

//加载bird.js模块
var birds=require('./bird');
app.use('/bird',birds);

//静态文件的加载
app.use('/res',express.static('public'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

