const baseAbsPath = __dirname + '/';
const singletonEnforcer = Symbol();
const singleton = Symbol();
const mysql = require('mysql');

const yaml = require('js-yaml');
const fs = require('fs');



class MySQLManager{

    static get instance() {
        console.log('get MySQLManager instance');
        if (!this[singleton]) {
          this[singleton] = new MySQLManager(singletonEnforcer);
        }
        return this[singleton];
      }

    constructor(enforcer){
        console.log("mysqManager constructor is running");
        if(enforcer != singletonEnforcer )  throw "cannot constu  singleton";
        try{
            const mysqlConfig = yaml.safeLoad(fs.readFileSync(baseAbsPath + '../configs/mysql.conf', 'utf8'));
            this.pool = mysql.createPool({
                  connectionLimit: mysqlConfig.connectionLimit,
                  host: mysqlConfig.host,
                  port: mysqlConfig.port,
                  user: mysqlConfig.user,
                  password: mysqlConfig.password,
                  database: mysqlConfig.database
                });

        }catch(err){
            console.log(err);
        }
    };


}

exports.default = MySQLManager;
