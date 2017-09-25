const express = require('express');
const app= express();
const constants = require('./constants');
const bodyParser = require('body-parser');
//const yaml = require('js-yaml');
//const fs = require('fs');
const TestRouter = require('./TestRouter.js').default;


app.use('/static', express.static('public'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: '*/*' }));

const testRouter = new TestRouter();

/**
* 
*/
app.get(constants.ROUTE_PATHS.ROOT, function(req, res)  {
    res.send('Hello world');
});

/**
* @api {get} /v3/test-api  3.1 Basic Parameterized Http Route
* @apiSuccess {String} print 'Hello World!!1'
*/
app.get(constants.ROUTE_PATHS.BASE + constants.ROUTE_PATHS.TEST_API, testRouter.helloWorld);

/**
* @api {get} /v3/:action 3.2 Basic Query in Request
* @apiSuccessExample {json} Succes-response:
*     Http/1.1 200 ok
*     {
*       'ret' :1000,
*       'version':3,
*       'action':'plus',
*       'result':7
*     }
**/
app.get(constants.ROUTE_PARAMS.VERSION + constants.ROUTE_PARAMS.ACTION, testRouter.addOprate);

/**
* @api {get} /v3/:action 3.3 URLEncoded Form in Request
* @apiSuccessExample {json} Succes-response:
*     Http/1.1 200 ok
*     {
*       'ret' :1000,
*       'version':3,
*       'action':'plus',
*       'result':7
*     }
**/
app.post(constants.ROUTE_PATHS.BASE + constants.ROUTE_PARAMS.ACTION, testRouter.addOprate);

/**
*3.4  Html Template Engine Practice
*/
app.get(constants.ROUTE_PATHS.BASE + constants.ROUTE_PARAMS.NAMESPACE + constants.ROUTE_PARAMS.RESOURCE + constants.ROUTE_PATHS.LIST, function (req, res) {
    var students = [];
    for(i = 0; i < 5; i ++){
            var student = new Object();
            student.firstname = 'zs' + i;
            student.lastname = 'li' + i;
            student.age = parseInt(Math.random() * 100);
            students[i] = student
        }
        res.render('index', {students : students});
});

/**
*3.5 Logging to Multiple Files Differentiated by Levels
**/
app.post(constants.ROUTE_PARAMS.USERID + constants.ROUTE_PARAMS.NAMESPACE + constants.ROUTE_PARAMS.LEVEL + constants.ROUTE_PATHS.DETAIL, testRouter.logUser);

/**
*3.6 Hiding Your Authentication Protected Service behind AuthMiddleware
**/
app.use(constants.ROUTE_PARAMS.USERID , testRouter.checkUserIsLogin);
app.get(constants.ROUTE_PARAMS.USERID + constants.ROUTE_PATHS.WALLET + constants.ROUTE_PATHS.SELF + constants.ROUTE_PATHS.DETAIL, testRouter.checkUserIsLegal);

var server = app.listen (3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('example app listening at http://%s:%s', host, port);
});


