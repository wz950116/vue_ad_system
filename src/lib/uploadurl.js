module.exports = (function getUrl() {
    var uploadApi = "/api/upload/image/qualification";
    if (location.host.indexOf("localhost") > -1 || location.host.indexOf("127.0.0.1") > -1 || location.host.indexOf("focus-dev") > -1) {
        return "//adv.focus-dev.cn/api/upload/image/qualification";
    } else if (location.host.indexOf("focus-test") > -1) {
        return "//adv.focus-test.cn/api/upload/image/qualification";
    } else {
        return "//adv.focus.cn/api/upload/image/qualification";
    }
})();
