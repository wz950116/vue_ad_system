<template>
    <div class="idea-create-new">
        <el-dialog :title="title" v-model="dialogVisible">
            <div class="wrapper" v-loading.body="loading" element-loading-text="数据加载中">
                <h5>广告单元：{{unitName}}</h5>
                <div class="choose-pr-content" v-if="choosePrVisible">
                    <h5 class="choose-title">选择推广内容
                        <el-tooltip class="item" effect="light" :content="helpInfo['选择推广内容']" placement="right">
                            <span class="question-icon"></span>
                        </el-tooltip>
                    </h5>
                    <el-form :inline="true" :model="formData" :rules="rules" ref="ruleForm">
                        <div class="option-line option-gllp" v-if="linkMap.estate === 'true'">
                            <el-radio  size="small" label="estate" class="radio" v-model="supportType">关联楼盘</el-radio>
                            <el-tooltip class="item" effect="light" :content="helpInfo['关联楼盘']" placement="right">
                                  <span class="question-icon"></span>
                            </el-tooltip>
                            <div class="option-content" :class="supportType === 'estate' ? '' : 'hidden'">
                                <el-button class="preview" size="mini" @click="addEstate">添加楼盘</el-button>
                                <el-form-item class="form-item line1" prop="estateId">
                                    <el-select size="mini" v-model="formData.estateId" placeholder="楼盘" filterable>
                                        <el-option :label="item.estateName" :value="item.estateId" v-for="item in relateEstateInfo.estateList"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="form-item luodi">
                                    <el-select size="mini" v-model="relateEstateInfo.pageType" placeholder="落地页">
                                        <el-option label="楼盘详情页" value="0"></el-option>
                                        <el-option label="自定义页面" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="form-item link" prop="link" v-if="relateEstateInfo.pageType === '1'">
                                    <el-input class="form-item" size="mini" v-model="formData.link" placeholder="请输入页面链接"></el-input>
                                </el-form-item>
                                <el-button class="preview" size="mini" @click="preview">点击预览</el-button>
                            </div>
                        </div>
                        <div class="option-line option-gllp" v-if="linkMap.live === 'true'">
                            <el-radio size="small" label="live" class="radio" v-model="supportType">焦点直播</el-radio>
                            <el-tooltip class="item" effect="light" :content="helpInfo['焦点直播']" placement="right">
                                  <span class="question-icon"></span>
                            </el-tooltip>
                            <div class="option-content" :class="supportType === 'live' ? '' : 'hidden'">
                                <el-form-item class="form-item normal-input" prop="liveId">
                                    <el-input class="form-item" size="mini" v-model="formData.liveId" placeholder="请输入直播间ID"></el-input>
                                </el-form-item>
                                <el-button class="preview" size="mini" @click="preview">点击预览</el-button>
                            </div>
                        </div>
                        <div class="option-line option-gllp" v-if="linkMap.news === 'true'">
                            <el-radio size="small" label="news" class="radio" v-model="supportType">文章资讯</el-radio>
                            <el-tooltip class="item" effect="light" :content="helpInfo['文章资讯']" placement="right">
                                  <span class="question-icon"></span>
                            </el-tooltip>
                            <div class="option-content" :class="supportType === 'news' ? '' : 'hidden'">
                                <el-form-item class="form-item normal-input">
                                    <el-input class="form-item" size="mini" v-model="formData.link" placeholder="请输入文章链接"></el-input>
                                </el-form-item>
                                <el-button class="preview" size="mini" @click="preview">点击预览</el-button>
                            </div>
                        </div>
                        <div class="option-line option-gllp" v-if="linkMap.forum === 'true'">
                            <el-radio size="small" label="forum" class="radio" v-model="supportType">论坛帖子</el-radio>
                            <el-tooltip class="item" effect="light" :content="helpInfo['论坛帖子']" placement="right">
                                  <span class="question-icon"></span>
                            </el-tooltip>
                            <div class="option-content" :class="supportType === 'forum' ? '' : 'hidden'">
                                <el-form-item class="form-item normal-input">
                                    <el-input class="form-item" size="mini" v-model="formData.link" placeholder="请输入帖子链接"></el-input>
                                </el-form-item>
                                <el-button class="preview" size="mini" @click="preview">点击预览</el-button>
                            </div>
                        </div>
                        <div class="option-line option-gllp" v-if="linkMap.web === 'true'">
                            <el-radio size="small" label="web" class="radio" v-model="supportType">其他网页</el-radio>
                            <el-tooltip class="item" effect="light" :content="helpInfo['其他网页']" placement="right">
                                  <span class="question-icon"></span>
                            </el-tooltip>
                            <div class="option-content" :class="supportType === 'web' ? '' : 'hidden'">
                                <el-form-item class="form-item normal-input">
                                    <el-input class="form-item" size="mini" v-model="formData.link" placeholder="请输入页面链接" @blur="checkoutUrl"></el-input>
                                </el-form-item>
                                <el-button class="preview" size="mini" @click="preview">点击预览</el-button>
                            </div>
                        </div>
                    </el-form>
                    <h5 class="choose-title" v-if='thirdMonitorStatus != 0'>第三方监测
                        <el-tooltip class="item" effect="light" :content="helpInfo['第三方监测']" placement="right">
                            <span class="question-icon"></span>
                        </el-tooltip>
                    </h5>
                    <el-form 
                        :inline="true" 
                        :model="formData" 
                        :rules="rules" ref="ruleForm"
                        v-if='thirdMonitorStatus != 0'>
                        <div class="option-line option-gllp" v-if='thirdMonitorStatus != 1'>
                            <el-tooltip class="item" effect="light" :content="helpInfo['曝光链接']" placement="right" style='float:left;'>
                                曝光&nbsp;<span class="question-icon"></span>
                            </el-tooltip>
                            <div ref='exposure' class='cloneInp' v-for='(item, index) in monitorExposure'>
                                <el-form-item class="form-item normal-input" v-show='item.input'>
                                    <el-input 
                                        class="form-item" 
                                        size="mini" v-model="item.content" 
                                        placeholder="请输入曝光的第三方检测链接">
                                    </el-input>
                                </el-form-item>
                                <el-button class="preview" size="mini" @click="addExposureMonitor(index)" v-show='item.btn'>+</el-button>
                            </div>
                        </div>
                        <div class="option-line option-gllp" v-if='thirdMonitorStatus != 2'>
                            <el-tooltip class="item" effect="light" :content="helpInfo['点击链接']" placement="right" style='float:left;'>
                                点击&nbsp;<span class="question-icon"></span>
                            </el-tooltip>
                            <div ref='click' class='cloneInp' v-for='(item, index) in monitorClick'>
                                <el-form-item class="form-item normal-input" v-show='item.input'>
                                    <el-input 
                                        class="form-item" 
                                        size="mini" v-model="item.content" 
                                        placeholder="请输入点击的第三方检测链接">
                                    </el-input>
                                </el-form-item>
                                <el-button class="preview" size="mini" @click="addClickMonitor(index)" v-show='item.btn'>+</el-button>
                            </div>
                        </div>
                    </el-form>
                </div>
                <el-form :inline="true" :model="formData" :rules="rules" ref="ruleForm">
                    <div class="upload-idea">
                        <span class="upload-idea-title">上传广告创意
                            <el-tooltip class="item" effect="light" :content="helpInfo['上传广告创意']" placement="right">
                            <span class="question-icon"></span>
                            </el-tooltip>
                        </span>
                        <p class="start-info"><span class="gantan-icon"></span>如果广告使用了明星肖像，并从未上传过相应证明资质，请<el-button @click="uploadQualification" size="mini" type="text">点击上传</el-button></p>
                        <div class="upload-options" v-if="resourceInfo.length > 1">
                            <span class="opt-gr">选择样式
                                <el-tooltip class="item" effect="light" :content="helpInfo['选择样式']" placement="right">
                                    <span class="question-icon"></span>
                                </el-tooltip>
                            </span>
                            <el-radio-group v-model="ideaStyle">
                                <el-radio label="0">左图右文</el-radio>
                                <el-radio label="1" v-if="resourceInfo.length >= 2">组图</el-radio>
                                <el-radio label="2" v-if="resourceInfo.length >= 3">大图</el-radio>
                            </el-radio-group>
                        </div>
                        <div v-if="dialogVisible" class="idea-item-wrapper">
                            <div class="stylewrapper" v-show="ideaStyle === index.toString()" v-for="(item, index) in resourceInfo">
                                <div class="idea-item-w" v-for="innerItem in item.showList">
                                    <h3 class="idea-item-title">
                                        <span>{{innerItem.showName}}</span>
                                        <el-tooltip class="item" effect="light" :content="helpInfo[innerItem.showName] || '请输入相应的文案'" placement="right">
                                            <span class="question-icon"></span>
                                        </el-tooltip>
                                    </h3>
                                    <div class="idea-item-content global-clearfix">
                                        <div class="idea-item" v-for="it in innerItem.posResourceList" v-if="it.type === '0'">
                                            <div class="text-wrapper">
                                                <el-form-item class="text-upload-w" prop="description">
                                                    <el-input type="textarea" placeholder="请输入内容" v-model="it.description"></el-input>
                                                   
                                                </el-form-item>
                                                <span class="words-limit">{{getTextLen(it.description)}}/{{it.descriptionMaxLength}}</span>
                                            </div>
                                        </div>
                                        <div class="idea-item img-upload-wrapper" v-for="(it, ind) in innerItem.posResourceList" v-if="parseInt(it.type) >= 1 && parseInt(it.type) <= 3">
                                            <div :pos-resource-id="it.posResourceId" :group-id="item.groupId" :id="'img' +  it.posResourceId + item.groupId + it.type" class="img-upload-w zutu" v-bind:style="{width: (parseFloat(it.width) > 708 ? 708 : it.width) + 'px', height: (parseFloat(it.width) > 708 ? it.height * (708 / parseFloat(it.width)) : it.height) + 'px'}">
                                                <div class="img-info">
                                                    <p class="img-chicun">{{it.width}}x{{it.height}}</p>
                                                    <p class="img-size">({{(parseInt(it.fileMaxSize) / 1024 / 1024).toFixed(2)}}MB以内)</p>
                                                </div>
                                            </div>
                                            <img :pos-resource-id="it.posResourceId" :group-id="item.groupId" class="upload-img" :src="it.url" alt="">
                                         
                                            <div style="display: none;" class="el-loading-spinner">
                                                <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
                                                <p class="el-loading-text">上传中</p>
                                            </div>
                                        </div>
                                        <template v-for="(it, ind) in innerItem.posResourceList" v-if="parseInt(it.type) >= 4 && parseInt(it.type) <= 6">
                                            <div class="idea-item img-upload-wrapper">
                                                <div :pos-resource-id="it.posResourceId" :group-id="item.groupId" :id="'img' + it.posResourceId + item.groupId + it.type" class="img-upload-w zutu" v-bind:style="{width: (parseFloat(it.width) > 708 ? 708 : it.width) + 'px', height: (parseFloat(it.width) > 708 ? it.height * (708 / parseFloat(it.width)) : it.height) + 'px'}">
                                                    <div class="img-info">
                                                        <p class="img-chicun">{{it.width}}x{{it.height}}</p>
                                                        <p class="img-size">({{(parseInt(it.fileMaxSize) / 1024 / 1024).toFixed(2)}}MB以内)</p>
                                                    </div>
                                                </div>
                                                <img :pos-resource-id="it.posResourceId" :group-id="item.groupId" class="upload-img" :src="it.url" alt="">
                                               
                                                <div style="display: none;" class="el-loading-spinner">
                                                    <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
                                                    <p class="el-loading-text">上传中</p>
                                                </div>
                                            </div>
                                            <div class="idea-item">
                                                <div class="text-wrapper">
                                                    <el-form-item class="text-upload-w" prop="description">
                                                        <el-input type="textarea"  v-model="it.description" placeholder="请输入内容"></el-input>
                                                    </el-form-item>
                                                    <span class="words-limit">{{getTextLen(it.description)}}/{{it.descriptionMaxLength}}</span>
                                                </div>
                                            </div>
                                        </template>
                                        <div class="idea-item img-upload-wrapper" v-for="(it, ind) in innerItem.posResourceList" v-if="it.type === '7'">
                                            <div :type="it.type" :pos-resource-id="it.posResourceId" :group-id="item.groupId" :id="'img' +  it.posResourceId + item.groupId + it.type" class="img-upload-w zutu" v-bind:style="{width: (parseFloat(it.width) > 708 ? 708 : it.width) + 'px', height: (parseFloat(it.width) > 708 ? it.height * (708 / parseFloat(it.width)) : it.height) + 'px'}">
                                                <div class="img-info">
                                                    <p class="img-chicun">{{it.width}}x{{it.height}}</p>
                                                    <p class="img-size">({{(parseInt(it.fileMaxSize) / 1024 / 1024).toFixed(2)}}MB以内)</p>
                                                </div>
                                            </div>
                                            <div style="display: none;" class="video-wrapper"><span>视频链接：</span><a class="video-link" href="#" target="_blank"></a></div>
                                            <div style="display: none;" class="el-loading-spinner">
                                                <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
                                                <p class="el-loading-text">上传中</p>
                                            </div>
                                        </div>
                                        <div v-for="(it, ind) in innerItem.posResourceList" v-if="it.type === '9'" class="idea-item">
                                            <div class="idea-item-c" v-for="(textItem, textInd) in it.list">
                                                <span class="idea-item-text">{{textInd + 1}}</span>
                                                <el-form-item class="form-item">
                                                    <el-input class="form-item" size="mini" v-model="textItem.name" placeholder="请输入楼盘名称"></el-input>
                                                </el-form-item>
                                                <el-form-item class="form-item deal-price-input">
                                                    <el-input class="form-item" size="mini" v-model="textItem.dealPrice" placeholder="请输入成交价格"></el-input>
                                                </el-form-item>
                                                <span class="deal-unit">元/㎡</span>
                                                <el-form-item class="form-item deal-price-input">
                                                     <el-input class="form-item" size="mini" v-model="textItem.dealNum" placeholder="请输入套数"></el-input>
                                                </el-form-item>
                                                <span class="deal-unit">套</span>
                                                <el-form-item class="form-item deal-link-input">
                                                    <el-input class="form-item" size="mini" v-model="textItem.link" placeholder="请输入链接"></el-input>
                                                </el-form-item>
                                            </div>
                                        </div>
                                        <div v-for="(it, ind) in innerItem.posResourceList" v-if="it.type === '11'" class="idea-item">
                                            <div class="idea-item-c">
                                                <el-form-item class="form-item">
                                                    <el-input class="form-item" size="mini" v-model="it.description" placeholder="请输入一段内容"></el-input>
                                                </el-form-item>
                                                <el-form-item class="form-item deal-hq-input">
                                                    <el-input class="form-item" size="mini" v-model="it.num1" placeholder="请输入成交量"></el-input>
                                                </el-form-item>
                                                <span class="deal-unit">套</span>
                                                <el-form-item class="form-item deal-hq-input">
                                                    <el-input class="form-item" size="mini" v-model="it.num2" placeholder="请输入均价"></el-input>
                                                </el-form-item>
                                                <span class="deal-unit">元</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form>
                <div class="btn-gr global-clearfix">
                    <div class="btn-gr-left">
                        <el-button size="large" @click="dialogVisible = false">取消</el-button>
                    </div>
                    <div class="btn-gr-right">
                        <!-- <el-button size="large">预览</el-button> -->
                        <el-button v-show="!isEdit" @click="save" size="large" type="primary">确定</el-button>
                        <el-button v-show="isEdit" @click="save" size="large" type="primary">修改</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
    </div>
</template>
<style scoped src="./style.css"></style>
<style src="./element-patch.css"></style>
<script src="./main.js"></script>