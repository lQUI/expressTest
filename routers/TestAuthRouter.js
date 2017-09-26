const log4js = require('log4js');

const AbstractAuthRouterCollection = require('./AbstractAuthRouterCollection.js');
const TokenCache = require('../TokenCache').default;
const tokenCache = new TokenCache();

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

const helloWorld = function(req, res, next) {
    res.send('Hello World!');
}

const addOprate = function(req, res, next) {
    var result = parseInt(req.query.a || req.body.a) + parseInt(req.query.b || req.body.b);
    res.jsonp({
      ' ret': 1000,
      'version': req.params.version,
      'action': req.params.action,
      'result': result
    });
  }

const logUser = function (req, res, next) {
    userLogger.log(req.params.level, 'WOW!!!');
    res.send({
      ret: 1000
    });
  }

const checkUserLogin = function (req, res, next) {
    const instance = this;
    let intAuthToken =  ' ';
    let userId = '';
    tokenCache.check.call(intAuthToken, userId)
      .then(function(isTokenExisits) {
          if(isTokenExisits != true)
              throw new Exception("InAuthToken isn't found in mysql");
            next();
      })
      .catch(function(err) {
          instance.tokenExpired(res) ;
      });
}


const getDetail = function(req, res,  next) {
      console.log("query detail .....") ;   
}

class TestAuthRouter extends AbstractAuthRouterCollection {
    constructor(pros){
        super(pros);
        const instance = this;
        this.helloWorld = helloWorld.bind(this);
        this.addOprate = addOprate.bind(this);
        this.logUser = logUser.bind(this);
        this.checkUserLogin = checkUserLogin.bind(this);
        this.getDetail = getDetail.bind(this);
    }


}

exports.default = TestAuthRouter;


