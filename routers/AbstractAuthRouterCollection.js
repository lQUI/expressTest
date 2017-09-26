const express = require('express');
const constants = require('../constants');

class AbstractAuthRouterCollection {
  constructor(props) {
    const instance = this;
  //  this.onLoggedInByCredentialsRouter = express.Router({mergeParams: true});
  //  this.onLoggedInByCredentialsRouter.post(constants.ROUTE_PATHS.LOGIN, function(req, res) {
  //  const handle = req.body.handle;
  // (instance.onLoggedInByCredentials.bind(instance))(handle, req, res);
  //   });

    // this.onLoggedInBySmsCaptchaRouter = express.Router({mergeParams: true});
    // this.onLoggedInBySmsCaptchaRouter.post(constants.ROUTE_PATHS.LOGIN, function(req, res) {
    //   const handle = req.body.handle;
    //   (instance.onLoggedInBySmsCaptcha.bind(instance))(handle, req, res);
    // });

    // Auth middlewares begin.
    // NOTE: Ref binding is required in children classes.
    // this.credentialsAuth = null;
    // this.tokenAuth = null;
    // this.smsCaptchaAuth = null;
    // Auth middlewares end.

    // this.pageRouter = null; 
    // this.authProtectedApiRouter = null; 
  }

  nonexistentHandle(res) {
    return res.json({
      ret: constants.RET_CODE.NONEXISTENT_HANDLE,
    });
  }

  incorrectPhone(res) {
    return res.json({
      ret: constants.RET_CODE.INCORRECT_PHONE_COUNTRY_CODE_OR_NUMBER,
    });
  }

  incorrectCaptcha(res) {
    return res.json({
      ret: constants.RET_CODE.INCORRECT_CAPTCHA,
    });
  }

  incorrectPassword(res) {
    return res.json({
      ret: constants.RET_CODE.INCORRECT_PASSWORD,
    });
  }

  tokenExpired(res) {
    return res.json({
      ret: constants.RET_CODE.TOKEN_EXPIRED,
    });
  };

  respondWithError(res, err) {
    const retCode = ( (undefined === err || null === err || undefined === err.ret || null === err.ret) ? constants.RET_CODE.FAILURE : err.ret );
    res.json({
      ret: retCode,
    });
  }
}

module.exports = AbstractAuthRouterCollection;
