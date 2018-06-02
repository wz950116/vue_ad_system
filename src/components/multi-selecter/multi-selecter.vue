<template>
    <div v-bind:class="['selecter', {active: status}]" @click="toggle">
        <span class="input">{{ title }}<em v-show="cur > 0 && numShow">({{ cur }})</em></span>
        <ul class="select-options">
            <li v-for="(item, index) of opts" @click="toggleSelect(index)" v-bind:class="['select-option', {active: item.selected}]">
                {{ item.text }}
            </li>
        </ul>
    </div>
</template>
<style scoped>
.selecter {
    position: relative;
    height: 38px;
    border: 1px #ddd solid;
    cursor: pointer;
    display: inline-block;
    width: 248px;
    vertical-align: top;
    background-image: url('./images/arrow-down.png');
    background-repeat: no-repeat;
    background-position: right 10px center;
}

.selecter.active {
    background-image: url('./images/arrow-up.png');
}

.selecter .input {
    text-indent: 12px;
    height: 38px;
    width: 80%;
    cursor: pointer;
    position: absolute;
    line-height: 38px;
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
    z-index: 10;
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

.selecter .select-option.active {
    color: red;
}

.selecter .select-option:hover {
    background-color: #f5f5f5;
}
</style>
<script>
module.exports = {
    props: {
        title: {
            type: String,
            default: '选择'
        },
        options: {
            type: Array
        },
        numShow: {
            type: Boolean
        }
    },
    data: function() {
        return {
            status: false,
            opts: this.options,
            cur: 0
        };
    },
    beforeMount: function() {
        this.cur = this.getSelected().length;
    },
    methods: {
        getSelected: function() {
            var selectedOpts = [];
            for (var i = 0, len = this.opts.length; i < len; i++) {
                if (this.opts[i].selected === true) {
                    selectedOpts.push(this.opts[i]);
                }
            }
            return selectedOpts;
        },
        toggleSelect: function(index) {
            this.opts[index].selected = !(this.opts[index].selected === true);
            var selectedOpts = this.getSelected();
            this.cur = selectedOpts.length;
            this.$emit('change', selectedOpts);
        },
        toggle: function() {
            this.status = !this.status;
        }
    },
    mounted: function() {
        var _this = this;
        document.addEventListener('click', function(e) {
            if (!_this.$el.contains(e.target)) _this.status = false;
        });
    }
};
</script>
