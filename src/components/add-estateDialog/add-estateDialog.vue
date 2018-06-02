<template>
    <div>
        <div class="addEstate-Wrap" :class="{showDialog:showDialog}">
        </div>
        <div class="dalog-wrap" :class="{showDialog:showDialog}">
            <div class="addEstate-header">
                <span class="header-text">添加楼盘</span>
                <span v-if="isWhite === '0'" class="chooseEstate">选择楼盘</span>
                <span v-if="isWhite === '0'" class="addInfo" :class="{'font-red':addInfo}">补齐资料</span>
                <span v-if="isWhite === '0'" class="waitCheck" :class="{'font-red':waitCheck}">等待审核</span>
                <div v-if="isWhite === '0'" class="step">
                    <span :class="{ stepLineOne : stepLine.stepLineOne, stepLineTwo : stepLine.stepLineTwo, stepLineThree : stepLine.stepLineThree }"></span>
                    <em v-for="(item, index) in stepMark" :class="{ stepMarkOneSmall : item.stepMarkOneSmall,stepMarkOneBig : item.stepMarkOneBig,stepMarkTwoSmall : item.stepMarkTwoSmall,
                        stepMarkTwoGrey : item.stepMarkTwoGrey,stepMarkTwoBig : item.stepMarkTwoBig,stepMarkThree : item.stepMarkThree,stepMarkThreeGrey : item.stepMarkThreeGrey}"></em>
                </div>
            </div>
            <div class="addEstate-content">
                <div class="select" :class="{ hide: hide.firstStep }">
                    <selecter v-on:change="handleProvinceChangeSearch(arguments[0])" :options="provinceOptions"
                              class="slectStyle m-l-123" ref="provinceChangeSearch"/>
                    <selecter v-on:change="handleCityChangeSearch(arguments[0])" :options="cityOptionsSearch"
                              class="slectStyle"/>
                    <input class="search" placeholder="请输入楼盘名称" v-model="inputedEstate"></input>
                    <span class="buttonSearch" @click="estateSearch">搜索</span>
                </div>
                <div class="list-wrap" :class="{ hide: hide.firstStep }">
                    <ul>
                        <li v-if="isWhite === '0'" class="list" :class="{ hide: fixSearchEstateStyle }">
                            <em class="redio" @click="redioSelect(-1)" :class="{redioSelect:findEstate}"></em>
                            <div class="list-right p-30">
                                <div class="estateName m-b-0">
                                    <span>没有找到您想要的楼盘请选择此项</span>
                                </div>
                            </div>
                        </li>
                        <li class="list" v-for="(item,index) in searchResult">
                            <em class="redio" @click="redioSelect(index)" :class="{redioSelect:item.redio}"></em>
                            <div class="list-right">
                                <div class="estateName">
                                    <span class="estateNameText" :title="item.name">{{item.name}}</span>
                                    <span class="estateTag" :title="item.tag">{{item.tag}}</span>
                                </div>
                                <div class="estateAddress">{{item.address}}</div>
                            </div>
                        </li>
                    </ul>
                    <div class="t-align-c" :class="{ hide: searchEstateStyle }">
                        <span class="prev" @click="pageHandle('prev')">上一页</span>
                        <span class="page" @click="pageHandle('first')"
                              :class="{pageOn:page.pagefirst.active,pageHide:page.pagefirst.hide}">{{page.pagefirst.pagenum}}</span>
                        <span class="page" @click="pageHandle('second')"
                              :class="{pageOn:page.pagesecond.active,pageHide:page.pagesecond.hide}">{{page.pagesecond.pagenum}}</span>
                        <span class="page" @click="pageHandle('third')"
                              :class="{pageOn:page.pagethird.active,pageHide:page.pagethird.hide}">{{page.pagethird.pagenum}}</span>
                        <span class="next" @click="pageHandle('next')">下一页</span>
                        <span class="totalPage">共{{totalPages}}页</span>
                    </div>
                </div>
                <div class="form" :class="{ hide:hide.secondStepFind }">
                    <div class="formLine">
                        <em class="required">* </em>
                        <span class="inputLabel">楼盘名称:</span>
                        <input class="inputText w-283" placeholder="请输入楼盘名称" v-model="estateName"></input>
                    </div>
                    <p class="lenTip">当前已输入{{estateNameLen}}个字，您还可以输入{{maxLen - estateNameLen}}个字。</p>
                    <div class="formLine m-t-25">
                        <em class="required">* </em>
                        <span class="inputLabel">楼盘地址:</span>
                        <selecter v-on:change="handleProvinceChange(arguments[0])" :defaultIndex="0"
                                  :options="provinceOptions" class="formSelect"/>
                        <selecter v-on:change="handleCityChange(arguments[0])" :defaultIndex="0" :options="cityOptions"
                                  class="formSelect"/>
                        <selecter v-on:change="handleXianChange(arguments[0])" :defaultIndex="0" :options="xianOptions"
                                  class="formSelect" style="margin-right:20px; "/>
                        <selecters v-on:change="handleBusinessChange(arguments[0])" title="商圈"
                                   :options="businessOptions" :numShow="businessNumShow" class="multiSelect"/>
                    </div>
                    <p>
                        <input class="inputText w-488" placeholder="请输入详细地址" v-model="detailAddress"></input>
                    </p>
                    <div class="m-t-25">
                        <em class="required v-t">* </em>
                        <span class="inputLabel v-t">物业类型:</span>
                        <div class="propertyContent">
                            <div class="propertyTag" v-for="(item, index) in propertyTags">
                                <em class="propertyTagRedio" @click="propertyTagRedio(index)"
                                    :class="{propertyTagRedioSelect:item.propertyTagRedioSelect}"></em>
                                <span class="propertyTagText">{{item.label}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="addQulification" :class="{ hide:hide.secondStepNoFind }">
                    <em class="required">* </em>
                    <span class="inputLabel l-h-42">资质证明:</span>
                    <div class="qulification">
                        <img :src="imgUrl" class="qulification-img" v-bind:style="{filter: 'blur('+filterSize+'px)'}">
                        <div class="m-l-20">
                            <p class="qulification-img-tip">
                                请上传与该楼盘相关的资质证明扫描件，作为审核时的重要参考依据。支持jpeg、png、jpg格式，大小为50K-2.5M。</p>
                            <a id="selectFiles2" href="javascript:;" class="qulification-upload" style=""></a>
                        </div>
                        <el-progress class="upload-progress" type="circle" :percentage="imgProgress" width="80" v-if="imgUploading"></el-progress>
                    </div>
                </div>
                <div :class="{ hide: hide.thirdStep }">
                    <span v-if="isWhite === '0'" class="waitCheckTips">请耐心等待系统审核，审核结果将在1-2个工作日内通知您。</span>
                    <span v-else class="waitCheckTips">您已经成功添加楼盘</span>
                </div>
            </div>
            <div class="addEstate-footer">
                <div class="cancel" @click="cancel">取消</div>
                <div @click="next" class="bg-red" :class="{'bg-grey':nextBg}">{{stepText}}</div>
            </div>
            <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        </div>
    </div>
</template>
<style scoped src="./style.css"></style>
<script src="./main.js"></script>