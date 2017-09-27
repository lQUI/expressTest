const Logger = require('../utils/Logger');

const AbstractAuthRouterCollection = require('./AbstractAuthRouterCollection.js');
const TokenCache = require('../TokenCache').default;
const tokenCache = new TokenCache();

const MySQLManager = require('../utils/MySQLManager').default;
const mysqlManager = MySQLManager.instance;

const userLogger = Logger.instance.app;
const stdoutLogger = Logger.instance.stdout;

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

const logUser = function(req, res, next) {
  userLogger.log(req.params.level, 'WOW!!!');
  res.send({
    ret: 1000
  });
}

const checkUserLogin = function(req, res, next) {
  const instance = this;
  let intAuthToken = req.query.intAuthToken || req.params.intAuthToken || req.body.intAuthToken;
  let id = req.body.userid || req.params.userid || req.query.userid;
  tokenCache.check.call(this, intAuthToken, id)
    .then(function(isTokenExisits) {
      if (isTokenExisits != true) {
        throw "IntAuthToken isn't found in mysql";
      } else {
        next();
      }
    })
    .catch(function(err) {
      stdoutLogger.debug(err);
      err.ret = 1001;
      instance.respondWithError(res, err);
    });
}


const getDetail = function(req, res, next) {
  let intAuthToken = req.query.intAuthToken || res.params.intAuthToken;
  mysqlManager.query('select t.*,u.name from token t,user u where intAuthToken = ? and u.id=t.id ', [intAuthToken], function(err, results, fields) {
    if (null !== results && results.length > 0) {
      res.render('user', {
        token: results[0],
        user: {
          name: results[0].name
        }
      });
    } else {
      err.ret = 1001;
      instance.respondWithError(res, err);
    }
  });
}

class TestAuthRouter extends AbstractAuthRouterCollection {
  constructor(pros) {
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
