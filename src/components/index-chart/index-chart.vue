<template>
    <div class="index-chart">
        <div class="index-search">
            <div class="select left">
                <selecter v-on:change="changeChartSelect(0, arguments[0])" :defaultIndex="0" :options="datasetOptions" />
            </div>
            <div class="select right">
                <selecter v-on:change="changeChartSelect(1, arguments[0])" :defaultIndex="1" :options="datasetOptions" />
            </div>
        </div>
        <div class="canvas-container js-chart"></div>
    </div>
</template>
<style scoped>
    .index-search{
        height:60px;
        padding-top:40px;
        clear:both;
    }

    .left{
        float:left;
    }

    .right{
        float:right;
    }

    .select {
        width: 170px;
    }

    .selecter {
        width: 100%;
    }

    .canvas-container {
        height: 375px;
        text-align: center;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
    }

    .canvas-container div {
        margin: 0 auto;
    }
</style>
<script>
    var selecter = require('../selecter/selecter');
    var echarts = require('../../lib/echarts.min.js');

    var echartOption = function (dataset, min1, max1, min2, max2) {
        return {
            backgroundColor:'#fff',
            color : ['#0CBDF1','#F11E0D'],
            tooltip : {
                trigger: 'axis',
                formatter: function(params) {
                    params.forEach(function (item) {
                        if (item.seriesName === "点击率") {
                            item.value = parseFloat(item.value).toFixed(4) * 10000 / 100;
                            var index = item.value.toString().indexOf('.');
                            var len = item.value.toString().length - index - 1;
                            if (len >= 2) {
                                var newStr = item.value.toString().slice(0, index + 3);
                                if (item.value.toString()[index + 3] >= 5) {
                                    newStr = parseFloat(newStr) + 0.01 + '%';
                                } else {
                                    newStr = newStr + '%';
                                }
                            } else if (item.value == 0) {
                                var newStr = '0%'
                            } else if (len == 1) {
                                var newStr = item.value + '0%'
                            } else if (len == 0) {
                                var newStr = item.value + '00%';
                            }
                            console.log(newStr);
                            item.value = newStr;

                        } else if (item.seriesName === "消耗") {
                            item.value = parseInt(item.value) + '';
                        }
                    })
                    return params[0].name + '<br/>'
                       + params[0].seriesName + ' : ' + params[0].value + ' <br/>'
                       + params[1].seriesName + ' : ' + params[1].value;
                }
            },
            legend: {
                selectedMode: false,
                data : [{
                    name : dataset.name[0],
                    textStyle : {
                        color : '#666',
                        fontSize : 14
                    }
                },{
                    name : dataset.name[1],
                    textStyle : {
                        color : '#666',
                        fontSize : 14
                    }
                }],
                x: 'right',
                y:'10',
                textStyle : {
                    color : '#666',
                    fontSize : 14
                },
            },
            grid : {
                x : 90,
                y : 50,
                x2 : 90,
                y2 : 60
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLine : {    // 轴线
                        onZero : true,
                        show: true,
                        lineStyle: {
                            color: '#666',
                            type: 'solid',
                            width: 2
                        }
                    },
                    axisLabel : {
                        textStyle : {
                            fontSize : 14
                        }
                    },
                    // x轴的值
                    data : dataset.xAxis
                }
            ],
            yAxis : [
                {
                    name : '',
                    type : 'value',
                    min: min1,
                    max: max1,
                    axisLine : {    // 轴线
                        onZero : true,
                        show: true,
                        lineStyle: {
                            color: '#666',
                            type: 'solid',
                            width: 2
                        }
                    },
                    axisLabel : {
                        textStyle : {
                            fontSize : 14
                        }
                    }
                },
                {
                    name :  '',
                    type : 'value',
                    min: min2,
                    max: max2,
                    axisLine : {    // 轴线
                        onZero : true,
                        show: true,
                        lineStyle: {
                            color: '#666',
                            type: 'solid',
                            width: 2
                        }
                    },
                    axisLabel : {
                        textStyle : {
                            fontSize : 14
                        }
                    }
                }
            ],
            series : [
                {
                    name : dataset.name[0],
                    type:'line',
                    showAllSymbol: true,
                    itemStyle : {
                        normal : {
                            lineStyle : {
                                color : '#0FBEEC',
                                width : 3
                            }
                        }
                    },
                    data:dataset.series1
                },
                {
                    name:dataset.name[1],
                    type:'line',
                    yAxisIndex: 1,
                    showAllSymbol: true,
                    itemStyle : {
                        normal : {
                            lineStyle : {
                                color : '#EF2D1D',
                                width : 3
                            }
                        }
                    },
                    data:dataset.series2
                }
            ]
        };
    };

    module.exports = {
        props: ['dataset'],
        data: function () {
            return {
                datasetOptions: [
                    {
                        value: 'expose',
                        text: '曝光量'
                    },
                    {
                        value: 'click',
                        text: '点击量'
                    },
                    {
                        value: 'clickRate',
                        text: '点击率'
                    },
                    {
                        value: 'payment',
                        text: '消耗'
                    }
                ],
                series1: {
                    code: 'expose',
                    name: '曝光量'
                },
                series2: {
                    code: 'click',
                    name: '点击量'
                },
                currentSelect: {
                    value: 'expose',
                    text: '曝光量'
                },
                chartIns: null
            };
        },
        components: {
            'selecter': selecter
        },
        watch: {
            dataset: function (arr) {
                this.changeChartSelect(0, this.currentSelect);
            },
        },
        methods: {
            changeChartSelect: function (side, selectedOpt) {
                if (side === 0) {
                    this.series1.code = selectedOpt.value;
                    this.series1.name = selectedOpt.text;
                } else {
                    this.series2.code = selectedOpt.value;
                    this.series2.name = selectedOpt.text;
                }
                this.currentSelect = selectedOpt;
                this.renderChart();
            },
            adaptData: function () {
                var datasetForChart = {
                    name: [this.series1.name, this.series2.name],
                    xAxis: [],
                    series1: [],
                    series2: []
                };
                var i, len;
                for (i = 0, len = this.datasetOptions.length; i < len; i++) {
                    datasetForChart.name.push(this.datasetOptions[i].name);
                }

                for (i = 0, len = this.dataset.length; i < len; i++) {
                    datasetForChart.xAxis.push(this.dataset[i]['date']);
                    datasetForChart.series1.push(this.dataset[i][this.series1.code]);
                    datasetForChart.series2.push(this.dataset[i][this.series2.code]);
                }
                return datasetForChart;
            },
            renderChart: function () {
                this.chartIns = echarts.init(this.$el.getElementsByClassName('js-chart')[0]);
                this.chartIns.setOption(echartOption(this.adaptData()));
            }
        }
    };
</script>
