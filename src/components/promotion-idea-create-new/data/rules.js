var validateLink = function(rule, value, callback) {
    if (!value) {
        return callback(new Error('链接不能为空'));
    } else {
        callback();
    }
};

var getTextLen = function(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            len += 1;
        } else {
            len += 0.5;
        }
    }
    return len;
};

var validateText = function(rule, value, callback) {
    if (!value) {
        return callback(new Error('内容不能为空'));
    } else if (getTextLen(value) < 20) {
        return callback(new Error('内容长度错误'));
    } else {
        callback();
    }
};

module.exports = {
    link: [
        { validator: validateLink, trigger: 'blur' }
    ]
}
