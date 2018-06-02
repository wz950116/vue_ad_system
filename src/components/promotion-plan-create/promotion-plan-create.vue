<template>
    <div class="layer">
        <div class="layer-box">
            <div class="header">{{ action === 'create' ? '新建' : '编辑' }}推广计划<i @click="cancel"></i></div>
            <form class="form" :model="planForm">
                <div class="form-item global-clearfix">
                    <span class="label mid">计划名称：</span>
                    <div class="input-box input-txt">
                        <input placeholder="请输入计划名称" type="text" class="input-txt-box" v-model="planForm.name"/>
                    </div>
                    <span class="tip">{{titleNum}}/40</span>
                    <div class="input-error" v-if="comError.title==1">{{comError.titleMsg}}</div>
                </div>
                <div class="form-item global-clearfix">
                    <span class="label mid">计划预算：</span>
                    <div class="input-box input-budget">
                        <input placeholder="请输入计划预算" type="text" class="input-txt-box" v-model="planForm.budget" @input="watchBudget"/>
                    </div>
                    <span class="tip">元</span>
                    <div class="input-error" v-if="comError.budget==1">{{comError.budgetMsg}}</div>
                </div>
                <div class="form-item global-clearfix">
                    <span class="label mid">计划描述：</span>
                    <div class="input-box input-textarea">
                        <textarea type="text" class="input-txt-box" placeholder="请输入计划的描述"  v-model="planForm.desc"></textarea>
                    </div>
                    <div class="tip">当前已输入{{descNum}}个字，您还可以输入{{200-descNum}}个字</div>
                    <div class="input-error" v-if="comError.desc==1">{{comError.descMsg}}</div>
                </div>
                <div class="submit global-clearfix">
                    <a href="javascript:;" class="submit-btn-ok" @click="submit">确认</a>
                    <a href="javascript:;" class="submit-btn-cancel" @click="cancel">取消</a>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
    input{
        border:0;
        outline: none;
    }
    .layer{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(51,51,51,0.5);
        z-index: 1;
    }
    .layer-box{
        position: absolute;
        left: 50%;
        top:50%;
        width:485px;
        transform: translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        background: #fff;
        border: 1px solid #D5D5D5;
        z-index: 100;
    }
    .layer-box .header{
        padding-left:20px;
        height:48px;
        line-height: 48px;
        color:#666;
        font-size: 16px;
        border-bottom: 1px solid #d5d5d5;
    }
    .layer-box .header i{
        display: block;
        float: right;
        padding:18px;
        width:14px;
        height:14px;
        cursor: pointer;
        background: url('images/guanbi.png') no-repeat center center;
    }
    .form{
        margin:18px 30px;
    }
    .form-item{
        margin-bottom:18px;
        font-size: 14px;
        line-height: 1;
        color: #4A4A4A;
    }
    .form-item .label{
        float: left;
    }
    .form-item .label.mid{
        line-height: 40px;
    }
    .form-item .input-box{
        float: left;
        height:38px;
        font-size: 14px;
        color:#666;
        border: 1px solid #D5D5D5;
    }
    .form-item .input-txt{
        width:280px;
    }
    .form-item .input-txt-box{
        display: block;
        padding:0 10px;
        width: 100%;
        height: 38px;
        line-height:38px;
        box-sizing: border-box;
    }
    .form-item .input-budget{
        width:140px;
    }
    .form-item .input-textarea{
        width:280px;
        height:80px;
    }
    .form-item .input-textarea textarea{
        width:100%;
        height:100%;
        border:0;
        padding:10px;
        line-height: 20px;
        outline: none;
    }
    .form-item span.tip{
        padding-left:10px;
        line-height: 38px;
    }
    .form-item div.tip{
        float: left;
        margin:10px 0 0 74px;
        width:280px;
        color:#999;
    }
    .submit{
        margin-top:27px;
    }
    .submit-btn-ok,.submit-btn-cancel{
        float: right;
        margin-left:20px;
        padding:10px 26px;
        font-size: 14px;
        color: #4A4A4A;
        background: #F6F6F6;
        border: 1px solid #D5D5D5;
        border-radius: 2px;
    }
    .submit-btn-ok{
        background: #FF6246;
        color: #fff;
    }
    .form-item .input-file{
        position: absolute;
        left:0;
        top:0;
        width:348px;
        height:100px;
        opacity: 0;
        cursor:pointer;
    }
    .input-error {
        clear:both;
        margin-left:70px;
        padding-top:5px;
        color: red;
        font-size: 12px;
    }

</style>
<script>
    module.exports = {
        props: {
            action: {
                type: String,
                default: 'create'
            }
        },
        data: function () {
            return {
                planForm:{
                    name: '',
                    budget: '',
                    desc: ''
                },
                comError:{
                    title:0,
                    titleMsg:'',
                    budget:0,
                    budgetMsg:'',
                    desc:0,
                    descMsg:''
                }
            }
        },
        beforeMount: function () {

        },
        computed:{
            titleNum:function(){
                return this.planForm.name.length;
            },
            descNum:function(){
                return this.planForm.desc.length;
            }
        },
        watch:{
            titleNum: function (val) {
                if (val > 40) {
                    this.comError.title = 1;
                    this.comError.titleMsg = '名称字数超出';
                    this.planForm.name = this.planForm.name.substring(0,40);
                }else{
                    this.comError.title = 0;
                }
            },
            descNum: function (val) {
                if (val > 200) {
                    this.comError.desc = 1;
                    this.comError.descMsg = '描述字数超出';
                    this.planForm.desc = this.planForm.desc.substring(0,200);
                }else{
                    this.comError.desc = 0;
                }
            }
        },
        methods: {
            openEdit: function (fields) {
                this.planForm.name = fields.name;
                this.planForm.budget = fields.budget_total;
                this.planForm.desc = fields.desc;
            },
            watchBudget:function(){//检测预算值
                var reg = /^(([1-9]+[0-9]*.{1}[0-9]+)|([0].{1}[1-9]+[0-9]*)|([1-9][0-9]*)|([0][.][0-9]+[1-9]*))$/;
                if(this.planForm.budget !== ''){
                    if(!reg.test(this.planForm.budget)){
                        this.comError.budget = 1;
                        this.comError.budgetMsg = '请输入数字';
                        return true;
                    } else if (parseFloat(this.planForm.budget) > 999999999.99) {
                        this.comError.budget = 1;
                        this.comError.budgetMsg = '输入的最大值不能超过999999999.99';
                        return true;
                    } else{
                        this.comError.budget = 0;
                        this.comError.budgetMsg = "";
                        return false;
                    }                    
                } else {
                    this.comError.budget = 1;
                    this.comError.budgetMsg = "请填写预算";
                    return true;
                }                
            },
            reset: function () {
                if (this.action === 'create') {
                    this.planForm.name = '';
                    this.planForm.budget = '';
                    this.planForm.desc = '';                    
                };  
                this.comError.titleMsg = '';
                this.comError.budgetMsg = '';
                this.comError.descMsg = ''; 
            },
            cancel: function () { // 取消
                this.$emit('close');
                this.reset();
            },
            submit: function () { // 提交
                for(var key in this.comError){
                    this.comError[key] = 0;
                }
                if (this.planForm.name == "") {
                    this.comError.title = 1;
                    this.comError.titleMsg = '请填写计划名称';
                    return;
                }
                if (this.watchBudget()) {
                    return;
                }
                // if (this.planForm.desc == "") {
                //     this.comError.desc = 1;
                //     this.comError.descMsg = '请填写描述';
                //     return;
                // }
                this.planForm.budget = parseFloat(this.planForm.budget);
                this.$emit('submit', this.planForm);
                this.reset();
            }
        }
    }
</script>
