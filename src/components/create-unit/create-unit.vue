<template>
    <div class="root" v-show="display">
        <div class="wrap">
            <div class="list-outwrap">
                <div class="list" v-for="item in data.list">
                    <div class="left">
                        <a :href="item.viewInPage" target="_blank">
                        <div class="img-wrap">
                            <img class="img" :src="item.imgUrl"/>
                            <p class="img-line">在网页中查看</p>
                        </div>
                        </a>
                    </div>
                    <div class="center">
                        <div class="c-p-wrap">
                            <p class="c-p-line1 p">广告单元ID: {{item.id}}&nbsp<span v-for="i in item.type">{{i}}&nbsp<span></p>
                            <p class="c-p-line2 p">广告名称: {{item.name}} </p>
                            <p class="c-p-line3 p" :title="showTitle(item.standard)">创意规格: <span v-for="i in item.standard">{{i}}&nbsp<span></p>
                            <p class="c-p-line4 p">素材要求: {{item.requirement}}</p>
                        </div>
                    </div>
                    <div class="right">
                        <div class="r-p-wrap">
                            <p class="r-p-line1 p" :title="dateTitle(item.dateList)">推广日期: {{item.promotionDate}}</p>
                            <p class="r-p-line2 p">结算方式: {{item.accountWap}}</p>
                            <p class="r-p-line3 p">单价: {{item.price | moneyFormat}}</p>
                            <p class="r-p-line4 p">总价: {{item.totalPrice | moneyFormat}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var $$ad = require('../../script/data/model/ad.js');
    module.exports = {
        data: function () {
            return {
                display: true,
                data: {
                    list: []
                }
            }
        },
        methods: {
            pushList: function (list) {
                this.data.list = list;
            },
            dateTitle: function (date) {
                var title = date[0];
                if (date.length > 1){
                    for (var i=1; i<date.length; i++) {
                        title += '\n' + date[i];
                    }
                    return title;
                }
            },
            showTitle: function (item) {
                return item.join('\n');
            }
        },
        filters: {
            moneyFormat: function (money) {
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
        },
        beforeMount: function () {
            var that = this;
            $$ad.on('createAdUnit', function (res) {
                if (res.code === '200') {
                    that.pushList(res.data.list);
                }
            });
        },
        mounted: function () {
            var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if (this.$parent.name === 'create') {
                this.$el.style.height = (winHeight - 296) + 'px';
            } else {
                this.$el.style.height = (winHeight - 446) + 'px';
            }
        }
    };
</script>
<style scoped>
.root {
    width: 100%;
    overflow-y: scroll;
}
.wrap {
    background-color: #F5F6F7;
    overflow-y: scroll;
    display: block;
    width: 100%;
}
.wrap .list-outwrap {
    padding-top: 20px;
    padding-left: 20px;
}
.wrap .list-outwrap-pd {
    padding-bottom: 20px;
}
.wrap .list-outwrap .list {
    margin-top: 20px;
    background-color: #FFF;
    border: solid 1px #DDD;
    min-height: 242px;
}
.wrap .list-outwrap .list:first-child {
    margin-top: 0;
}
.wrap .list-outwrap .list-md {
}
.wrap .list-outwrap .list .left {
    display: inline-block;
    padding: 20px 39px;
    float: left;
}
.wrap .list-outwrap .list .center {
    display: inline-block;
    padding: 20px 0;
    width: 400px;
}
.wrap .list-outwrap .list .right {
    display: inline-block;
    padding: 40px 0;
    float: right;
}
/**left**/
.wrap .list-outwrap .list .left .img-wrap {
    position: relative;
    cursor: pointer;
    height: 200px;
    width: 180px;
}
.wrap .list-outwrap .list .left .img-wrap .img {
    height: 200px;
    width: 180px;
}
.wrap .list-outwrap .list .left .img-wrap .img-line {
    background-color: #000;
    position: absolute;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    color: white;
    opacity: 0.8;
    width: 180px;
    height: 28px;
    bottom: 0;
}
/**center**/
.wrap .list-outwrap .list .center .c-p-wrap {
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    overflow-x: hidden;
    height: 200px;
}
.wrap .list-outwrap .list .center .c-p-wrap .p{
    line-height: 14px;
    font-size: 14px;
    color: #333;
    width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.wrap .list-outwrap .list .center .c-p-wrap .c-p-line1{
    margin: 31px 0 29px 0;
}
.wrap .list-outwrap .list .center .c-p-wrap .c-p-line2{
    margin: 0 0 26px 0;
}
.wrap .list-outwrap .list .center .c-p-wrap .c-p-line3{
    margin: 0 0 26px 0;
}

/***right***/
.wrap .list-outwrap .list .right .r-p-wrap {
    border-left: dashed 1px #C9C9C9;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    overflow-x: hidden;
    height: 160px;
    width: 290px;
}
.wrap .list-outwrap .list .right .r-p-wrap .p{
    line-height: 14px;
    font-size: 14px;
    color: #333;
}
.wrap .list-outwrap .list .right .r-p-wrap .r-p-line1 {
    margin: 8px 0 24px 29px;
}
.wrap .list-outwrap .list .right .r-p-wrap .r-p-line2 {
    margin: 0px 0 26px 29px;
}
.wrap .list-outwrap .list .right .r-p-wrap .r-p-line3 {
    margin: 0px 0 32px 29px;
}
.wrap .list-outwrap .list .right .r-p-wrap .r-p-line4 {
    margin: 0px 0 0px 29px;
}
</style>
