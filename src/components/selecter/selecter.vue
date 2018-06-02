<template>
    <div v-bind:class="['selecter', {active: status}]" @click="toggle">
        <span class="input">{{ cur.text }}</span>
        <ul class="select-options">
            <li v-for="(item, index) of options"
                @click="changeSelect(index)"
                class="select-option">
                {{ item.text }}
            </li>
        </ul>
    </div>
</template>
<style scoped>
    .selecter {
        position: relative;
        height: 38px;
        border: 1px #D5D5D5 solid;
        cursor: pointer;
        display: inline-block;
        width: 248px;
        font-size: 14px;
        vertical-align: top;
        background:#F6F6F6;
    }
    .selecter:after{
        content: '';
        display: block;
        position: absolute;
        right:0;
        width:17px;
        height:38px;
        border-left: 1px solid #D5D5D5;
        background:#eee url('./images/arrow-down.png') no-repeat center center;
    }
    .selecter.active:after {
        background-image: url('./images/arrow-up.png');
    }

    .selecter .input {
        text-indent: 12px;
        height: 38px;
        width: 80%;
        cursor: pointer;
        position: absolute;
        line-height: 38px;
        color: #666;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .selecter .select-options {
        position: absolute;
        top: 38px;
        left: -1px;
        width: 100%;
        border: 1px #ddd solid;
        display: none;
        max-height: 202px;
        overflow: auto;
        zoom: 1;
        z-index: 9;
    }

    .selecter.active .select-options {
        display: block;
    }

    .selecter .select-option {
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        cursor: pointer;
        text-indent: 12px;
        position: relative;
    }

    .selecter .select-option:hover {
        background-color: #f6f6f6;
    }
</style>
<script>
    module.exports = {
        props: {
            defaultIndex: {
                type: Number,
                default: 0
            },
            options: {
                type: Array
            }
        },
        data: function () {
            return {
                status: false,
                cur: (this.options[this.defaultIndex] ? {
                    text: this.options[this.defaultIndex].text,
                    value: this.options[this.defaultIndex].value
                } : null) || {text: '', value: ''}
            };
        },
        watch: {
            defaultIndex: function (index) {
                this.updateCur();
            },
            options: function () {
                this.updateCur();
            }
        },
        methods: {
            updateCur: function () {
                for (var i in this.cur) {
                    this.cur[i] = this.options[this.defaultIndex][i];
                }
            },
            changeSelect: function (index) {
                for (var i in this.cur) {
                    this.cur[i] = this.options[index][i];
                }
                this.$emit('change', this.cur);
            },
            toggle: function () {
                this.status = !this.status;
            }
        },
        mounted: function () {
            var _this = this;
            document.addEventListener('click', function (e) {
                if (!_this.$el.contains(e.target)) _this.status = false;
            });
        }
    };
</script>
