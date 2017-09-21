//const mysqlConfigFilePath = (
const log4js = require('log4js');
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'testdb'
});

//init log4js
log4js.configure({
    appenders:{
    cheese:{type: 'file', filename:'cheese.log'},
    console:{type: 'console'}
    },
    categories:{default:{appenders:['cheese','console'], level:'debug'}}
});
const userLogger = log4js.getLogger();

class TestRouter {
    helloWorld(req, res) {
        res.send('Hello World!');
    }

    addOprate(res, req) {
        var result = parseInt(req.query.a || req.body.a) + parseInt(req.query.b || req.body.b);
        res.jsonp({
           ' ret' : 1000,
           'version' : req.params.version ,
           'action' : req.params.action,
           'result' :result 
       }); 
    }

    logUser(req, res) {
        userLogger.log(req.params.level,'WOW!!!');  
        res.send({ret : 1000});
    }

    checkUserIsLogin(req, res) {
        if('' != req.query.intAuthToken){//判断intAuthToken是否存在
            var token ;
            pool.getConnection(function(err, connection){
                connection.query('select * from token where intAuthToken = ?',[req.query.intAuthToken], function(error, results, fields) {
                    if (error)  throw error;
                    token = results[0];
                    if(token == undefined){//根据intAuthToken查询是否为空
                        console.log('user is not found');
                        res.send({ret : 1001});
                    }else{
                        checkUserIsLegal(req, res);  
                    }
                });
                connection.release();
            });
        }else{
            console.log('intAuthToken is null');
            res.send({ret : 1001});
        }
    }

    checkUserIsLegal(req, res){
        pool.getConnection(function(err, connection) {
            connection.query('select * from user where id = ?',[token.id],function(error, results, fields) {
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

}