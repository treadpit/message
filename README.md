# messageTool
本插件主要是用于页面元素hover提示，或者设置confirm页面和message box页面

####使用方法
| tooltip        | confirm / message|
| :-------------: |:-------------:|
| ("tooltip", cssStyleObject)  | ("confirm", {setptions}, submitFun, cancelFun) |
>1.tooptips使用示例
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
