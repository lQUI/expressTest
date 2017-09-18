var express = require('express');
var app= express();
app.set('view engine', 'jade');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'testdb'
});

app.get('/', function(req, res)  {
    res.send('Hello world');
});

app.get('/v3/test-api', function(req, res) {
    console.log('hello world');    
});

app.get('/v:version/:action', function(req, res) {
    console.log(req.params.version + req.params.action + req.query.a + req.query.b );
    var result = parseInt(req.query.a) + parseInt(req.query.b);
    res.jsonp({
       ' ret' : 1000,
        'version' : req.params.version,
        'action' :req.params.action,
        'result' : result
    }); 
});

app.get('/v:version/:namespace/:resource/:action', function (req, res) {
    var students = [];
    for(i=0;i<5;i++){
        var student = new Object();
        student.firstname = 'zs'+i;
        student.lastname = 'li'+i;
        student.age = parseInt(Math.random()*100);
        students[i] = student
    }
    res.render('index', {students : students});
});

app.use('/:userId/wallet/self/detail', function(req,res) {
    if('' != req.query.intAuthToken){
        connection.connect();
        connection.query('select * from token where intAuthToken = ?',[req.query.intAuthToken], function(error, results, fields){
            if (error)  throw error;
            console.log(results);
            console.log(fields);
        });
    }
    res.send({ret : 1001});
});

var server = app.listen (3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('example app listening at http://%s:%s', host, port);
});

   
