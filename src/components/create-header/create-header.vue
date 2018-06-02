<template>
    <div class="root">
        <div class="wrap">
            <div class="tab-wrap">
                <div class="logo-name">新建广告</div>
                <div class="tab1 tab orange" v-if="status >= 1">选择推广计划</div>
                <div class="tab1 tab gray" v-if="status < 1">选择推广计划</div>
                <div class="tab2 tab orange" v-if="status >= 2">选择广告资源</div>
                <div class="tab2 tab gray" v-if="status < 2">选择广告资源</div>
                <div class="tab3 tab orange" v-if="status >= 3">创建广告单元</div>
                <div class="tab3 tab gray" v-if="status < 3">创建广告单元</div>
                <div class="tab4 tab orange" v-if="status >= 4">完成</div>
                <div class="tab4 tab gray" v-if="status < 4">完成</div>
            </div>
            <div class="line-wrap">
                <div class="line line1 orange" v-if="status >= 1"></div>
                <div class="line line1 gray" v-if="status < 1"></div>
                <div class="line line2 orange" v-if="status >= 2"></div>
                <div class="line line2 gray" v-if="status < 2"></div>
                <div class="line line3 orange" v-if="status >= 3"></div>
                <div class="line line3 gray" v-if="status < 3"></div>
                <div class="line line4 orange" v-if="status >= 4"></div>
                <div class="line line4 gray" v-if="status < 4"></div>
                <div class="line line5 orange" v-if="status >= 5"></div>
                <div class="line line5 gray" v-if="status < 5"></div>
                <div class="circle circle1 small gray" v-if="status < 1">1</div>
                <div class="circle circle1 big orange" v-if="status == 1">1</div>
                <div class="circle circle1 small orange" v-if="status > 1">1</div>
                <div class="circle circle2 small gray" v-if="status < 2">2</div>
                <div class="circle circle2 big orange" v-if="status == 2">2</div>
                <div class="circle circle2 small orange" v-if="status > 2">2</div>
                <div class="circle circle3 small gray" v-if="status < 3">3</div>
                <div class="circle circle3 big orange" v-if="status == 3">3</div>
                <div class="circle circle3 small orange" v-if="status > 3">3</div>
                <div class="circle circle4 small gray" v-if="status < 4">4</div>
                <div class="circle circle4 big orange" v-if="status == 4">4</div>
                <div class="circle circle4 small orange" v-if="status > 4">4</div>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        props: ['status'],
        data: function () {
            return {
            }
        },
        methods: {
        },
        beforeMount: function () {
        }
    };
</script>
<style scoped>
.wrap {
    background-color: #FFF;
    display: block;
    width: 1000px;
}
.wrap .tab-wrap {
    border-top: solid 1px #DDD;
    border-left: solid 1px #DDD;
    white-space: nowrap;
    position: relative;
    height: 57px;
}
.wrap .tab-wrap .logo-name {
    font-weight: bolder;
    position: absolute;
    font-size: 22px;
    left: 18px;
    top: 18px;
}
.wrap .tab-wrap .tab {
    display: inline-block;
    padding-bottom: 21px;
    font-weight: bolder;
    text-align: center;
    padding-top: 22px;
    line-height: 14px;
    font-size: 14px;
    width: 136px;
    float: left;
}
.wrap .tab-wrap .gray {
    color: #808080;
}
.wrap .tab-wrap .orange {
    color: #FC634D;
}
.wrap .tab-wrap .tab1 {
    margin-left: 219px;
}
.wrap .tab-wrap .tab2 {

}

.wrap .line-wrap {
    white-space: nowrap;
    position: relative;
}
.wrap .line-wrap .line {
    background-color: #F5F6F7;
    border-top: solid 2px;
    display: inline-block;
    float: left;
}
.wrap .line-wrap .gray {
    border-color: #CCC;
}
.wrap .line-wrap .orange {
    color: #FC634D;
}
.wrap .line-wrap .line1 {
    width: 288px;
}
.wrap .line-wrap .line2 {
    width: 136px;
}
.wrap .line-wrap .line3 {
    width: 136px;
}
.wrap .line-wrap .line4 {
    width: 136px;
}
.wrap .line-wrap .line5 {
    width: 304px;
}


.wrap .line-wrap .circle {
    background-color: #FFF;
    position: absolute;
    text-align: center;
}
.wrap .line-wrap .small {
    border-radius: 50%;
    border: solid 2px;
    margin-left: -8px;
    line-height: 12px;
    height: 12px;
    width: 12px;
    top: -8px;
}
.wrap .line-wrap .big {
    border-radius: 50%;
    margin-left: -10px;
    border: solid 2px;
    line-height: 16px;
    height: 16px;
    width: 16px;
    top: -10px;
}
.wrap .line-wrap .orange {
    border-color: #FC634D;
    color: #FC634D;
}
.wrap .line-wrap .gray {
    border-color: #CCC;
    color: #CCC;
}
.wrap .line-wrap .circle1 {
    left: 288px;
}
.wrap .line-wrap .circle2 {
    left: 424px;
}
.wrap .line-wrap .circle3 {
    left: 560px;
}
.wrap .line-wrap .circle4 {
    left: 696px;
}
</style>