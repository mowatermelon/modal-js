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
        title: "提示信息",    //设置模态窗标题
        modalIndex: "01",    //设置模态窗索引值，默认只使用一次弹窗，模态窗的序号默认为01
        titleCenter: false,    //设置模态窗标题是否水平居中显示，默认为false,默认左对齐
        isText: true,  //判断传进来content的是否为Text,默认为true
        content: "提示内容",  //如果传进来content的为Text，通过修改text内容设置模态窗内容
        contentLeft: false,    //设置模态窗content是否左对齐显示，默认为false
        fontSize: "",  //如果传进来content的为Text，可以修改字体大小,默认是24px,h3大小，请输入具体像素值,例如10
        src: "",  //如果传进来content的为iframe，通过修改iframe地址来设置模态窗内容
        hideClick: true, //boolean 或 string 'static',设置点击modal遮罩层是否隐藏modal，默认为true,如果设置为'static',则点击背景模态窗不会关闭
        Tclose: true,  //设置右上角关闭按钮是否显示，默认为显示
        Bclose: true,  //设置右下角关闭按钮是否显示，默认为显示
        Qclose: false,  //设置右下角关闭按钮是否显示，默认为关闭
        Sheight: "",  //设置模态窗高度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        SMaxheight: "",  //设置模态窗最高高度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        SWidth: "",  //设置模态宽度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        SMaxWidth: "",  //设置模态最大宽度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
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
            let parentdiv = "<div class='modal fade show_Modal' id='showModal" + this.modalIndex + "' tabindex='-1' role='dialog' aria-hidden='true' ><div class='modal-dialog modal-dialog-centered' role='document'><div class='modal-content'>";        //创建一个modaldiv
            let headerdiv = "<div class='modal-header ";
            if (this.titleCenter) {
                headerdiv += " text-center ";
            }
            headerdiv += "bg-" + this.flag + "' ><span class='modal-title' id='showLabel'>" + this.title + "</span>";

            headerdiv += "<div class='btn-toolbar' role='toolbar'>";

            if (this.isZoom) {
                headerdiv += "<button id='btn-zoom' class='btn btn-info glyphicon glyphicon-zoom-in'>放大</button>\n";
            }

            if (this.Tclose) {
                headerdiv += "<button type='button' class='close' id='Tclose'  data-dismiss='modal' aria-hidden='true'>&times;</button>";
            }

            headerdiv += "</div></div>\n";

            let contentdiv;
            if (this.isText) {
                if (this.contentLeft) {
                    contentdiv = "<div class='modal-body text-left h3 bg-white'>" + this.content + "</div>\n";        //创建contentdiv
                } else {
                    contentdiv = "<div class='modal-body text-center h3 bg-white'>" + this.content + "</div>\n";        //创建contentdiv                    
                }
            } else {
                contentdiv = "<div class='modal-body text-center h3 bg-white'><iframe src='" + this.src + "' id='modalIframe' name= 'modal_Iframe'></iframe></div>\n";        //创建contentdiv  
            }

            let footerdiv = "<div class='modal-footer bg-light'>";

            if (this.Bclose && this.Qclose) {
                if (this.Justify) {
                    footerdiv += "<div class='row'><button type='button' class='col r-b-1 btn btn-link' data-dismiss='modal' id='close'>" + this.BcloseText + "</button><button type='button' class='col btn btn-link' data-dismiss='modal' id='bcancel'>" + this.QcloseText + "</button></div>";        //创建footerdiv                   
                } else {
                    footerdiv += "<button type='button' class='btn btn-" + this.flag + "' data-dismiss='modal' id='close'>" + this.BcloseText + "</button><button type='button' class='btn btn-secondary' data-dismiss='modal' id='bcancel'>" + this.QcloseText + "</button>";        //创建footerdiv
                }
            } else {
                if (this.Bclose) {
                    footerdiv += "<button type='button' class='btn btn-block btn-link' data-dismiss='modal' id='close'>" + this.BcloseText + "</button>";
                }
                if (this.Qclose) {
                    footerdiv += "<button type='button' class='btn btn-link' data-dismiss='modal' id='bcancel'>" + this.QcloseText + "</button>";
                }

            }
            footerdiv += "</div>";

            parentdiv += headerdiv + contentdiv + footerdiv + "</div></div></div>";

            $(document.body).append(parentdiv);
            let _this = this;
            $("#showModal" + this.modalIndex).modal({ keyboard: false, backdrop: _this.hideClick });
            iE9 = this.isIE9();
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
        * 绑定事件
        */
        initCss: function () {
            $(".show_Modal.modal .modal-dialog .modal-content").css({ "border-radius": "15px", "background-color": "transparent" });
            $(".show_Modal.modal .modal-dialog .modal-content .modal-header").css({ "padding": "5px" });
            $(".show_Modal.modal .modal-dialog .modal-content .modal-body").css({ "margin-bottom": "0" });
            $(".show_Modal.modal .modal-dialog .modal-content .modal-header .modal-title,.show_Modal.modal .modal-dialog .modal-content .modal-header .close").css({ "font-size": "20px", "color": "#fff", "line-height": "40px" });
            $(".show_Modal.modal .modal-dialog .modal-content .modal-header .modal-title").css({ "padding-left": "20px", "padding-right": "20px" });
            $(".show_Modal.modal .modal-dialog .modal-content .modal-header .close").css({ "margin": 0, "padding": "0 10px 0 0" });

            $(".show_Modal.modal .modal-dialog .modal-content .modal-header .glyphicon").css({ "line-height": "25px" });
            $(".show_Modal.modal .modal-dialog .modal-content  .modal-header").css({ "border-radius": "15px 15px 0 0", "border-bottom": "1px solid #e5e5e5" });
            $(".show_Modal.modal .modal-dialog .modal-content  .modal-header.bg-info").css({ "box-shadow": "rgb(53, 172, 197) 0px 3px 8px 1px inset" });
            $(".show_Modal.modal .modal-dialog .modal-content .modal-footer").css({ "margin-top": "0px", "border-radius": "0 0 15px 15px", "padding": "5px" });
            $(".show_Modal.modal .modal-dialog .modal-content .modal-footer .row").css({ "width": "100%" });
            $(".show_Modal.modal .modal-dialog .modal-content .modal-footer .row .btn-link").css({ "font-size": "18px" });
            //判断modalbody是否为文本类型
            if (!this.isText) {
                if (!this.iframePadding) {
                    $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").css({ "padding": "0", "overflow": "hidden" });
                }
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body #modalIframe").css({ "border": "0 none #eee", "width": "100%", "margin": "0 auto", "height": "99%" });

            }
            //判断是否需要重新设置模态窗宽度
            if (this.SWidth != "") {
                let m_top = $("#showModal" + this.modalIndex).css("margin-top");
                $("#showModal" + this.modalIndex + " .modal-dialog").css({ "width": this.SWidth + "px" });


            }
            //判断是否需要重新设置模态窗高度
            if (this.Sheight != "") {
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").css({ "height": this.Sheight + "px" });

            }

            //判断是否需要重新设置模态窗宽度
            if (this.SMaxWidth != "") {
                let m_top = $("#showModal" + this.modalIndex).css("margin-top");
                $("#showModal" + this.modalIndex + " .modal-dialog").css({ "max-width": this.SMaxWidth + "px" });


            }
            //判断是否需要重新设置模态窗高度
            if (this.SMaxheight != "") {
                //$(".show_Modal.modal,.show_Modal.modal .modal-dialog").css({ "height": this.Sheight + "px" });
                if (!this.isText) {
                    $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body iframe").css({ "max-height": this.SMaxheight + "px" });
                } else {
                    $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").css({ "max-height": this.SMaxheight + "px" });
                }

            }
            //判断是否需要重新设置模态窗body字体大小
            if (this.fontSize != "") {
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-body").removeClass("h3").css({ "font-size": this.fontSize + "px" });
            } else {
                if (!$("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").hasClass("h3")) {
                    $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").addClass("h3")
                }
            }

            //判断是否需要重新设置模态窗body是否包含img标签
            if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-body").children("img").length > 0) {
                this.moveModal();
                let cHeight = $("#showModal" + this.modalIndex).height();
                let cWidth = $("#showModal" + this.modalIndex).width();
                $("#showModal" + this.modalIndex + " .modal-dialog").css({ "min-width": cWidth * 0.6 });
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").css({ "max-height": cHeight * 0.7, "overflow": "auto" });
            } else {
                $("#showModal" + this.modalIndex + " .modal-dialog").css({ "min-width": "auto" });
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").css({ "max-height": "auto", "overflow-x": "hidden" });
            }

            //判断是否需要重新设置模态窗body是否包含iframe标签
            if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").children("iframe").length > 0) {
                this.moveModal();
            }

            //判断是否需要重新设置模态窗body是否包含div标签
            if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").children("div").length > 0) {
                this.moveModal();
            }
            //判断是否重新计算modal的居中效果
            if (this.resetajust) {
                this.ajustdialog();
            }
            // $("button.col-xs-6").css({ "border": "0 none", "border-radius": "0", "margin": 0 });
            $(".r-b-1").css({ "border-right": "1px solid #999" });
            $(".modal-body.text-left").css({ "text-indent": "2em", "word-wrap": "break-word" });

        },
        initFunction: function () {
            let _this = this;
            if (iE9) {
                _this.callbackShown();
            }
            $("#showModal" + _this.modalIndex + " #close").click(function (event) {
                if (_this.callbackB && _this.Bclose) {
                    if (!_this.callbackBF()) {
                        _this.cancelFlow(event);
                        return;
                    }
                }
            });
            $("#showModal" + _this.modalIndex + " #bcancel").click(function (event) {
                if (_this.callbackQ && _this.Qclose) {
                    if (!_this.callbackQF()) {
                        _this.cancelFlow(event);
                        return;
                    }
                }

            });

            $("#showModal" + _this.modalIndex).off('shown.bs.modal').on("shown.bs.modal", function () {
                //在模态框完全展示出来做一些动作
                $(document).off('focusin.bs.modal');
                //$(document.body).blur();
                //$("#showModal" + this.modalIndex).on('focusin.bs.modal');
                if (_this.modalIndex > 1) {
                    $("#showModal0" + (_this.modalIndex - 1) + " .modal-dialog").css({ "opacity": 0.8 });
                }
                if (!iE9) {
                    _this.callbackShown();
                }
            });
            $("#showModal" + _this.modalIndex).on("hide.bs.modal", function () {
                if (_this.modalIndex > 1) {
                    $("#showModal0" + (_this.modalIndex - 1) + " .modal-dialog").css({ "opacity": 1 });
                }
                //hide方法后调用
                $(this).remove();
                $(document.body).removeClass("modal-open");
                $("#showModal" + this.modalIndex).blur();
                _this.callbackHide();
            });

            $("#btn-zoom").click(function () {
                let _that = $(this);
                _this.moveModal();
                let d_h = document.body.clientHeight;
                let d_w = document.body.clientWidth;
                let s_h = $("#showModal" + _this.modalIndex + " .modal-dialog").height();
                let b_h = _this.Sheight.length > 0 ? _this.Sheight : $("#showModal" + _this.modalIndex + " .modal-dialog .modal-content .modal-body").height();
                let s_w = _this.SWidth.length > 0 ? _this.SWidth : $("#showModal" + _this.modalIndex + " .modal-dialog").width();
                let m_t = $("#showModal" + _this.modalIndex + " .modal-dialog").css('margin-top');

                if (_that.hasClass("glyphicon-zoom-in")) {
                    _that.addClass("glyphicon-zoom-out").removeClass("glyphicon-zoom-in");
                    _that.html("缩小");
                    $("#showModal" + _this.modalIndex + " .modal-dialog").attr({ "n-height": s_h, "n-width": s_w, "n-margin": m_t }).css({ "width": d_w + "px", "margin": "0 auto", "padding": "0" });
                    $("#showModal" + _this.modalIndex + " .modal-dialog .modal-content .modal-body").attr({ "n-height": b_h }).css({ "height": (d_h - 100) + "px" });
                    _this.Sheight = d_h - 100;
                    _this.SWidth = d_w;
                } else {
                    _that.addClass("glyphicon-zoom-in").removeClass("glyphicon-zoom-out");
                    _that.html("放大");
                    s_h = $("#showModal" + _this.modalIndex + " .modal-dialog").attr("n-height");
                    s_w = $("#showModal" + _this.modalIndex + " .modal-dialog").attr("n-width");
                    b_h = parseInt($("#showModal" + _this.modalIndex + " .modal-dialog .modal-content .modal-body").attr("n-height")) + 40;
                    m_t = $("#showModal" + _this.modalIndex + " .modal-dialog").attr("n-margin");
                    $("#showModal" + _this.modalIndex + " .modal-dialog").css({ "margin-top": m_t, "width": s_w + "px" });
                    $("#showModal" + _this.modalIndex + " .modal-dialog .modal-body").css({ "height": b_h + "px" });
                    _this.Sheight = b_h;
                    _this.SWidth = parseInt(s_w);
                }
                _this.zoomCallback();
            });
        },
        ajustdialog: function () {
            // debugger;
            // 使弹出框居中。。。  
            let $modal_dialog = $("#showModal" + this.modalIndex).find('.modal-dialog');
            //获取可视窗口的高度  
            if ($("#showModal" + this.modalIndex).height() > window.screen.height - 355) {
                //$("#showModal" + this.modalIndex).height(window.screen.height - 355);
            }
            let clientHeight = $("#showModal" + this.modalIndex).height();
            let dialogHeight, m_top, isMargin;

            if (!this.isText) {
                //得到dialog的高度  
                dialogHeight = $modal_dialog.height();
                if (dialogHeight === 0) {
                    dialogHeight = 228;
                }
                if (clientHeight > dialogHeight) {
                    //计算出距离顶部的高度 
                    m_top = Math.abs((clientHeight - dialogHeight) / 2);

                    if (clientHeight > 400) {
                        $modal_dialog.css({ 'margin': m_top + 'px auto', "padding": "0" });
                    } else {
                        $modal_dialog.css({ 'margin': '0px auto' });
                        $("#showModal" + this.modalIndex).on("shown.bs.modal", function () {
                            //在模态框加载的同时做一些动作
                            $modal_dialog.css({ 'margin': '0px auto' });
                        });

                    }
                } else {
                    let cHeight = ($("#showModal" + this.modalIndex).height() < document.documentElement.clientHeight) ? $("#showModal" + this.modalIndex).height() : document.documentElement.clientHeight;
                    let cWidth = $("#showModal" + this.modalIndex).width();
                    $modal_dialog.css({ 'margin': '0px auto', "padding": "0" });
                    $modal_dialog.children(".modal-body").css({ "max-height": cHeight * 0.5, "max-width": cWidth * 0.8, "overflow": "auto" });
                }

            } else {
                //计算出距离顶部的高度 
                m_top = Math.abs((clientHeight - 116) / 2);
                //m_top = $modal_dialog.css('margin-top');

                if (clientHeight <= 400) {
                    $modal_dialog.css({ 'padding': m_top + 'px 0' });
                } else {
                    if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").children("img").length > 0) {
                        //console.log("clientHeight" + clientHeight);

                        if (clientHeight <= 700) {
                            $modal_dialog.css({ 'padding': '50px 0px 0px 0px', 'margin': 'auto' });
                        }
                        else {
                            dialogHeight = $modal_dialog.height();
                            //console.log("dialogHeight" + dialogHeight);
                            if (clientHeight > dialogHeight) {
                                $("#showModal" + this.modalIndex).on("shown.bs.modal", function () {
                                    //计算出距离顶部的高度 

                                    //在模态框加载的同时做一些动作
                                    $modal_dialog.css({ 'margin': 'auto' });
                                });
                                $modal_dialog.css({ 'margin': 'auto' });
                            } else {
                                m_top = Math.abs(clientHeight * 0.25);
                                $modal_dialog.css({ 'margin': m_top + 'px auto !important' });
                            }


                        }
                    } else {
                        $modal_dialog.css({ 'margin': m_top + 'px auto !important' });
                    }

                }



            }
        },
        moveModal: function () {
            let $dialog = $("#showModal" + this.modalIndex).find('.modal-dialog');
            let $head = $dialog.children().eq(0);
            let move = {
                isMove: false,
                left: 0,
                top: 0
            };
            //委托
            $head.mousedown(function (e) {
                move.isMove = true;
                let offset = $dialog.offset();
                move.left = e.pageX - offset.left;
                move.top = e.pageY - offset.top;
            });
            $("#showModal" + this.modalIndex).mousemove(function (e) {
                if (!move.isMove) return;
                $dialog.offset({
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

            }
            else {
                //否则，我们需要使用IE的方式来取消事件冒泡 
                Event.returnValue = false;
                Event.cancelBubble = true;

                return false;
            }

        },
        closeModal: function () {
            if (this.Tclose) {
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-header #Tclose").click();
            }
        },
        zoomCallback: function () {

        }
    };
    let opts = $.extend(defaults, options);
    opts.init();
}