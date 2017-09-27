const Sequelize = require('sequelize');
const sequelize = require('../utils/MySQLManager').instance.dbRef;

const Token = sequelize.define('token', {
  tokenId: {
    type: Sequelize.STRING,
    primaryKey: false,
    field: 'id'
  },
  intAuthToken: Sequelize.STRING,
  device: Sequelize.STRING,
  ip: Sequelize.STRING
},
  {
    timestamps:false,
    tableName: 'token'
  }
);

exports.default = Token;
