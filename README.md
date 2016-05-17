# messageTool
本插件主要是用于页面元素hover提示，或者设置confirm页面和message box页面

####使用方法
| type    |   options  |
| :-----: |:----------:|
| tooltip"| ("tooltip", cssStyleObject) |
| confirm |("confirm", {setptions}, submitFun, cancelFun) |
| message |("message", {setptions}, submitFun)  |

>1.tooptip使用示例

    1)页面中对需要使用tooltip的元素，加上 data-tooltip=‘提示语’ 属性即可。
    
~~~html
    <input data-tooltip='成功调用tootip插件'/>
~~~~

    2)然后在页面引入的js文件中调用$.message("tooltip", {样式配置，参照jquery设置css格式})
    
~~~javascript
    $.message("tooltip", {
        backgroundColor: "rgba(0, 0, 0, .8)",
        padding: "5px 10px",
        borderRadius: "8px",
        color: "#fff",
        maxWidth: "480px"
    });
~~~
>2.confirm/message示例
~~~javascript
    $("selector").click(function() {
        $.message("confirm", {
            title: "删除电影",
            content: "确认删除这些电影？",
            submit: "立马删除",
            cancel: "算咯吧，留着用",
            style: {
                bg: {},
                wrap: {
                    width: "600px"
                },
                title: {},
                content: {},
                button: {},
                buttonSubmit: {},
                buttonCancel: {}
            }
        }, function(){
            alert("submit");
            $(".msg-bg").fadeOut("fast");
        }, function() {
            $(".msg-bg").fadeOut("fast");
        })
    });
~~~
