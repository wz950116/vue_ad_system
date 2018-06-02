var $$settingsModel = require('../../script/data/model/settings.js');
var alert = require('../alert/alert');
module.exports = {
    data: function() {
        return {
            abserver: false,
            handler: false,
            treasurer: false,
            visiting: true,
            added: false,
            tel: "",
            role: "",
            telError: "",
            redioError: "",
            list: [{
                number: '2121299',
                info: '18845073905',
                role: '管理员',
                status: 1,
                statusText: ""
            }, {
                number: '2121299',
                info: '18845073905',
                role: '管理员',
                status: 1,
                statusText: ""
            }, {
                number: '2121299',
                info: '18845073905',
                role: '管理员',
                status: 1,
                statusText: ""
            }, {
                number: '2121299',
                info: '18845073905',
                role: '管理员',
                status: 1,
                statusText: ""
            }],
            alert: {
                show: false,
                message: '',
                status: 0
            }
        }
    },
    components: {
        alert: alert
    },
    beforeMount: function() {
        var that = this;
        that.getList();
    },
    methods: {
        getList: function() {
            var that = this;
            var tmp = {};
            var comfirmed = that.visiting ? false : true;
            that.list.length = 0;
            $$settingsModel.getList({
                confirmed: comfirmed
            }, function(data) {
                if (parseInt(data.code) === 200) {
                    data.data.items.forEach(function(item) {
                        tmp.number = item.user_id;
                        tmp.info = item.user_name;
                        tmp.role = item.role_desc;
                        tmp.status = parseInt(item.activate_status);
                        switch (parseInt(item.activate_status)) {
                            case 0:
                                tmp.statusText = "等待登陆";
                                break;
                            case 2:
                                tmp.statusText = "确认授权";
                                break;
                            case 1:
                                tmp.statusText = "删除";
                                break;
                        }
                        that.list.push(tmp);
                        tmp = {};
                    });
                }
            });
        },
        selected: function(type) {
            switch (type) {
                case 'abserver':
                    this.treasurer = false;
                    this.handler = false;
                    this.abserver = true;
                    this.role = "ROLE_DEMANDER_OBSERVER";
                    break;
                case 'handler':
                    this.treasurer = false;
                    this.handler = true;
                    this.abserver = false;
                    this.role = "ROLE_DEMANDER_OPERATOR";
                    break;
                case 'treasurer':
                    this.treasurer = true;
                    this.handler = false;
                    this.abserver = false;
                    this.role = "ROLE_DEMANDER_ACCOUNTANT";

                    break;
                case 'visiting':
                    this.added = false;
                    this.visiting = true;
                    this.getList();
                    break;
                case 'added':
                    this.added = true;
                    this.visiting = false;
                    this.getList();
                    break;
            }
        },
        addConfirm: function() {
            var that = this;
            if (this.tel === "") {
                this.telError = "请输入电话号码";
                return;
            } else if (!(/^1[34578]\d{9}$/.test(this.tel))) {
                this.telError = "请输入正确的电话号码";
                return;
            } else {
                this.telError = "";
            }
            if (this.role === "") {
                this.redioError = "请选择角色";
                return;
            } else {
                this.redioError = "";
            }
            $$settingsModel.addCollaborator({
                mobile: that.tel,
                roleName: that.role
            }, function(data) {
                if (parseInt(data.code) === 200) {
                    that.alertShow(0, "添加成功！");
                    that.getList();
                } else {
                    that.alertShow(1, data.msg);
                }
            });
        },
        alertShow: function(status, txt) {
            var _this = this;
            _this.alert.status = status;
            _this.alert.message = txt;
            _this.alert.show = true;
            window.setTimeout(function() {
                _this.alert.show = false;
            }, 2000);
        },
        submitHandle: function(type, id) {
            var that = this;
            switch (parseInt(type)) {
                case 2:
                    that.confirmAuth(id);
                    break;
                case 1:
                    that.del(id);
                    break;
            }
        },
        confirmAuth: function(id) {
            var that = this;
            $$settingsModel.confirmAuth({
                collaboratorId: parseInt(id)
            }, function(data) {
                if (parseInt(data.code) === 200) {
                    that.alertShow(0, "确认授权成功！");
                    that.getList();
                } else {
                    that.alertShow(1, data.msg);
                }
            });
        },
        del: function(id) {
            var that = this;
            $$settingsModel.del({
                collaboratorId: parseInt(id)
            }, function(data) {
                if (parseInt(data.code) === 200) {
                    that.alertShow(0, "删除成功！");
                    that.getList();
                } else {
                    that.alertShow(1, data.msg);
                }
            });
        }
    }
};