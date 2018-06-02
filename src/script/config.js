var getDomain = function (prefix, notRelyOnPage, elseThenEmpty) {
    notRelyOnPage = !!notRelyOnPage;
    if (window.location.host.indexOf('focus') >= 0) {
        var startPos = window.location.host.indexOf('focus');
        var endPos = window.location.host.indexOf('.', startPos);
        var domainEnv = window.location.host.substring(startPos, endPos);
        if (notRelyOnPage && /^\d$/.test(domainEnv.charAt(domainEnv.length - 1))) {
            if (domainEnv.indexOf('focus-test') === 0) {
                domainEnv = 'focus-test';
            } else if (domainEnv.indexOf('focus-dev') === 0) {
                domainEnv = 'focus-dev';
            } else {
                domainEnv = 'focus';
            }
        }
        return '//' + (prefix === '' ? '' : (prefix + '.')) + domainEnv + '.cn';
    } else {
        return elseThenEmpty ? '' : ('//' + prefix + '.focus.cn');
    }
};

module.exports = {
    getDomain: getDomain,
    businessDomain: getDomain('house-sv-base', true) + '/city/district/circles',
    domain: '/api',
    domainLogin: getDomain('', true),
    qulificationUploadUrl: getDomain('adv') + '/api/upload/image/qualification'
};