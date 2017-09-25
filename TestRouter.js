const baseAbsPath = __dirname + '/';
const log4js = require('log4js');
const mysql = require('mysql');
const yaml = require('js-yaml');
const fs = require('fs');
const mysqlConfig = yaml.safeLoad(fs.readFileSync(baseAbsPath + 'configs/mysql.conf', 'utf8'));
const pool = mysql.createPool({
  connectionLimit: mysqlConfig.connectionLimit,
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database
});

//init log4js
log4js.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: 'cheese.log'
    },
    console: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['cheese', 'console'],
      level: 'debug'
    }
  }
});
const userLogger = log4js.getLogger();

class TestRouter {
  helloWorld(req, res) {
    res.send('Hello World!');
  }

  addOprate(req, res) {
    var result = parseInt(req.query.a || req.body.a) + parseInt(req.query.b || req.body.b);
    res.jsonp({
      ' ret': 1000,
      'version': req.params.version,
      'action': req.params.action,
      'result': result
    });
  }

  logUser(req, res) {
    userLogger.log(req.params.level, 'WOW!!!');
    res.send({
      ret: 1000
    });
  }

  checkUserIsLogin(req, res, next) {
    console.log(mysqlConfig);
    if ('' != req.query.intAuthToken) { //判断intAuthToken是否存在
      var token;
      pool.getConnection(function(err, connection) {
        connection.query('select * from token where intAuthToken = ?', [req.query.intAuthToken], function(error, results, fields) {
          if (error)
            throw error;
          token = results[0];
          if (token == undefined) { //根据intAuthToken查询是否为空
            console.log('user is not found');
            res.send({
              ret: 1001
            });
          } else {
            //checkUserIsLegal (req, res); 
            console.log('next');
            req.body.token = token;
            next();
          }
        });
        connection.release();
      });
    } else {
      console.log('intAuthToken is null');
      res.send({
        ret: 1001
      });
    }
  }

  checkUserIsLegal(req, res) {
    var isPass = false;
    console.log('checkUserIsLegal:' + req.body.tokenId);
    pool.getConnection(function(err, connection) {
      connection.query('select * from user where id = ?', [req.body.token.id], function(error, results, fields) {
        if (error)
          throw error;
        console.log(req.params.userid);
        if (results.length > 0 && results[0].id == req.params.userid) { //判断用户是否合法
          isPass = true; console.log('pass!! ' + isPass);
        }

        if (isPass) {
          res.render('user', {
            token: req.body.token,
            user: results[0]
          });
        } else {
          console.log('user.id is not match userId');
          res.send({
            ret: 1001
          });
        }
      });
      connection.release();
    });
  }

}

exports.default = TestRouter;


