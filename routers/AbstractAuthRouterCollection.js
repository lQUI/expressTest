const express = require('express');
const constants = require('../constants');

class AbstractAuthRouterCollection {
  constructor(props) {
    const instance = this;
  }

  tokenExpired(res) {
    return res.json({
      ret: constants.RET_CODE.TOKEN_EXPIRED,
    });
  }

  respondWithError(res, err) {
    const retCode = ( (undefined === err || null === err || undefined === err.ret || null === err.ret) ? constants.RET_CODE.FAILURE : err.ret );
    res.json({
      ret: retCode,
    });
  }
}

module.exports = AbstractAuthRouterCollection;
