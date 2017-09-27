const MySQLManager = require('./utils/MySQLManager').default;
const mysqlManager = MySQLManager.instance;

class TokenCache {
  check(intAuthToken, id) {
    return new Promise(function(resolve, reject) {
      mysqlManager.query('select * from token where intAuthToken =? and  id = ? ', [intAuthToken, id], function(error, results, fields) {
        if (null !== results && results.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

  }
}

exports.default = TokenCache;
