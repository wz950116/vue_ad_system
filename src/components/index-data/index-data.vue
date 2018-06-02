<template>
<div class="index-data">
<ul>
    <li>
        <div class="data-num red">{{ data.expose_count }}</div>
        <div class="data-txt">曝光量</div>
    </li>
    <li>
        <div class="data-num green">{{ data.click_count }}</div>
        <div class="data-txt">点击量</div>
    </li>
    <li>
        <div class="data-num blue">{{ data.click_rate }}</div>
        <div class="data-txt">点击率</div>
    </li>
    <li>
        <div class="data-num yellow" v-if = "data.average_pay == '-'">{{ data.average_pay }}</div>
        <div class="data-num yellow" v-else>{{ data.average_pay | moneyFormat }}</div>
        <div class="data-txt">平均点击单价</div>
    </li>
    <li class="last">
        <div class="data-num yellow" v-if = "data.average_show_pay == '-'">{{ data.average_show_pay }}</div>
        <div class="data-num yellow" v-else>{{ data.average_show_pay | moneyFormat }}</div>
        <div class="data-txt">平均千次展示费用</div>
    </li>
</ul>
</div>
</template>
<style scoped>
    .index-data{
        width:100%;
        height:80px;
        border: 1px solid #EEEEEE;
        background:#fff;
        border-radius:2px;
        margin-bottom:20px;
    }
    .index-data li{
        float:left;
        width:18.5%;
        height:60px;
        border-right:1px solid #eee;
        margin:10px 0 10px 15px;
    }
    .index-data li:last-child {
        width: auto;
    }
    .data-num{
        font-size: 24px;
        margin-bottom:12px;
    }
    .red{
        color: #FF613E;
    }
    .green{
        color:#28B779;
    }
    .blue{
        color:#4990E2;
    }
    .yellow{
        color:#FFB848;
    }
    .data-txt{
        font-size: 14px;
        color: #666666;
    }
    .index-data .last{
        border-right:none;
    }
</style>
<script>
    module.exports = {
        props: ['data'],
        data: function () {
            return {};
        },
        filters: {
            moneyFormat: function (money) {
                if (typeof money === 'number') money = money.toString();
                if (/[^0-9\.]/.test(money)) return '￥0.00';
                money = money.replace(/^(\d*)$/, "$1.");
                money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
                money = money.replace(".", ",");
                var re = /(\d)(\d{3},)/;
                while (re.test(money)) {
                    money = money.replace(re, "$1,$2");
                }
                money = money.replace(/,(\d\d)$/, ".$1");
                return '￥' + money.replace(/^\./, "0.");
            }
        }
    };
</script>
