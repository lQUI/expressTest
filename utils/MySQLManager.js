const baseAbsPath = __dirname + '/';
const singletonEnforcer = Symbol();
const singleton = Symbol();
const mysql = require('mysql');
const Logger = require('../utils/Logger');
const yaml = require('js-yaml');
const fs = require('fs');

const logger = Logger.instance.stdout;

class MySQLManager {

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new MySQLManager(singletonEnforcer);
    }
    return this[singleton];
  }

  constructor(enforcer) {
    if (enforcer != singletonEnforcer)
      throw "cannot constu  singleton";
    try {
      const mysqlConfig = yaml.safeLoad(fs.readFileSync(baseAbsPath + '../configs/mysql.conf', 'utf8'));
      this.pool = mysql.createPool({
        connectionLimit: mysqlConfig.connectionLimit,
        host: mysqlConfig.host,
        port: mysqlConfig.port,
        user: mysqlConfig.user,
        password: mysqlConfig.password,
        database: mysqlConfig.database
      });

    } catch (err) {
      console.log(err);
    }
  }

  query(sql, data, callback) {
    this.pool.getConnection(function(err, conn) {
      if (err) {
        console.log(err);
        callback(err, null, null);
      } else {
        logger.debug(sql + "    " + data);
        conn.query(sql, data, function(qerr, vals, fields) {
          conn.release();
          callback(qerr, vals, fields);
        });
      }
    });
  }
}

exports.default = MySQLManager;
