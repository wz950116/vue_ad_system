(function () {
    var loading = false;
    var initList = [];
    var choice = 1; // 0: swfupload, 1: plupload
    var resBase = '';

    var fnLoadScript = function (src, fun) {
        var head = document.getElementsByTagName('head')[0] || document.head || document.documentElement;

        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('charset', 'UTF-8');
        script.setAttribute('src', src);

        if (typeof fun === 'function') {
            if (window.attachEvent) {
                script.onreadystatechange = function () {
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


    /****************
     * 获取元素的样式值
     * 参考：(Jquery 作者) John Resig
     ****************/
    var getStyle = function (el, name, doc) {
        var _document = doc || document,
            nameWords = name.split('-');
        for (var i = 1, len = nameWords.length; i < len; i++) {
            if (!nameWords[i].length) continue;
            nameWords[i] = nameWords[i].charAt(0).toUpperCase() + nameWords[i].substr(
                1);
        }
        name = nameWords.join('');

        if (el.style[name]) {
            return el.style[name];
        } else if (el.currentStyle) {
            return el.currentStyle[name];
        } else if (_document.defaultView && _document.defaultView.getComputedStyle) {
            name = name.replace(/([A-Z])/g, '-$1');
            name = name.toLowerCase();
            var s = _document.defaultView.getComputedStyle(el, '');
            return s && s.getPropertyValue(name);
        } else {
            return null;
        }
    };


    var swfInit = function (dom, setting) {
        var rect = dom.getBoundingClientRect();
        var height = rect.height ? rect.height : (rect.bottom - rect.top);
        var width = rect.width ? rect.width : (rect.right - rect.left);

        if (getStyle(dom, 'position') === 'static') {
            dom.style['position'] = 'relative';
        }
        var id = Date.now();
        var span = document.createElement('span');
        span.innerHTML = '<span id="' + id + '"></span>';
        var cssText = 'position:absolute;top:0;left:0;height:' + height + 'px;width:' + width + 'px;zoom:0;overflow:hidden;opacity:0.1;filter:alpha(opacity=10);';
        span.style.cssText = cssText;
        dom.insertBefore(span, dom.childNodes[0]);

        var defaultSetting = {
            upload_url: setting.upload_url,
            flash_url: resBase + 'swfupload.swf',
            prevent_swf_caching: false,

            file_size_limit: setting.file_size_limit || '2 MB',
            file_post_name: 'file',
            file_types: '*.jpg;*.png;*.gif;*.jpeg',

            button_placeholder_id: id,
            button_width: width,
            button_height: height,
            button_text: '',
            button_cursor: SWFUpload.CURSOR.HAND,
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            // button_image_url: resBase + 'swfupload.js?button_image_url',

            file_dialog_complete_handler: function () {
                this.startUpload();
            },
            file_queue_error_handler: function () {},
            file_queued_handler: function () {},
            upload_start_handler: function () {},
            upload_progress_handler: function () {},
            upload_error_handler: function () {},
            upload_complete_handler: function () {},
            upload_success_handler: function () {},
            queue_complete_handler: function () {}
        };

        if(setting.file_types && ('string' === typeof (setting.file_types))) {
            var file_type_arr = setting.file_types.split(',');
            for(var ii = 0, llen = file_type_arr.length; ii < llen; ii++) {
                file_type_arr[ii] = '*.' + file_type_arr[ii];
            }
            setting.file_types = file_type_arr.join(';');
            defaultSetting.file_types = setting.file_types;
        }
        defaultSetting.upload_success_handler = function(file, serverData, receivedResponse) {
            setting.upload_success && setting.upload_success(serverData);
        };
        defaultSetting.upload_progress_handler = function(file, bytesLoaded, bytesTotal) {
            var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
            setting.upload_progress && setting.upload_progress(bytesTotal, bytesLoaded, percent);
        };

        var tmp = new SWFUpload(defaultSetting);
    };


    var swfuploader = {
        create: function (dom, libDir, setting) {
            resBase = libDir + 'swfupload/';
            if (window.SWFUpload) {
                swfInit(dom, setting);
            } else {
                initList.push([dom, setting]);

                if (loading) {
                    return;
                }

                loading = true;
                fnLoadScript(resBase + 'swfupload.js', function () {
                    loading = false;

                    var i, item;
                    for (i = 0; i < initList.length; i++) {
                        item = initList[i];
                        swfInit(item[0], item[1]);
                    }
                    initList = [];
                });
            }
        },
        relocation: function (dom) {}
    };


    var pluploader = {
        create: function (dom, libDir, setting) {
            resBase = libDir + 'plupload/';

            if (!dom.id) {
                dom.id = Date.now();;
            }

            var _this = this;

            if (window.attachEvent) {
                fnLoadScript(resBase + 'checkFlash.js');
            }

            if (window.plupload) {
                _this.init(dom, setting);
            } else {
                initList.push([dom, setting]);

                if (loading) {
                    return;
                }

                loading = true;
                fnLoadScript(resBase + 'plupload.full.min.js', function () {
                // fnLoadScript(resBase + 'plupload.dev.js', function () {
                    loading = false;

                    var i, item;
                    for (i = 0; i < initList.length; i++) {
                        item = initList[i];
                        _this.init(item[0], item[1], item[2], item[3]);
                    }
                    initList = [];
                });
            }
        },
        init: function (dom, setting) {
            var plupload = new window.plupload.Uploader({
                runtimes: 'html5,flash,silverlight,html4',
                browse_button: dom.id,
                // container: dom,
                url: setting.upload_url,
                flash_swf_url: resBase + 'Moxie.swf',
                silverlight_xap_url: resBase + 'Moxie.xap',
                filters: {
                    max_file_size: (setting.file_size_limit && ('string' === typeof (setting.file_size_limit))) ? setting.file_size_limit.toLowerCase().replace(/\s/g,'') : '2mb',
                    mime_types: [{
                        title: 'Image files',
                        extensions: (setting.file_types || 'png,gif,jpg,jpeg')
                    }]
                },
                init: {
                    PostInit: function () {},
                    FilesAdded: function (up, files) {
                        plupload.start();
                    },
                    UploadProgress: function (up, file) {
                        setting.upload_progress && setting.upload_progress(file.origSize, file.loaded, file.percent, file.status);
                    },
                    FileUploaded: function (up, file, info) {
                        setting.upload_success && setting.upload_success(info.response);
                    },
                    Error: function (up, err) {
                        var console = window.console;
                        if (!console || !console.log) {
                            return;
                        }
                        console.log('\nError #' + err.code + ': ' + err.message);
                    }
                }
            });
            plupload.init();
        }
    };


    if (typeof module !== 'undefined' && module.exports) {
        module.exports = (choice === 1 ? pluploader : swfuploader);
    } else {
        window.uploader = (choice === 1 ? pluploader : swfuploader);
    }
}());
