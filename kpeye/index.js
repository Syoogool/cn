var speye= {
    channel : ["支付宝","微信","小米", "财付通", "天猫"],
    page : 0,
    $containerId : null,

    init : function() {
        this.selectOption();
        this.switchTab();
        this.selectServe();
        this.selectFilter();
        this.completeSub();
        // this.checkMessage();
    },
    selectOption : function(){
        $(".choose-item").on("click",function(){
            var that = this,
            $bigCircle = $(that).find(".big"),
            $smallCircle = $(that).find(".small"),
            $isChecked = $(that).hasClass("checked");

            if ( $isChecked ) {
                cancelChecked()   //  取消选中
            }
            else {
                checked()   //  选中
            }

            showOption();  // 在上方显示选中项的值

            function showOption() {
                var $targetId = "." + $(that).parent().attr("data-id"),
                    $curVal = $(that).find("span").text();

                $( $targetId ).text($curVal);
            }
            function checked() {
                $(that).parent().find(".choose-item")
                                .removeClass("checked");
                $bigCircle.toggle(true);
                $(that).siblings().find(".big").toggle(false);
                $smallCircle.addClass("white");
                $(that).siblings().find(".small").removeClass("white");
                $(that).addClass("checked");
            }
            function cancelChecked() {
                $bigCircle.toggle(false);
                $smallCircle.removeClass("white");
                $(that).removeClass("checked")
            }
        })
    },

    switchTab : function() {
        //  选取前两个标签
        $(".nav li:nth-child(-n+2)").on("tap", function() {
            var $curTab = $(this),
                $index = $($curTab).index(),
                $content = $curTab.parents(".nav").siblings(".choose").find(".choose-box"),
                $target = $($curTab).parents(".content").find(".business .item");

            $curTab.addClass("active");
            $curTab.siblings().removeClass("active");
            $content.eq($index).show().siblings().hide();
            $target.removeClass("active");
            $target.eq($index).addClass("active")
        })
    },

    selectServe : function() {
        $(".filter span").on("tap", function() {
            var that = this,
                $index = $(".filter span").index(that),
                $id = $(that).attr("data-id");

            $(that).addClass("active")
                   .siblings().removeClass("active");
            $(".content").eq($index).show()
                         .siblings().hide();

            // 生成四组数据
            for (var i=0; i<4; i++) {
              speye.getText($id);
              speye.getChart($id);
            }
        })
    },

    selectFilter : function() {
        $(".item").on("tap", function() {
            var $index = $(this).index(),
                $option = $(this).parent(".business"),
                $target = $(this).parents(".content").find(".nav li");

            $target.eq($index).trigger("tap");
            $option.siblings(".chart-box").hide();
            $option.siblings(".select-box").show();
        })
    },

    /**
     * [check description]
     * @method check
     * @param  {[string]} $id ["charge" or "flow"]
     * @return {[boolean]}     [true or false]
     */
    check : function($id) {
        var $secChannel = "#" + $id + " " + ".channel-choose-box .checked",
            $secArea = "#" + $id + " " + ".area-choose-box .checked";

        if ( $($secChannel).length === 0 ) {
            $(".toast-channel").show(2000, function() {
                $(this).css("display","none")
            })
        }
        else {
            if ( $($secArea).length === 0 ) {
                $(".toast-area").show(2000, function() {
                    $(this).css("display","none")
                })
            }
            else {
                return true
            }
        }
    },

    completeSub : function() {
        $(".complete").on("tap", function() {
            var that = this,
                $id = $(that).attr("data-id"),        //  id(flow/charge)用来确定是作用范围
                $containerId ='#'+ $id + '-chart-box',
                $area = $('#'+$id+''+' .area-choose-box .checked span:first-child').text(),
                $channel = $('#'+$id+''+' .channel-choose-box .checked span:first-child').text();

            if ( speye.check($id) ) {
                speye.subEffect(that);
                $($containerId).empty();
                // 获取的数据生产图像
                for(var i=0; i<2; i++) {
                    speye.getText($id,$area,$channel);
                    speye.getChart($id);
                }
            }
        })
    },
    subEffect : function(that) {
        var $parents = $(that).parents(".select-box");

        $parents.hide();
        $parents.siblings(".chart-box").show();
        $parents.siblings(".business").find(".item").removeClass("active");
    },

   // 滚动刷新


    ajax : function ($id) {
        var $businessType = "",
            $channelCode = "",
            $provinceCode = "",
            $date = "",
            $pageNo = "",
            $pageSize = "";

        $.ajax({
            url : "",
            type : "GET",
            data : {
                "businessType" : $businessType,
                "channelCode" : $channelCode,
                "provinceCode" : $provinceCode,
                "date" : $date,
                "pageNo" : $pageNo,
                "pageSize" : $pageSize
            },
            dataType : "json",
            timeout : "360",
            async : true,
            cache : true,
            success : function (data) {
                speye.getText($id,$area,$channel);
                speye.getChart($id);
            },
            error : function (e) {
                return e;
            }
        })
    },

    //  创建一个指定大小的容器
    createDiv : function($id) {
        var ele = document.createElement("li"),
            id = $id + "-chart-box",
            $div =  document.getElementById(id).appendChild(ele);

            ele.style.width = "100%";
            ele.style.height = "200px";
            ele.className = "chart";
            return  $div
      },

    getText : function($id,$area,$channel) {
        var area = $area || "全国总量",
            channel = $channel || "所有渠道",
            id = '#' + $id +'-chart-box',
            html = '<li class="panel">'
                   +    '<h1>'+channel +'</h1>'
                   + '</li>'
                   + '<li class="data-content" >'
                   +    '<div class="area">'
                   +        '<span>'+ area +'</span>'
                   +    '</div>'
                   +    '<ul class="data">'
                   +        '<li class="sub-data">'
                   +            '<p>今日订单</p>'
                   +            '<p>同比平均</p>'
                   +        '</li>'
                   +        '<li class="sub-data">'
                   +            '<p class="count">'+Math.floor(Math.random()*2000+8000)+'个</p>'
                   +            '<p class="count-rate">'+Math.floor(Math.random()*8 + 2)+'%'+'</p>'
                   +        '</li>'
                   +        '<li class="sub-data">'
                   +            '<p class="money">'+Math.floor(Math.random()*100000 + 1e5)+'元</p>'
                   +            '<p class="money-rate">'+Math.floor(Math.random()*8 + 2)+'%'+'</p>'
                   +        '</li>'
                   +    '</ul>'
                   +    '</div>'
                   +'</li>';
            $(id).append(html);   //  追加
      },

    getChart: function($id) {
        var average = [],
            current = [];
       // 模拟ajax获取的数据
        for (var i=0; i < 48; i++) {
            var num1 = ( Math.floor(Math.random() * 70) ) + 10;
            var num2 = ( Math.floor(Math.random() * 70) ) + 10;
            average.push(num1);
            current.push(num2);
        }

        var option = {
            grid: {
                top: 30
            },
            tooltip : {
                trigger: 'axis',
                show: true,
            },
            color: [
             '#67BE3D', '#4091EF', '#da70d6', '#32cd32', '#6495ed',
              '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
              '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
              '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
            ],
            legend: {
                y: 'bottom',
                x: 'center',
                data:['上周平均值','实时值'],
                padding: 20,
                textStyle: {
                    fontSize: 9,
                    color: '#666',
                }
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                  type : 'category',   //  坐标轴类型 value(数值型) category(类目型) time(时间型) log(对数型)
                  //   boundaryGap: ['10%', '10%'],
                  splitNumber: 24,
                  name: '时间',          //   坐标轴名称
                  nameTextStyle: {       //    坐标轴样式
                      color: '#A5A5A5',
                      fontSize: 9
                  },
                  nameLocation: 'end',   //  坐标轴名称显示位置  start middle end
                  nameGap:2,             //  坐标轴名称与轴线之间的距离
                  nameRotate : null,     //  坐标轴名字旋转角度
                  boundaryGap : true,    //  坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
                  splitArea: {     //  坐标轴在 grid 区域中的分隔区域
                      show: true,
                      interval: 0,
                      color: [
                          '#fff',
                          '#F6F6F6'
                      ]
                  },
                 axisTick: {        // 坐标轴刻度
                     show: true,
                      alignWithLabel:true,  // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
                      interval: 3,          // 坐标轴刻度的显示间隔，在类目轴中有效 表示隔3个标签显示一个标签
                      inside : false,       //  坐标轴刻度是否朝内，默认朝外
                      length: 0,            // 坐标轴刻度的长度[ default: 5 ]
                 },
                 axisLabel: {          // 刻度标签的相关设置
                      show: true,
                      interval: 1,
                      margin: 5,
                      textStyle: {
                          color: '#A5A5A5',
                          fontSize: 9
                     },
                },
                axisLine: {         // 坐标轴线
                show: true,
                    lineStyle: {
                        color: '#E5E5E5',
                        width: 1
                    }
                },
                data : [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8 ,8.5, 9, 9.5, 10,
                      10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5,
                      17, 17.5, 18, 18.5, 19, 19.5, 20 ,20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24]
                }
                ],
                yAxis : [
                    {
                    type : 'value',
                    name: '订单量',
                    nameLocation: 'end',
                    nameTextStyle: {
                        color: '#A5A5A5',
                        fontSize: 6
                    },
                    nameGap: 10,
                    boundaryGap: ['10%', '10%'],
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#E5E5E5',
                            width: 1
                        }
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: true,
                        interval: 0,
                        length: 0,
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        margin: 5,
                        textStyle: {
                            color: '#A5A5A5',
                            fontSize: 9
                        }
                    }
                    }
                ],
                series : [
                    {
                    name:'上周平均值',
                    type:'line',
                    stack: '总量',
                    smooth: true,
                    symbol: 'circle',    // 系列级个性化拐点图形
                    symbolSize: 6,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                            width: 1
                            }
                        }
                    },
                    data: average
                    },
                    {
                        name:'实时值',
                        type:'line',
                        symbol:'circle',
                        symbolSize: 6,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 1
                                }
                            }
                        },
                        data: current
                    }
                ]
        };

        echarts.init( speye.createDiv($id) ).setOption(option);
        }
    };



(function() {speye.init()})()

// 首页默认加载的数据
window.onload = (function() {
  $(".filter .active").trigger("tap");
});
