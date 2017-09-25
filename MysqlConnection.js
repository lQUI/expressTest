const yaml = require('js-yaml');
const fs = require('fs');

class MysqlManager {
   static get instance(){
    if(!this[singleton]) {
        this[singleton] =new MysqlManager(singletonEnforccer);
    }
    return this[singleton];
    }

}
