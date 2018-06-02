<template>
    <div class="settle-wrap" :style="{ height: mheight + 'px' }">
        <h3>{{company}}已将您的账户添加为操作者</h3>
        <p class="tips">确认接受该权限后,您的账号将无法创建新公司或者绑定其他公司,是否确认接受?</p>
        <div class="action">
            <a class="reject" @click="accept(false)">拒绝</a>
            <a class="accept" @click="accept(true)">接受</a>
        </div>
    </div>
</template>
<style scoped>
    .settle-wrap {
        width: 1200px;
        margin: 20px auto 21px;
        padding-top: 130px;
        background: #fff url(./warming.png) no-repeat center 50px;
    }

    .settle-wrap h3 {
        margin: 10px auto;
        text-align: center;
        font-size: 24px;
        color: #ee4433;
    }

    .settle-wrap .tips {
        margin: 10px auto;
        text-align: center;
        font-size: 14px;
        color: #666;
    }

    .settle-wrap .action {
        margin: 50px auto;
        text-align: center;
    }

    .settle-wrap .action a {
        display: inline-block;
        width: 160px;
        height: 45px;
        text-align: center;
        line-height: 45px;
        font-size: 16px;
    }

    .settle-wrap .action a:hover {
        cursor: pointer;
    }

    .settle-wrap .action a.reject {
        color: #333;
        border: 1px solid #dfdfdf;
        background: #f8f8f8;
        margin-right: 20px;
    }

    .settle-wrap .action a.accept {
        color: #fff;
        border: 1px solid #e03221;
        background: #ee4434;
    }
</style>
<script scoped>
    var $$qualiModel = require('../../script/data/model/qualification.js');
    module.exports = {
        data: function () {
            return {
                company: '',
                mheight: document.documentElement.clientHeight - 400
            }
        },
        methods: {
            accept: function (type) {
                var _this = this;
                $$qualiModel.accept({
                    accept: type
                }, function (data) {
                    if (data.code === '200') {
                        // window.location.reload();
                        if (type === true || type === 'true') {
                            window.location.reload();
                        } else {
                            _this.$router.push({
                                name: 'qualification_chose'
                            });
                        }

                    } else {
                        alert(data.data.msg);
                        // if (data.code === '407') {
                        //     _this.$router.push('/qualification/wait');
                        //     return
                        // }
                        window.location.reload();
                    }
                });
            }
        },
        beforeMount: function () {
            var companyName = this.$route.query.demander;
            this.company = companyName;
        }
    }
</script>
