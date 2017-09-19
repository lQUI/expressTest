'use-strict';

const ROUTE_PATHS = {
    ROOT:"/",
    BASE:"/V3",
    TEST_API:"/test-api",
    WALLET:"/wallet",
    SELF:"/self",
    PLUS:"/plus",

    ADD:"/add",
    DETAIL:"/detail",
    LIST:"/list"
}

exports.ROUTE_PATHS = ROUTE_PATHS;

const ROUTE_PARAMS = {
    USERID:"/:userid",
    NAMESPACE:"/:namespace",
    LEVEL:"/:level",
    RESOURCE:"/:resource",
    VERSION : "/V:VERSION",
    ACTION : "/:action"
}

exports.ROUTE_PARAMS = ROUTE_PARAMS;
