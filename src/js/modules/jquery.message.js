/**
 * Created by drfu on 2016/5/11.
 */
;(function(jQuery) {

    /**
     * 定义正则表达式
     * @type {{color: RegExp, number: RegExp, int: RegExp, account: RegExp}}
     * @private
     */
    var regexps = {
        "color": /^(#[a-fA-F0-9]{3})|(#[a-fA-F0-9]{6})$/ig,
        "number": /^\-?\d+(\.\d+)?$/ig,
        "positiveNumber": /^\d+(\.\d+)?$/ig,
        "int": /^\-?\d+$/ig,
        "positiveInteger": /^\d+$/ig,
        "account": /^[a-zA-Z_]\w{2,14}[a-zA-Z0-9_]$/ig,
        "ip": /^((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}$/ig,
        "host": /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+.?$/ig,
        "url": new RegExp('^((https|http|ftp|rtsp|mms)?://)'
            + '(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@
            + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
            + '|' // 允许IP和DOMAIN（域名）
            + '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
            + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
            + '[a-z]{2,6})' // first level domain- .com or .museum
            + '(:[0-9]{1,4})?' // 端口- :80
            + '((/?)|' // a slash isn't required if there is no file name
            + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$', "ig"),
        "mail": /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/ig,
        "tel": /(^\d{11}$)|(^((\+?86)|(\(\+86\)))?(\d{3,4})?(\-|\s)?\d{7,8}((\-|\s)\d{3,4})?$)/ig,
        "pass": /^\S{6,16}$/ig,
        "pxsize": /^\d+px$/ig
    };


    var regex = {
        "check": function() {

        }
    };

    /**
     * 生成UUID
     * @type {{get: uuid.get, short: uuid.short}}
     */
    window.uuid = {
        /**
         * 创建UUID
         * @returns {string}
         */
        create: function () {
            var d = new Date().getTime();
            var _uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });
            return _uuid;
        },
        /**
         * 创建一个短格式的UUID
         * @returns {XML|void|string}
         */
        simple: function (header) {
            return (header || "") + uuid.get().replace(/\-/ig, "");
        }
    };

    /**
     * 格式化字符串
     * @param args
     * @returns {String}
     */
    String.prototype.format = function (args) {
        var result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (var key in args) {
                    if (args[key] != undefined) {
                        var reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        var reg = new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    };


    var _body = jQuery(document.body);
    /**
     * 鼠标移动提示信息
     * @type {{size: {width: number, height: number}, element: null, init: tooltip."init", position: tooltip."position", show: tooltip."show", moving: tooltip."moving", hide: tooltip."hide"}}
     */
    var tooltip =  {
        "size": {
            "width": 0,
            "height": 0
        },
        /**
         * 工具提示承载元素
         */
        "element": null,
        /**
         * 初始化工具
         */
        "init": function (setting) {
            var defSetting = {
                position: "absolute",
                top: "0",
                left: "0",
                display: "none",
                backgroundColor: "#3A3A3A",
                padding: "5px 10px",
                borderRadius: "2px",
                color: "#fff",
                fontSize: "13px",
                opacity: ".8",
                fontFamily: "Microsoft YaHei UI",
                zIndex: "99999",
                maxWidth: "480px",
                wordBreak: "break-all"
            };
            if(jQuery.isPlainObject(setting) && !$.isEmptyObject(setting)) {
                jQuery.extend(true, defSetting, setting);
            }
            if (tooltip.element === null) {
                tooltip.element = jQuery("<div class='tooltip'></div>").css(jQuery.extend(true, {}, defSetting));
                _body.append(tooltip.element);

                //注册事件
                _body.off("mouseenter.tooltip", "[data-tooltip]").on("mouseenter.tooltip", "[data-tooltip]", tooltip.show);
                _body.off("mouseleave.tooltip mousedown.tooltip", "[data-tooltip]").on("mouseleave.tooltip mousedown.tooltip", "[data-tooltip]", tooltip.hide);
            }
        },
        /**
         * 计算提示框位置
         * @param x
         * @param y
         * @returns {{left: *, top: *}}
         */
        "position": function (x, y) {
            var pos = {
                "left": x,
                "top": y + 30
            };
            var _tw = tooltip.element.outerWidth();
            var _th = tooltip.element.outerHeight();

            if (pos.left + _tw > document.body.scrollWidth - 10)
                pos.left = tooltip.size.width - 10 - _tw;
            if (pos.top + _th > document.body.scrollHeight - 10)
                pos.top -= (_th + 40);
            return pos;
        },
        /**
         * 显示工具提示
         */
        "show": function (e) {
            if (tooltip.element) {
                var message = e.currentTarget.dataset.tooltip;
                if (message) {
                    tooltip.element.html(message);
                    tooltip.element.css(tooltip.position(e.pageX, e.pageY)).stop(true, true).fadeIn("fast");
                    jQuery(e.currentTarget).unbind("mousemove.tooltip").bind("mousemove.tooltip", tooltip.moving);
                }
            }
        },
        /**
         * 移动工具提示元素
         * @param e
         */
        "moving": function (e) {
            if (tooltip.element) {
                tooltip.element.css(tooltip.position(e.pageX, e.pageY));
            }
        },
        /**
         * 显示工具提示
         */
        "hide": function (e) {
            if (tooltip.element) {
                jQuery(e.currentTarget).unbind("mousemove.tooltip");
                tooltip.element.stop(true, true).fadeOut("fast");
            }
        }
    };

    var confirm = {

        events: function(submit, cancel) {
            jQuery("div.msg-message").on("click", "> .msg-button .submit", submit).on("click", "> .msg-button .cancel", cancel);
        },

        init: function(setting, submit, cancel) {

            var defStyle = {
                    bg: {
                        backgroundColor: "#eaeaea",
                        position: "fixed",
                        width: "100%",
                        height: "100%"
                    },
                    wrap: {
                        width: "200px",
                        height: "100px",
                        backgroundColor: "#fff",
                        fontFamily: "Microsoft YaHei UI",
                        border: "#ccc",
                        position: "absolute",
                        left: "50%",
                        top: "50%"
                    },
                    title: {
                        padding: "10px 10px",
                        backgroundColor: "#39aeff",
                        fontSize: "15px",
                        color: "#fff"
                    },
                    content: {
                        padding: "10px 10px"
                    },
                    button: {
                        width: "50%",
                        fontSize: "13px",
                        padding: "10px 0",
                        textAlign: "center",
                        border: "none",
                        fontFamily: "Microsoft YaHei UI",
                        color: "#fff",
                        cursor: "pointer",
                        outline: "none"
                    },
                    buttonSubmit: {
                        backgroundColor: "#3296f4"
                    },
                    buttonCancel: {
                        backgroundColor: "#838383"
                    }
                },
                defSetting = {
                title: "title",
                ico: "",
                content: "content",
                submit: "ok",
                cancel: "no",
                style: defStyle
            };
            if($.isPlainObject(setting) && !$.isEmptyObject(setting)) {
                $.extend(true, defSetting, setting);
            }
            var bg = '<div class="msg-bg"></div>',
                msgHtml = '<div class="msg-message"> <div class="msg-title"> <span class="{0}"></span> <span>{1}</span> </div> <div class="msg-content"> {2} </div> <div class="msg-button"> <button class="submit">{3}</button><button class="cancel">{4}</button> </div> </div>'.format(defSetting.ico, defSetting.title, defSetting.content, defSetting.submit, defSetting.cancel);

            _body.prepend($(bg).append(msgHtml));

            var ms = $(".msg-message");
            $(".msg-bg").css(defSetting.style.bg);
            ms.css(defSetting.style.wrap);
            $(".msg-title").css(defSetting.style.title);
            $(".msg-content").css(defSetting.style.content);
            $(".msg-button > button").css(defSetting.style.button);
            $(".msg-button > button.submit").css(defSetting.style.buttonSubmit);
            $(".msg-button > button.cancel").css(defSetting.style.buttonCancel);
            var w = ms.width(),
                h = ms.height();
            ms.css({
                marginLeft: -(w/2) + "px",
                marginTop: -(h/2) + "px"
            });
            if($.isFunction(submit) || $.isFunction(cancel))
                confirm.events(submit, cancel);
        }
    };

    jQuery.extend({
        message: function(type, setting, submit, cancel) {
            switch (type) {
                case "tooltip":
                    tooltip.init(setting);
                    break;
                case "confirm":
                case "message":
                    confirm.init(setting, submit, cancel);
                    break;
            }
        }
    });
    jQuery.fn.regex = regex.check();
})(jQuery);
