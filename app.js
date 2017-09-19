const express = require('express');
const app= express();
const mysql = require('mysql');
const constants = require('./constants');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const yaml = require('js-yaml');
const fs = require('fs');
const mysqlConfigFilePath = (
const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'testdb'
});

app.use('/static', express.static('public'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: '*/*' }));

//init log4js
log4js.configure({
    appenders:{
    cheese:{type: 'file', filename:'cheese.log'},
    console:{type: 'console'}
    },
    categories:{default:{appenders:['cheese','console'], level:'debug'}}
});
const userLogger = log4js.getLogger();

/**
*
*/
app.get(constants.ROUTE_PATHS.ROOT, function(req, res)  {
    res.send('Hello world');
});

/**
*3.1 Basic Parameterized Http Route
**/
app.get(constants.ROUTE_PATHS.BASE + constants.ROUTE_PATHS.TEST_API, function(req, res) {
    console.log('hello world');
    res.send('');    
});

/**
*3.2 Basic Query in Request
**/
app.get(constants.ROUTE_PARAMS.VERSION + constants.ROUTE_PARAMS.ACTION,  function(req, res) {
    console.log(req.params.version + req.params.action + req.query.a + req.query.b );
    var result = parseInt(req.query.a) + parseInt(req.query.b);
    res.jsonp({
       ' ret' : 1000,
       'version' : req.params.version,
       'action' : req.params.action,
       'result' :result 
    }); 
});

/**
*3.3 URLEncoded Form in Request
**/
app.post(constants.ROUTE_PATHS.BASE + constants.ROUTE_PARAMS.ACTION, function(req, res) {
    console.log(req.params.version + req.params.action + req.query.a + req.params );
    var result = parseInt(req.body.a) + parseInt(req.body.b);
    res.jsonp({
       ' ret' : 1000,
        'version' : req.params.version,
        'action' :  req.params.action,
        'result' : result
    });
});

/**
*3.4  Html Template Engine Practice
*/
app.get(constants.ROUTE_PATHS.BASE + constants.ROUTE_PARAMS.NAMESPACE + constants.ROUTE_PARAMS.RESOURCE + constants.ROUTE_PATHS.LIST, function (req, res) {
    var students = [];
    for(i = 0; i < 5; i ++){
        var student = new Object();
        student.firstname = 'zs' + i;
        student.lastname = 'li' + i;
        student.age = parseInt(Math.random() * 100);
        students[i] = student
    }
    res.render('index', {students : students});
});

/**
*3.5 Logging to Multiple Files Differentiated by Levels
**/
app.post(constants.ROUTE_PARAMS.USERID + constants.ROUTE_PARAMS.NAMESPACE + constants.ROUTE_PARAMS.LEVEL + constants.ROUTE_PATHS.DETAIL, function(req,res) {
    console.log('enter');
    userLogger.log(req.params.level,'WOW!!!');  
    res.send({ret : 1000});
});

/**
*3.6 Hiding Your Authentication Protected Service behind AuthMiddleware
**/
app.get(constants.ROUTE_PARAMS.USERID + constants.ROUTE_PATHS.WALLET + constants.ROUTE_PATHS.SELF + constants.ROUTE_PARAMS.DETAIL, function(req, res, next) {
    var isPass = false;
    if('' != req.query.intAuthToken){//判断intAuthToken是否存在
        var token ;
        pool.getConnection(function(err, connection){
            connection.query('select * from token where intAuthToken = ?',[req.query.intAuthToken], function(error, results, fields){
                if (error)  throw error;
                token = results[0];
                if(token == undefined){//根据intAuthToken查询是否为空
                    console.log('user is not found');
                    res.send({ret : 1001});
                }else{
                    pool.getConnection(function(err, connection){
                        connection.query('select * from user where id = ?',[token.id],function(error, results, fields){
                            if (error)  throw error;

                            if(results.length > 0 && results[0].id == req.params.userId){//判断用户是否合法
                                isPass=true; console.log('pass!! '+isPass);
                            }

                            if(isPass){
                                res.render('user', {token : token, user :results[0]});
                            }else{
                                console.log('user.id is not match userId');
                                res.send({ret : 1001});
                            }
                        });
                        connection.release();
                    });
                }
            });
            connection.release();
        });
    }else{
        console.log('intAuthToken is null');
        res.send({ret : 1001});
    }
});


var server = app.listen (3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log('example app listening at http://%s:%s', host, port);
});

   
