const MySQLManager = require('./utills/MySQLManager').default;
const mysqlManager =  MySQLManager.instance;

class TokenCache {
    check (intAuthToken, userId) {
        mysqlManager.pool.getConnection(function(err, connection) {
            connection.query('select * from token where id = ? and userid = ?', [intAuthToken, userId], function(error, results, fields) {     
                 console.log("connction release!!")
                connection.release();  
                if (null !== result && results.length > 0 ) {
                    console.log('pass!! ' + isPass);
                    return new Promise(function(resolve, reject) {
                        console.log("found in cache")
                        resolve(true);
                      });
                }else {
                    return new Promise(function(resolve, reject) {
                            console.log("cannot found in Cache");
                            resolve(false);
                    });
                }
            });
        });
    }
}

exports.default = TokenCache;
