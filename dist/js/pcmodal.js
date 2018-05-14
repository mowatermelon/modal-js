/**
 * @show modal
 * @version 5.0
 * @author WU EVA
 **/


//使用本插件之前需要引用jquery.js、bootstrap.css和bootstrap.js，
//本插件是在bootstrap modal的基础上写的一个共用模态窗插件。

let showmodal = function (options) {
    let defaults = {
        flag: "info", //设置弹出modal的状态 success:成功窗体,warning:警告窗体,info:信息窗体,default:默认无样式
        title: "提示信息", //设置模态窗标题
        modalIndex: "01", //设置模态窗索引值，默认只使用一次弹窗，模态窗的序号默认为01
        titleCenter: false, //设置模态窗标题是否水平居中显示，默认为false,默认左对齐
        isText: true, //判断传进来content的是否为Text,默认为true
        content: "提示内容", //如果传进来content的为Text，通过修改text内容设置模态窗内容
        contentLeft: false, //设置模态窗content是否左对齐显示，默认为false
        fontSize: "", //如果传进来content的为Text，可以修改字体大小,默认是24px,h3大小，请输入具体像素值,例如10
        src: "", //如果传进来content的为iframe，通过修改iframe地址来设置模态窗内容
        data: {}, //放在src后面进行参数拼接的json
        hideClick: true, //boolean 或 string 'static',设置点击modal遮罩层是否隐藏modal，默认为true,如果设置为'static',则点击背景模态窗不会关闭
        Tclose: true, //设置右上角关闭按钮是否显示，默认为显示
        Bclose: true, //设置右下角关闭按钮是否显示，默认为显示
        Qclose: false, //设置右下角关闭按钮是否显示，默认为关闭
        Sheight: "", //设置模态窗高度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        SMaxheight: "", //设置模态窗最高高度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        SWidth: "", //设置模态宽度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        SMaxWidth: "", //设置模态最大宽度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        resetajust: false, //设置是否重新计算modal的居中效果，默认为false
        callbackB: false, //确认确认按钮有没有回调函数，默认为false
        callbackQ: false, //确认取消按钮有没有回调函数，默认为false
        BcloseText: "确定", //设置右下角关闭按钮的文本内容，默认为确定
        QcloseText: "取消", //设置右下角关闭按钮的文本内容，默认为取消
        Justify: false, //设置底部按钮是否两端对齐，主要使用状态在底部有两个按钮，希望一左一右的显示，默认为false
        isZoom: false, //设置头部按钮全屏按钮是否显示，默认为false
        iframePadding: false, //当body的内容为iframe的时候，是否设置padding，默认为false
        isIE9: false,
        /**
         * 初始化DOM结构
         */
        initDom: function () {
            let _this = this;
            let parentdiv = "<div class='modal fade show_Modal' id='showModal" + _this.modalIndex + "' tabindex='-1' role='dialog' aria-hidden='true' ><div class='modal-dialog modal-dialog-centered' role='document'><div class='modal-content'>"; //创建一个modaldiv
            let headerdiv = "<div class='modal-header ";
            if (_this.titleCenter) {
                headerdiv += " text-center ";
            }
            headerdiv += "bg-" + _this.flag + "' ><span class='modal-title' id='showLabel'>" + _this.title + "</span>";

            headerdiv += "<div class='btn-toolbar' role='toolbar'>";

            if (_this.isZoom) {
                headerdiv += "<button id='btn-zoom' class='btn btn-info glyphicon glyphicon-zoom-in'>放大</button>\n";
            }

            if (_this.Tclose) {
                headerdiv += "<button type='button' class='close' id='Tclose'  data-dismiss='modal' aria-hidden='true'>&times;</button>";
            }

            headerdiv += "</div></div>\n";

            let contentdiv;
            if (_this.isText) {
                if (_this.contentLeft) {
                    contentdiv = "<div class='modal-body text-left h3 bg-white'>" + _this.content + "</div>\n"; //创建contentdiv
                } else {
                    contentdiv = "<div class='modal-body text-center h3 bg-white'>" + _this.content + "</div>\n"; //创建contentdiv               
                }
            } else {
                _this.translateJsonToParams();
                contentdiv = "<div class='modal-body text-center h3 bg-white'><iframe src='" + _this.src + "' id='modalIframe' name= 'modal_Iframe'></iframe></div>\n"; //创建contentdiv  
            }

            let footerdiv = "<div class='modal-footer bg-light'>";

            if (_this.Bclose && _this.Qclose) {
                if (_this.Justify) {
                    footerdiv += "<div class='row'><button type='button' class='col r-b-1 btn btn-link' data-dismiss='modal' id='close'>" + _this.BcloseText + "</button><button type='button' class='col btn btn-link' data-dismiss='modal' id='bcancel'>" + _this.QcloseText + "</button></div>"; //创建footerdiv                   
                } else {
                    footerdiv += "<button type='button' class='btn btn-" + _this.flag + "' data-dismiss='modal' id='close'>" + _this.BcloseText + "</button><button type='button' class='btn btn-secondary' data-dismiss='modal' id='bcancel'>" + _this.QcloseText + "</button>"; //创建footerdiv
                }
            } else {
                if (_this.Bclose) {
                    footerdiv += "<button type='button' class='btn btn-block btn-link' data-dismiss='modal' id='close'>" + _this.BcloseText + "</button>";
                }
                if (_this.Qclose) {
                    footerdiv += "<button type='button' class='btn btn-link' data-dismiss='modal' id='bcancel'>" + _this.QcloseText + "</button>";
                }

            }
            footerdiv += "</div>";

            parentdiv += headerdiv + contentdiv + footerdiv + "</div></div></div>";

            $(document.body).append(parentdiv);
            $("#showModal" + _this.modalIndex).modal({
                keyboard: false,
                backdrop: _this.hideClick
            });
            iE9 = _this.isIE9();
        },
        /**
         * 初始化
         */
        init: function () {
            this.initDom();
            this.initCss();
            this.initFunction();
        },
        /**
         * 绑定样式
         */
        initCss: function () {
            let _this = this;
            let _modalAll = $("#showModal" + _this.modalIndex);
            let _modalDialog = _modalAll.children(" .modal-dialog");
            let _modalContent = _modalDialog.children(".modal-content");
            let _modalHeader = _modalContent.children(".modal-header");
            let _modalBody = _modalContent.children(".modal-body");
            let _modalFooter = _modalContent.children(".modal-footer");

            _modalContent.css({
                "border-radius": "15px",
                "background-color": "transparent"
            });

            _modalHeader.css({
                "padding": "5px",
                "border-radius": "15px 15px 0 0",
                "border-bottom": "1px solid #e5e5e5"
            });
            _modalHeader.children(".modal-title,.close").css({
                "font-size": "20px",
                "color": "#fff",
                "line-height": "40px"
            });
            _modalHeader.children(".modal-title").css({
                "padding-left": "20px",
                "padding-right": "20px"
            });
            _modalHeader.children(".close").css({
                "margin": 0,
                "padding": "0 10px 0 0"
            });
            _modalHeader.children(".glyphicon").css({
                "line-height": "25px"
            });

            _modalBody.css({
                "margin-bottom": "0"
            });

            _modalFooter.css({
                "margin-top": "0px",
                "border-radius": "0 0 15px 15px",
                "padding": "5px"
            });
            _modalFooter.children(".row").css({
                "width": "100%"
            });
            _modalFooter.children(".row .btn-link").css({
                "font-size": "18px"
            });
            //判断modalbody是否为文本类型
            if (!_this.isText) {
                if (!_this.iframePadding) {
                    _modalBody.css({
                        "padding": "0",
                        "overflow": "hidden"
                    });
                }
                _modalBody.children("#modalIframe").css({
                    "border": "0 none #eee",
                    "width": "100%",
                    "margin": "0 auto",
                    "height": "99%"
                });

            }
            //判断是否需要重新设置模态窗宽度
            if (_this.SWidth != "") {
                let m_top = _modalAll.css("margin-top");
                _modalDialog.css({
                    "width": _this.SWidth + "px"
                });

            }
            //判断是否需要重新设置模态窗高度
            if (_this.Sheight != "") {
                _modalBody.css({
                    "height": _this.Sheight + "px"
                });

            }

            //判断是否需要重新设置模态窗宽度
            if (_this.SMaxWidth != "") {
                let m_top = _modalAll.css("margin-top");
                _modalDialog.css({
                    "max-width": _this.SMaxWidth + "px"
                });
            }

            //判断是否需要重新设置模态窗高度
            if (_this.SMaxheight != "") {
                if (!_this.isText) {
                    _modalBody.children("iframe").css({
                        "max-height": _this.SMaxheight + "px"
                    });
                } else {
                    _modalBody.css({
                        "max-height": _this.SMaxheight + "px"
                    });
                }

            }
            //判断是否需要重新设置模态窗body字体大小
            if (_this.fontSize != "") {
                _modalBody.removeClass("h3").css({
                    "font-size": _this.fontSize + "px"
                });
            } else {
                if (!_modalBody.hasClass("h3")) {
                    _modalBody.addClass("h3")
                }
            }

            //判断是否需要重新设置模态窗body是否包含img标签
            if (_modalBody.children("img").length > 0) {
                _this.moveModal();
                let cHeight = _modalAll.height();
                let cWidth = _modalAll.width();
                _modalDialog.css({
                    "min-width": cWidth * 0.6
                });
                _modalBody.css({
                    "max-height": cHeight * 0.7,
                    "overflow": "auto"
                });
            } else {
                _modalDialog.css({
                    "min-width": "auto"
                });
                _modalBody.css({
                    "max-height": "auto",
                    "overflow-x": "hidden"
                });
            }

            //判断是否需要重新设置模态窗body是否包含iframe标签
            if (_modalBody.children("iframe").length > 0) {
                _this.moveModal();
            }

            //判断是否需要重新设置模态窗body是否包含div标签
            if (_modalBody.children("div").length > 0) {
                _this.moveModal();
            }
            //判断是否重新计算modal的居中效果
            if (_this.resetajust) {
                _this.ajustdialog();
            }
            // $("button.col-xs-6").css({ "border": "0 none", "border-radius": "0", "margin": 0 });
            $(".r-b-1").css({
                "border-right": "1px solid #999"
            });
            $(".modal-body.text-left").css({
                "text-indent": "2em",
                "word-wrap": "break-word"
            });

        },
        /**
         * 绑定事件
         */
        initFunction: function () {
            let _this = this;
            let _modalOld = $("#showModal0" + (_this.modalIndex - 1));
            let _modalAll = $("#showModal" + _this.modalIndex);
            let _modalDialog = _modalAll.children(" .modal-dialog");
            let _modalContent = _modalDialog.children(".modal-content");
            let _modalHeader = _modalContent.children(".modal-header");
            let _modalBody = _modalContent.children(".modal-body");
            let _modalFooter = _modalContent.children(".modal-footer");
      
            if (iE9) {
                _this.callbackShown();
            }
            _modalFooter.find("#close").click(function (event) {
                if (_this.callbackB && _this.Bclose) {
                    if (!_this.callbackBF()) {
                        _this.cancelFlow(event);
                        return;
                    }
                }
            });
            _modalFooter.find("#bcancel").click(function (event) {
                if (_this.callbackQ && _this.Qclose) {
                    if (!_this.callbackQF()) {
                        _this.cancelFlow(event);
                        return;
                    }
                }

            });

            _modalAll.off('shown.bs.modal').on("shown.bs.modal", function () {
                //在模态框完全展示出来做一些动作
                $(document).off('focusin.bs.modal');
                if (_this.modalIndex > 1) {
                    _modalOld.children(".modal-dialog").css({
                        "opacity": 0.8
                    });
                }
                if (!iE9) {
                    _this.callbackShown();
                }
            });
            _modalAll.on("hide.bs.modal", function () {
                if (_this.modalIndex > 1) {
                    _modalOld.children(".modal-dialog").css({
                        "opacity": 1
                    });
                }
                //hide方法后调用
                $(this).remove();
                $(document.body).removeClass("modal-open");
                _modalAll.blur();
                _this.callbackHide();
            });

            $("#btn-zoom").click(function () {
                let _that = $(this);
                _this.moveModal();
                let d_h = document.body.clientHeight;
                let d_w = document.body.clientWidth;
                let s_h = _modalDialog.height();
                let b_h = _this.Sheight.length > 0 ? _this.Sheight : _modalBody.height();
                let s_w = _this.SWidth.length > 0 ? _this.SWidth : _modalDialog.width();
                let m_t = _modalDialog.css('margin-top');

                if (_that.hasClass("glyphicon-zoom-in")) {
                    _that.addClass("glyphicon-zoom-out").removeClass("glyphicon-zoom-in");
                    _that.html("缩小");
                    _modalDialog.attr({
                        "n-height": s_h,
                        "n-width": s_w,
                        "n-margin": m_t
                    }).css({
                        "width": d_w + "px",
                        "margin": "0 auto",
                        "padding": "0"
                    });
                    _modalBody.attr({
                        "n-height": b_h
                    }).css({
                        "height": (d_h - 100) + "px"
                    });
                    _this.Sheight = d_h - 100;
                    _this.SWidth = d_w;
                } else {
                    _that.addClass("glyphicon-zoom-in").removeClass("glyphicon-zoom-out");
                    _that.html("放大");
                    s_h = _modalDialog.attr("n-height");
                    s_w = _modalDialog.attr("n-width");
                    b_h = parseInt(_modalBody.attr("n-height")) + 40;
                    m_t = _modalDialog.attr("n-margin");
                    _modalDialog.css({
                        "margin-top": m_t,
                        "width": s_w + "px"
                    });
                    _modalBody.css({
                        "height": b_h + "px"
                    });
                    _this.Sheight = b_h;
                    _this.SWidth = parseInt(s_w);
                }
                _this.zoomCallback();
            });
        },
        translateJsonToParams: function () {
            let _this = this;
            let _params = _this.data;
            if (_params === null && !_params && typeof _params !== "object") {
                return res;
            }
            let temp = Object.assign({}, _params);
            for (let key in temp) {
                temp[key] = escape(temp[key]);
            }
            let symbol = '=';
            let lastSymbol = '&';
            let res = _this.src + '?';
            for (let key in temp) {
                if (!!temp[key]) {
                    res += key + symbol + temp[key] + lastSymbol;
                }
            }
            res = res.substring(0, res.length - 1); //去掉最后一个多余的lastSymbol
            _this.src = res;
        },
        translateParamsToJson: function () {
            let _this = this;
            let _url = unescape(_this.src);
            let paramsString = _url.substring(_url.indexOf("?") + 1, _url.length).split("&");
            let paramsObj = {};
            for (let i = 0; nameValue = paramsString[i]; i++) {
                let equalIndex = nameValue.indexOf("=");
                let paramStringLength = nameValue.length;
                let _name = nameValue.substring(0, equalIndex);
                let _value = nameValue.substring(equalIndex + 1, paramStringLength);
                if (_value.indexOf("#") > -1) {
                    _value = _value.split("#")[0];
                }
                paramsObj[_name] = _value;
            }
            return paramsObj;
        },
        ajustdialog: function () {
            let _this = this;
            let _modalAll = $("#showModal" + _this.modalIndex);
            let _modalDialog = _modalAll.children(".modal-dialog");
            let _modalBody = _modalDialog.children(".modal-content .modal-body");
            // 获取可视窗口的高度
            let clientHeight = _modalAll.height();
            let dialogHeight, m_top, isMargin;

            if (!_this.isText) {
                //得到dialog的高度
                dialogHeight = _modalDialog.height();
                if (dialogHeight === 0) {
                    dialogHeight = 228;
                }
                if (clientHeight > dialogHeight) {
                    // 计算出距离顶部的高度
                    m_top = Math.abs((clientHeight - dialogHeight) / 2);

                    if (clientHeight > 400) {
                        _modalDialog.css({
                            'margin': m_top + 'px auto',
                            "padding": "0"
                        });
                    } else {
                        _modalDialog.css({
                            'margin': '0px auto'
                        });
                        _modalAll.on("shown.bs.modal", function () {
                            //在模态框加载的同时做一些动作
                            _modalDialog.css({
                                'margin': '0px auto'
                            });
                        });

                    }
                } else {
                    let cHeight = (_modalAll.height() < document.documentElement.clientHeight) ? _modalAll.height() : document.documentElement.clientHeight;
                    let cWidth = _modalAll.width();
                    _modalDialog.css({
                        'margin': '0px auto',
                        "padding": "0"
                    });
                    _modalBody.css({
                        "max-height": cHeight * 0.5,
                        "max-width": cWidth * 0.8,
                        "overflow": "auto"
                    });
                }

            } else {
                // 计算出距离顶部的高度
                m_top = Math.abs((clientHeight - 116) / 2);

                if (clientHeight <= 400) {
                    _modalDialog.css({
                        'padding': m_top + 'px 0'
                    });
                } else {
                    if (_modalBody.children("img").length > 0) {

                        if (clientHeight <= 700) {
                            _modalDialog.css({
                                'padding': '50px 0px 0px 0px',
                                'margin': 'auto'
                            });
                        } else {
                            dialogHeight = _modalDialog.height();
                            if (clientHeight > dialogHeight) {
                                _modalAll.on("shown.bs.modal", function () {
                                    //在模态框加载的同时做一些动作
                                    _modalDialog.css({
                                        'margin': 'auto'
                                    });
                                });
                                _modalDialog.css({
                                    'margin': 'auto'
                                });
                            } else {
                                m_top = Math.abs(clientHeight * 0.25);
                                _modalDialog.css({
                                    'margin': m_top + 'px auto !important'
                                });
                            }


                        }
                    } else {
                        _modalDialog.css({
                            'margin': m_top + 'px auto !important'
                        });
                    }

                }



            }
        },
        moveModal: function () {
            let _this = this;
            let _modalAll = $("#showModal" + _this.modalIndex);
            let _modalDialog = _modalAll.children(".modal-dialog");
            let _modalHeader = _modalDialog.children(".modal-content .modal-header");
            let move = {
                isMove: false,
                left: 0,
                top: 0
            };
            //委托
            _modalHeader.mousedown(function (e) {
                move.isMove = true;
                let offset = _modalDialog.offset();
                move.left = e.pageX - offset.left;
                move.top = e.pageY - offset.top;
            });
            _modalAll.mousemove(function (e) {
                if (!move.isMove) return;
                _modalDialog.offset({
                    top: e.pageY - move.top,
                    left: e.pageX - move.left
                });
            }).mouseup(function (e) {
                move.isMove = false;
            });


        },
        isIE9: function () {
            if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) <= 9) {
                return true;
            } else {
                return false;
            }
        },
        /**
         *在有确认按钮和确认有回调函数情况下的，绑定模态框点击确认之后的回调事件，
         */
        callbackBF: function () {

        },
        /**
         *在有取消按钮和取消有回调函数情况下的，绑定模态框点击确认之后的回调事件，
         */
        callbackQF: function () {

        },
        /**
         *在模态框完全展示出来调用的回调事件，
         */
        callbackShown: function () {

        },
        /**
         *在模态窗关闭之后调用的回调事件，
         */
        callbackHide: function () {

        },
        cancelFlow: function (event) {
            //阻止默认事件
            // 兼容FF和IE和Opera    
            let Event = event || window.event || e;
            if (Event && Event.preventDefault) {
                //因此它支持W3C的stopPropagation()方法
                Event.preventDefault();
                Event.stopPropagation();

            } else {
                //否则，我们需要使用IE的方式来取消事件冒泡
                Event.returnValue = false;
                Event.cancelBubble = true;

                return false;
            }

        },
        closeModal: function () {
            let _this = this;
            if (_this.Tclose) {
                $("#showModal" + _this.modalIndex + " .modal-dialog .modal-content .modal-header #Tclose").click();
            }
        },
        zoomCallback: function () {

        }
    };
    let opts = $.extend(defaults, options);
    opts.init();
}
