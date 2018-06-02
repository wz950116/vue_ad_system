/*
 * @description util
 * @date 2016年11月1日11:48:32
 * @author Luobata
 * @modify 2017/03/13 guohao
 */

var util = {
    dateFormat: function (date, str) {
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(str)) str = str.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(str)) str = str.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return str;
    },
    newWin: function (url) {
        // 如果广告链接不同域，需要加上防拦截操作
        window.open(url);
    },
    getCid: function () {
        var cid = vueRouter.app._route.params.cid;
        cid = cid ? '/' + cid : '';
        return cid;
    },
    formate: function (data) {
        // data的属性可能是obj
        var str = '';
        for (var k in data) {
            if (typeof data[k] === 'object') {
                str += '&' + k + '=' + this.formate(data[k]);
            } else {
                str += '&' + k + '=' + data[k];
            }
        }
        str = str.substr(1);
        return str;
    },
    fetch: function (url, http, data) {
        if (!data) return fetch(url, http);
        var args;
        if (data instanceof Object) {
            args = this.formate(data);
        } else {
            args = data;
        }

        if (http.method === 'POST') {
            http.body = args;
        } else {
            url += '?' + args;
        }
        return fetch(url, http);
    },
    //设置cookie
    setCookie: function (cname, cvalue, exdays, domain, path) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var path = path ? ";path=" + path : '/';
        var domain = domain ? ";domain=" + domain : '';
        document.cookie = cname + "=" + cvalue + "; " + expires + domain + path;
    },
    //获取cookie
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
        }
        return "";
    },
    //清除cookie
    clearCookie: function (name, domain, path) {
        this.setCookie(name, "", -1, domain, path);
    },
    moneyFormat: function (money) {
        if (typeof money === 'number') {
            money = money.toString();
        }
        if (/[^0-9\.]/.test(money)) return '0.00';
        money = money.replace(/^(\d*)$/, "$1.");
        money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        money = money.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(money)) {
            money = money.replace(re, "$1,$2");
        }
        money = money.replace(/,(\d\d)$/, ".$1");
        return '' + money.replace(/^\./, "0.");
    }
}

module.exports = util;
