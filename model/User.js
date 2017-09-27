const Sequelize = require('sequelize');
const sequelize = require('../utils/MySQLManager').instance.dbRef;

const User = sequelize.define('user', {
  userId: {
    type: Sequelize.STRING,
    field: 'id'
  },
  name: Sequelize.STRING,
  age: Sequelize.INTEGER
},
  {
    timestamps: false,
    paranoid: true,
    tableName: 'user'
  });

exports.default = User;
