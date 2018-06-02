<template>
    <div ref="create-resource" class="create-resource" v-show="display">
        <div class="resource-wrap">
            <div class="resource-nav">
                <!-- 城市 -->
                <div class="nav-item city" @click="city.isShow = !city.isShow">
                    <div class="item-info" ref="filterCity">
                        {{city.current === '' ? 城市 : city.currentName}}
                    </div>
                    <ul class="item-list cityList">
                        <div class="cityList-top">
                            <a @click="queryCityAreaFn($event)" href="javascript:void(0);" v-for="item in words">{{item}}</a>
                        </div>
                        <div class="cityList-content" ref="cityList">
                            <div class="cityArea-item" v-for="(item, index) in city.list">
                                <div class="cityArea-head">{{item.prefix.split('').join(' - ')}}</div>
                                <div class="list">
                                    <ul>
                                        <li class="c-item" v-for="(sitem, index) in item.city" :key="index" @click="selectSFilterFn('city', $event, sitem.cityId)"><a href="javascript:;" :data-id="sitem.cityId">{{sitem.name}}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </ul>
                </div>
                <!-- 平台 -->
                <div class="nav-item" @click="pingt.isShow = !pingt.isShow">
                    <div class="item-info" ref="filterPingt">
                        {{pingt.current === '' ? 平台 : pingt.currentName}}
                    </div>
                    <ul class="item-list">
                        <li class="item" v-for="(item,index) in pingt.list" :data-id="item.platformId" :key="index" @click="selectSFilterFn('pingt', $event, item.id)">{{item.name}}</li>
                    </ul>
                </div>
                <!-- 一级栏目 -->
                <div class="nav-item" @click="lm.isShow = !lm.isShow">
                    <div class="item-info" ref="filterLm">
                        {{lm.current === '' ? 一级栏目 : lm.currentName}}
                    </div>
                    <ul class="item-list">
                        <li class="item" v-for="(item,index) in lm.list" :data-id="item.oneLevelId" :key="index" @click="selectSFilterFn('lm', $event, item.id)">{{item.name}}</li>
                    </ul>
                </div>
                <!-- 二级栏目 -->
                <div class="nav-item erji multiple" @click="lmSec.isShow = !lmSec.isShow">
                    <div class="item-info">
                        二级栏目
                    </div>
                    <ul class="item-list" ref='lmSecList'>
                        <li class="item" v-for="(item,index) in lmSec.list" :data-id="item.twoLevelId" :key="index" @click.stop="selectMFilterFn('lmSec', $event, item.id)"><em class="checkbox"></em>{{item.name}}</li>
                    </ul>
                </div>
                <!-- 屏次 -->
                <div class="nav-item pingc multiple" @click="pc.isShow = !pc.isShow">
                    <div class="item-info" ref="filterPc">屏次</div>
                    <ul class="item-list" ref="pcList">
                        <li class="item" v-for="(item,index) in pc.list" :data-id="item.screenIndexId" :key="index" @click.stop="selectMFilterFn('pc', $event, item.id)"><em class="checkbox"></em>{{item.name}}</li>
                    </ul>
                </div>
                <!-- 日期 -->
                <el-date-picker :picker-options="pickerOptions0" v-model="dateRangeForView" type="daterange" format="yyyyMMdd" :placeholder="adPeriod.startTime+'-'+adPeriod.endTime" style="width: 182px; margin-right: 10px; float: left;"></el-date-picker>
                <!-- <div class="nav-item calendar">
                    选择日期范围
                </div> -->
                <div class="nav-item s-calendar">
                    <em :class="['checkbox', {active: filterState.onlyAvailable}]" @click="querySelectDateFn"></em>只看所选日期可预订广告位
                </div>
            </div>

            <div class="resource-main">
                <div class="main-header">
                    <div class="item zyid">资源ID</div>
                    <div class="item adname">广告位名称</div>
                    <div class="item bgl" @click="bglSortFn">平均曝光量
                        <div class="sort">
                            <em :class="['up', {active: sort.bgl.up}]"></em>
                            <em :class="['down', {active: sort.bgl.down}]"></em>
                        </div>
                    </div>
                    <div class="item price" @click="priceSortFn">价格(元/天)
                        <div class="sort">
                            <em :class="['up', {active: sort.price.up}]"></em>
                            <em :class="['down', {active: sort.price.down}]"></em>
                        </div>
                    </div>
                    <div class="item state">广告位状态({{adPeriod.startTime}}-{{adPeriod.endTime}})
                        <div class="use-state">
                            <div class="box unused active">
                                <em class="checkbox"></em>未占用
                            </div>
                            <div class="box used">
                                <em class="checkbox"></em>已占用
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="main-list" ref="mainList">
                    <li class="resource-item" v-for="(item, index) in resourceList">
                        <div class="resource-line" @click="showItemDetailFn(index)">
                            <div class="item zyid">{{item.id}}</div>
                            <div :title="item.name" class="item adname" :class="{'hot-resource': item.isHot === '1'}">
                                {{item.name}}
                                <span class='hot-img'></span>
                            </div>
                            <div class="item bgl">{{item.exposure}}</div>
                            <div class="item price">{{item.price | moneyFormat}}</div>
                            <div class="item state">
                                <div class="state-box">
                                    <div class="unuse-line" v-for="(sitem,index) in item.status" v-if="sitem.available === 'true'" :style="{width: sitem.width + 'px', left: sitem.left + 'px'}">
                                        <template v-if="sitem.dStart === sitem.dEnd">
                                            <div class="tag center">{{sitem.dStart}}<i class="arrow"></i></div>
                                        </template>
                                        <template v-else>
                                            <div class="tag left">{{sitem.dStart}}<i class="arrow"></i></div>
                                            <div v-if="sitem.width > 45" class="tag right">{{sitem.dEnd}}<i class="arrow"></i></div>
                                            <div v-else class="tag right-up">{{sitem.dEnd}}<i class="arrow arrow-down"></i></div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div :class="['item', 'show', {active: item.isShow}]" >
                                <div class="arrow"></div>
                            </div>
                        </div>
                        <div class="resource-detail" v-if="item.isShow" :id="item.name">
                            <div class="box-l">
                                <div class="img-box">
                                    <img :src="item.details.imgUrl" alt="" />
                                    <a class="loupe" :href="item.details.largeUrl" target="_blank"></a>
                                    <a class="text" target="_blank" :href="item.details.viewInPage">在网页中查看</a>
                                    <!-- <p class="img-size">{{item.width}}px × {{item.height}}px</p> -->
                                </div>
                                <div class="info-box">
                                    <table class="table">
                                        <tr>
                                            <th class="name">资源ID：</th>
                                            <th>
                                                <div class="content" :title="item.details.id + item.details.type.join(' · ')">
                                                    {{item.details.id}} · {{item.details.type.join(' · ')}}
                                                </div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <td class="name">广告形式：</td>
                                            <td>{{item.details.adWay}}</td>
                                        </tr>
                                        <tr>
                                            <td class="name">创意规格：</td>
                                            <td>
                                                <p class="idea-size" :title="showTitle(item.details.standard)">
                                                    <span class="module-span1" v-for="i in item.details.standard">{{i}}</span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="name">素材要求：</td>
                                            <td>{{item.details.requirement}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <div class="box-r">
                                <p>选择日期</p>
                                <calendar 
                                    style="padding-bottom: 17px;"
                                    v-on:pricedaterange="getRange"
                                    :price="item.details.allocList">
                                </calendar>
                                <p style="padding-bottom: 16px;">
                                    已选择
                                    <em class="hot">
                                        {{dateRangeCount}}
                                    </em> 
                                    天，共
                                    <em class="hot">
                                        {{priceTotal | moneyFormat}}
                                    </em>
                                    元
                                </p>
                                <p style="padding-bottom: 20px;" @click="modifyAdNameFn($event)">广告单元名称：
                                    <input 
                                        class="adNameInput" 
                                        type="text" 
                                        v-model="item.details.name" 
                                        @focus="modifyAdNameFocusFn($event)">
                                </p>
                                <p>
                                    <span class="submit-btn" @click="chooseAdFn(index, $event)">确认</span>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<script src="./main.js"></script>
<style src="./style.css" scoped></style>
