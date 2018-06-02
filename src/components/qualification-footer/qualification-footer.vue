<template>
    <div class="footer">
        <p class="footer-para link">
            <a href="mailto:realbjhouse@sohu.com" target="_blank">欢迎来信</a>
            <a href="//house.focus.cn/aboutus/mianzeshengming.html" target="_blank">免责声明</a>
            <a href="//house.focus.cn/aboutus/xinfangguanggao.html" target="_blank">广告服务</a>
            <a href="//house.focus.cn/aboutus/xinfanglianxi.html" target="_blank">联系我们</a>
            <a href="//house.focus.cn/jiameng/juejin.php" target="_blank">加盟合作</a>
        </p>
        <p class="footer-para banquan">
            Copyright © 2014 Sohu.com Inc. All Rights Reserved. 搜狐公司 版权所有
        </p>
        <div class="footer-para">
            <p>增值电信业务经营许可证B2-20040144 京ICP证030367号</p>
            <p>互联网新闻信息服务许可证  信息网络传播视听节目许可证</p>
            <p>网络文化经营许可证 文网文 [2011] 0694-244号</p>
        </div>
    </div>
</template>

<style scoped>
    .footer{
        position: absolute;
        width: 100%;
        padding: 20px 0 5px;
        background: #444;
    }
    .footer-para{
        text-align: center;
        margin-bottom:15px;
    }
    .footer-para.link a{
        color: #777;
        font-size: 12px;
    }
    .footer-para.link a:after{
        content:'|';
        display: inline-block;
        padding:0 10px;
    }
    .footer-para.banquan{
        padding-bottom:15px;
        color: #777;
        font-size: 12px;
    }
    .footer-para:last-child{
        margin-bottom: 0;
        color:#999;
        font-size:12px;
        text-align: center;
    }
    .footer-para:last-child p{
        padding-bottom:15px;
    }
</style>