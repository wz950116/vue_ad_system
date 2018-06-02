<template>
    <div class="authorityWrap">
        <alert v-show="alert.show" :message="alert.message" :status="alert.status"></alert>
        <div class="firstRow">
            <div class="header">
                <span class="headerText">添加协助者</span>
            </div>
            <div class="addContent">
                <div class="m-b-28">
                    <span class="label">协助者手机</span>
                    <input class="tel" v-model="tel"></input>
                    <span class="error">{{telError}}</span>
                </div>
                <div class="m-b-28">
                    <span class="label">协助者角色</span>
                    <!-- <span class="redio"><em :class="{'redioBg':true,'redioSelected':abserver,'redioNoSelected':!abserver}" @click="selected('abserver')"></em>观察者</span> -->
                    <span class="redio"><em :class="{'redioBg':true,'redioSelected':handler,'redioNoSelected':!handler}" @click="selected('handler')"></em>操作者</span>
                    <span class="redio m-r-0"><em :class="{'redioBg':true,'redioSelected':treasurer,'redioNoSelected':!treasurer}" @click="selected('treasurer')"></em>财务员</span>
                    <span class="error">{{redioError}}</span>
                </div>
                <div class="addConfirm" @click="addConfirm">确定</div>
            </div>
        </div>
        <div class="firstRow m-l-25">
            <div class="header">
                <span class="headerText">添加协助者流程</span>
            </div>
            <div class="addContent">
                <img src="./images/collaborator.png">
            </div>
        </div>
        <div class="clear"></div>
        <div>
            <div class="m-b-20">
                <span class="redio"><em :class="{'redioBg':true,'redioSelected':visiting,'redioNoSelected':!visiting}" @click="selected('visiting')"></em>邀请中的协助者</span>
                <span class="redio"><em :class="{'redioBg':true,'redioSelected':added,'redioNoSelected':!added}" @click="selected('added')"></em>已添加的协助者</span>
            </div>
            <ul class="listLabelWrap">
                <li class="listLabel">协助者id</li>
                <li class="listLabel">协助者手机</li>
                <li class="listLabel">协助者角色</li>
                <li class="listLabel">操作</li>
            </ul>
            <ul class="listWrap" v-for="item in list">
                <li class="list">{{item.number}}</li>
                <li class="list">{{item.info}}</li>
                <li class="list">{{item.role}}</li>
                <li class="list">
                    <span class="handle" v-show="item.status !=0" @click="submitHandle(item.status,item.number)">{{item.statusText}}</span> <span v-show="item.status ===0">{{item.statusText}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped src="./style.css"></style>
<script src="./main.js"></script>