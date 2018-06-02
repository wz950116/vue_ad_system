var _ = require('../../lib/underscore.v1.8.3.js');

module.exports = function(params, currentData) {
    if (currentData) {
        currentData.showList.forEach(function(item) {
            item.posResourceList.forEach(function(it) {
                params.data[it.posResourceId] = {};
                var type = parseInt(it.type);
                // 文字链
                if (type === 0) {
                    params.data[it.posResourceId] = {
                        description: it.description || ''
                    };
                }

                // 图片
                if (type >= 1 && type <= 3) {
                    params.data[it.posResourceId] = {
                        width: it.width || null,
                        height: it.height || null,
                        md5: it.md5 || null,
                        file_type: it.file_type || null,
                        size: it.size || null,
                        url: it.url || null
                    };
                }

                // 图文
                if (type >= 4 && type <= 6) {
                    params.data[it.posResourceId] = {
                        width: it.width || null,
                        height: it.height || null,
                        md5: it.md5 || null,
                        file_type: it.file_type || null,
                        size: it.size || null,
                        url: it.url || null,
                        description: it.description || ''
                    };
                }

                // 视频
                if (type === 7) {
                    params.data[it.posResourceId] = {
                        width: it.width || null,
                        height: it.height || null,
                        md5: it.md5 || null,
                        file_type: it.file_type || null,
                        size: it.size || null,
                        url: it.url || null
                    };
                }

                // 排行
                if (type === 9) {
                    _.each(it.list, function(item) {
                        item.dealNum = parseInt(item.dealNum);
                        item.dealPrice = parseInt(item.dealPrice);
                    });
                    params.data[it.posResourceId] = {
                        list: it.list || []
                    };

                }

                // 行情
                if (type === 11) {
                    params.data[it.posResourceId] = {
                        description: it.description || '',
                        num1: it.num1 || '',
                        num2: it.num2 || ''
                    };
                }
            });
        });
    }
};
