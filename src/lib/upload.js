var loading = false;
var initList = [];
var resBase =
    '//changyan.itc.cn/mdevp/extensions/cui/002/swfupload.v2.2.0/';

var setting = {
    flash_url: resBase + 'swfupload.swf',
    prevent_swf_caching: false,

    file_size_limit: '1 MB',
    file_post_name: 'file',
    // file_types: '*.jpg;*.png;*.gif;*.jpeg',
    button_text: '',
    button_image_url: resBase + 'swfupload.js?button_image_url',
};

function upload(dom, url, fn, limitSize) {
    if (dom) {
        if (limitSize !== undefined) {
            uploader.config({
                file_size_limit: limitSize,
                file_post_name: 'file',
                // file_types: '*.jpg;*.png',
                button_placeholder_id: 'selectFiles4'
            });
        } else {
            uploader.config({
                file_size_limit: '1 MB',
                file_post_name: 'file',
                // file_types: '*.jpg;*.png',
                button_placeholder_id: 'selectFiles4'
            });
        }
        uploader.create(dom, url, function(response) {
            console.log(response);
            fn(response);
            console.log('response', response);
        });
    }
};
var fnLoadScript = function(src, fun) {
    var head = document.getElementsByTagName('head')[0] || document.head ||
        document.documentElement;

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'UTF-8');
    script.setAttribute('src', src);

    if (typeof fun === 'function') {
        if (window.attachEvent) {
            script.onreadystatechange = function() {
                var r = script.readyState;
                if (r === 'loaded' || r === 'complete') {
                    script.onreadystatechange = null;
                    fun();
                }
            };
        } else {
            script.onload = fun;
        }
    }

    head.appendChild(script);
};
var fnInit = function($dom, url, fn) {
    var height = $dom.height();
    var width = $dom.width();

    if ($dom.css('position') === 'static') {
        $dom.css('position', 'relative');
    }
    var id = 'id-' + (+new Date());
    var html =
        '\
            <span style="position: absolute; top: 0; left: 0; height: ' +
        height + 'px; width: ' + width +
        'px; overflow: hidden; opacity: 0.1; filter:alpha(opacity=10);">\
                <span  id="' +
        id + '"></span>\
            </span>\
        ';
    $dom.prepend(html);

    var _setting = $.extend({}, setting, {
        upload_url: url,
        button_placeholder_id: id,
        button_width: width,
        button_height: height,
        button_cursor: SWFUpload.CURSOR.HAND,
        button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,

        file_dialog_complete_handler: function() {
            this.startUpload();
        },

        file_queue_error_handler: function(a, b, c) {
            console.log(b,c)
            fn && fn(b, c);
        },

        upload_success_handler: function(a, b, c) {
            console.log(b,c)
            fn && fn(b, c);
        }
    });
    var tmp = new SWFUpload(_setting);
};
var uploader = {
    create: function($dom, url, fn) {
        if (window.SWFUpload) {
            fnInit($dom, url, fn);
        } else {
            initList.push([$dom, url, fn]);

            if (loading) {
                return;
            }

            loading = true;
            fnLoadScript(resBase + 'swfupload.js', function() {
                loading = false;
                var i, item;
                for (i = 0; i < initList.length; i++) {
                    item = initList[i];
                    fnInit(item[0], item[1], item[2]);
                }
                initList = [];
            });
        }
    },
    config: function(paramsConfig) {
        $.extend(setting, paramsConfig);
    }
};
var SWFUploadInit = function($dom) {
    if (window.SWFUpload) {
        fnInit($dom, url, fn);
    } else {
        initList.push([$dom, url, fn]);

        if (loading) {
            return;
        }

        loading = true;
        fnLoadScript(resBase + 'swfupload.js', function() {
            loading = false;

            var i, item;
            for (i = 0; i < initList.length; i++) {
                item = initList[i];
                fnInit(item[0], item[1], item[2]);
            }
            initList = [];
        });
    }
};
module.exports = upload;
