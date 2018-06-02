var $$upload = require('../../lib/lib-upload');
var $$domain = require('../../script/config.js').domain;
var _ = require('../../lib/underscore.v1.8.3.js');

module.exports = function(_this) {
    window.setTimeout(function() {
        document.querySelectorAll('.idea-create-new .img-upload-wrapper').forEach(function(item) {
            var $picBox = item.querySelector('.img-upload-w'),
                $img = item.querySelector('.upload-img'),
                $loading = item.querySelector('.el-loading-spinner'),
                groupId = $picBox.getAttribute('group-id'),
                posResourceId = $picBox.getAttribute('pos-resource-id'),
                type = $picBox.getAttribute('type'),
                uploadUrl = $$domain + '/upload/image/res/' + _this.orderId + '_' + groupId + '_' + posResourceId,
                $video;
            uploadUrl = type === '7' ? uploadUrl.replace('image', 'video') : uploadUrl;
            $$upload({
                id: '#' + $picBox.id,
                uploadUrl: uploadUrl,
                fileName: 'file',
                min: 0,
                max: 1024 * 1024 * 5,
                type: '*',
                beforeUpload: function() {
                    $loading.style.display = 'block';
                },
                fn: function(res) {
                    if (res.code === 200) {
                        _this.resourceInfo.forEach(function(item) {
                            item.showList.forEach(function(ite) {
                                ite.posResourceList.forEach(function(it) {
                                    if (it.posResourceId === posResourceId) {
                                        it = _.extend(it, res.data);
                                    }
                                });
                            });
                        });
                        if ($img) {
                            $img.src = res.data.url;
                        } else {
                            // 视频上传
                            $video = $picBox.parentNode.querySelector('.video-wrapper');
                            $video.style.display = 'block';
                            $video.querySelector('.video-link').setAttribute('href', res.data.url);
                            $video.querySelector('.video-link').innerText = res.data.url;
                        }
                    } else {

                        _this.toastShow(1, res.msg);

                    }
                    $loading.style.display = 'none';
                }
            });
        });
    }, 1);
};
