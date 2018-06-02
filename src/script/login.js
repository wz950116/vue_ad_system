/**
 * Created by WeiWang on 2016/12/26.
 */
var $$header = require('./data/model/header');
var $$user = require('./data/model/user');
var login = function(fn) {
    $$header.getHeaderInfo({}, function(data) {
        var userStatus = data.data.userStatus;
        var routerUrl = '';
        switch (userStatus) {
            case '200':
                if (location.hash.indexOf("qualification") > -1 && location.hash.indexOf("settings/qualification") < 0) {
                    routerUrl = '/customer';
                }
                break;
            case '401':
                routerUrl = '/qualification/login';
                break;
            case '402':
                routerUrl = '/qualification/collaborator?demander=' + data.data.userdemander;
                break;
            case '404':
                routerUrl = '/qualification/chose';
                break;
            case '405':
                routerUrl = '/qualification/audit?type=405';
                break;
            case '406':
                routerUrl = '/qualification/audit?type=406';
                break;
            case '407':
                routerUrl = '/qualification/wait';
                break;
        }
        $$user.setCurrentInfo({
            data: data.data,
            url: routerUrl
        });
        fn && fn();
    });
};
module.exports = login;
