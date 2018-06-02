<template>
    <div class="finance-task">
        <div class="task-circle">
            <el-progress type="circle"  :percentage="spendDay" :width="width" :show-text="showText"></el-progress>
        </div> 
        <div class="task-circle small" >
            <el-progress type="circle" :percentage="completeDegree" :width="width1" :show-text="showText" status="exception"></el-progress>
        </div> 
        <div class="task-info">
            <ul class="task-info-list">
                <li class="task-info-item">
                    <span class="square" style="background:#e5e9f2"></span>
                    <span class="credit-info-tlt">任务额度:</span>
                    <span>{{target|moneyFormat}}元</span>
                </li>
                <li class="task-info-item">
                    <span class="square" style="background:#ff4949" ></span>
                    <span class="credit-info-tlt">已完成:</span>
                    <span>{{completed|moneyFormat}}元</span>
                </li>
                <li class="task-info-item">
                    <span class="square" style="background:#ff4949" ></span>
                    <span class="credit-info-tlt ">完成度:</span>
                    <span>{{completeDegree}}%</span>
                </li>
                <li class="task-info-item">
                    <span class="square" style="background:#20a0ff"></span>
                    <span class="credit-info-tlt">剩余时间:</span>
                    <span>{{remainDay}}天</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<style scoped src="./style.css"></style>
<script src="./main.js"></script>