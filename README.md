# messageTool
本插件主要是用于页面元素hover提示，或者设置confirm页面和message box页面

####使用方法
| type    |   options  |
| :----- |:----------|
| tooltip | cssStyleObject |
| confirm | {setptions}, submitFun, cancelFun |
| message |{setptions}, [submitFun]  |
| shortmessage |{setptions}, submitFun |

>1.tooptip工具

    1)页面中对需要使用tooltip的元素，加上 data-tooltip=‘提示语’ 属性即可。
    
~~~html
    <input data-tooltip='成功调用tootip插件'/>
~~~~

    2)然后在页面引入的js文件中调用$.message("tooltip", {样式配置，参照jquery设置css格式})
    
~~~javascript
    $.message({
        backgroundColor: "rgba(0, 0, 0, .8)",
        padding: "5px 10px",
        borderRadius: "8px",
        color: "#fff",
        maxWidth: "480px"
    });
~~~

>2.confirm确认弹出框

~~~javascript
    $("selector").click(function() {
        $.confirm({
            title: "删除电影", //弹出框标题
            content: "确认删除这些电影？", //消息文本内容，也可以为任意可解析的HTML代码
            submit: "立马删除", //确认按钮文字
            cancel: "算咯吧，留着用",  //取消按钮文字
            style: {
                bg: {}, //弹出层背景样式
                wrap: {
                    width: "600px" //弹出层盒子样式
                },
                title: {}, //标题样式
                content: {}, //内容样式
                button: {}, //按钮样式
                buttonSubmit: {}, // 提交按钮样式单独定义
                buttonCancel: {}  // 取消按钮样式单独定义
            }
        }, function(){
            //提交按钮点击事件
            alert("submit");
            $(".msg-bg").fadeOut("fast");
        }, function() {
            //取消按钮点击事件
            $(".msg-bg").fadeOut("fast");
        })
    });
~~~

>3.message通知消息弹出框

~~~javascript
    $("selector").click(function() {
         $.message({
                content: "已经成功格式化硬盘！",
                submit: "ok"
            }, function () {
                //点击确定按钮执行事件
                alert("好的，知道了...");
            }
        )
    });
~~~
