var $$model = require('./model.js');
var $$util = require('../../lib/util.js');

module.exports = {
    props: {
        ideaId: {
            type: Number,
            default: 0
        },
        orderName: {
            type: String,
            default: '当前创意名称'
        }
    },
    components: {},
    data: function() {
        return {
            dialogVisible: false,
            infoData: {},
            groupedResource: []
        };
    },
    watch: {
        dialogVisible: function(val) {
            var _this = this;
            if (val === true) {
                $$model.getIdeaDetails({ idea_id: _this.ideaId }, function(res) {
                    if (res.code === '200') {
                        _this.infoData = res.data.link_info.resultData;
                        _this.groupedResource = res.data.groupedResource;
                    } else {
                        _this.toast(0, res.msg);
                    }
                });
            }
        }
    },
    methods: {
        preview: function(url) {
            $$util.newWin(url);
        }
    }
}
