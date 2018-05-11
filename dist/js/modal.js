/**
* @ show modal
* @ version 4.0
* @ author WU EVA
**/

//这个版本是移动版的modal js，在移动端使用最佳

let  showmodal = function (options) {
    let  defaults = {
        isText: true,  //判断传进来content的是否为Text,默认为true
        modalIndex: "01",    //设置模态窗索引值，默认只使用一次弹窗，模态窗的序号默认为01
        content: "提示内容",  //如果传进来content的为Text，通过修改text内容设置模态窗内容
        contentLeft: false,    //设置模态窗content是否左对齐显示，默认为false
        fontSize: "",  //如果传进来content的为Text，可以修改字体大小,默认是24px,h3大小，请输入具体像素值
        src: "",  //如果传进来content的为iframe，通过修改iframe地址来设置模态窗内容
        Bclose: true,  //设置右下角关闭按钮是否显示，默认为显示
        Qclose: false,  //设置右下角关闭按钮是否显示，默认为关闭
        Sheight: "",  //设置模态窗高度，请输入具体的正整数像素值，默认为auto
        SWidth: "",  //设置模态宽度，请输入具体的正整数像素值，默认为auto
        hideClick: true, //boolean 或 string 'static',设置点击modal遮罩层是否隐藏modal，默认为true,如果设置为'static',则点击背景模态窗不会关闭
        Justify: true, //设置底部按钮是否两端对齐，主要使用状态在底部有两个按钮，希望一左一右的显示，默认为true        
        callbackB: false, //确认确认按钮有没有回调函数，默认为false
        callbackQ: false, //确认取消按钮有没有回调函数，默认为false
        BcloseText: "确定", //设置右下角关闭按钮的文本内容，默认为确定
        QcloseText: "取消", //设置右下角关闭按钮的文本内容，默认为取消
        iframePadding: false, //当body的内容为iframe的时候，是否设置padding，默认为false           
        /**
        * 初始化DOM结构
        */
        initDom: function () {
            let parentdiv = "<div class='modal fade show_Modal' id='showModal" + this.modalIndex + "' tabindex='-1' role='dialog' aria-hidden='true' ><div class='modal-dialog modal-dialog-centered' role='document'><div class='modal-content'>";        //创建一个modaldiv
            let  contentdiv;
            if (this.isText) {
                if (this.contentLeft) {
                    contentdiv = "<div class='modal-body text-left h3 bg-faded'>" + this.content + "</div>\n";        //创建contentdiv
                } else {
                    contentdiv = "<div class='modal-body text-center h3 bg-faded'>" + this.content + "</div>\n";        //创建contentdiv                    
                }
            } else {
                contentdiv = "<div class='modal-body text-center h5 bg-faded'><iframe src='" + this.src + "' id='modalIframe'></iframe></div>\n";        //创建contentdiv  
            }

            let footerdiv = "<div class='modal-footer bg-light'>";

            if (this.Bclose && this.Qclose) {
                if (this.Justify) {
                    footerdiv += "<div class='row'><button type='button' class='col r-b-1 btn btn-link' data-dismiss='modal' id='close'>" + this.BcloseText + "</button><button type='button' class='col btn btn-link' data-dismiss='modal' id='bcancel'>" + this.QcloseText + "</button></div>";        //创建footerdiv                   
                } else {
                    footerdiv += "<button type='button' class='btn btn-link' data-dismiss='modal' id='close'>" + this.BcloseText + "</button><button type='button' class='btn btn-link' data-dismiss='modal' id='bcancel'>" + this.QcloseText + "</button>";        //创建footerdiv
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
            parentdiv = parentdiv + contentdiv + footerdiv + "</div></div></div>";
            $(document.body).append(parentdiv);
            let  _this = this;
            $("#showModal" + this.modalIndex).modal({ keyboard: false, backdrop: _this.hideClick });


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
            $(".show_Modal.modal .modal-dialog .modal-content").css({ "border-radius": "12px" });
            $("#showModal" + this.modalIndex + "  .modal-dialog .modal-content .modal-body").css({ "border-radius": "12px 12px 0 0","background-color": "#fff" });
            $("#showModal" + this.modalIndex + "  .modal-dialog .modal-content .modal-footer").css({ "margin-top": "0", "border-radius": "0 0 12px 12px", "padding": "0" });
            $("#showModal" + this.modalIndex + "  .modal-dialog .modal-content .modal-footer:empty").css({ "display": "none" });            
            $(".show_Modal.modal .modal-dialog .modal-content .modal-footer .row").css({ "width": "100%","margin":0 });
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
                let  m_top = $("#showModal" + this.modalIndex).css("margin-top");
                $("#showModal" + this.modalIndex + " .modal-dialog").css({ "width": this.SWidth + "px","margin":"0 auto" });


            }
            //判断是否需要重新设置模态窗高度
            if (this.Sheight != "") {
                $("#showModal" + this.modalIndex + "  .modal-dialog .modal-content .modal-body").css({ "height": this.Sheight + "px" });

            }
            //判断是否需要重新设置模态窗body字体大小
            if (this.fontSize != "") {
                $("#showModal" + this.modalIndex + "  .modal-dialog .modal-content .modal-body").removeClass("h5").css({ "font-size": this.fontSize + "px" });
            } else {
                if (!$("#showModal" + this.modalIndex + "  .modal-dialog .modal-content .modal-body").hasClass("h5")) {
                    $("#showModal" + this.modalIndex + "  .modal-dialog .modal-content .modal-body").addClass("h5")
                }
            }

            //判断是否需要重新设置模态窗body是否包含img标签
            if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").children("img").length > 0) {

                let  cHeight = $("#showModal" + this.modalIndex).height();
                let  cWidth = $("#showModal" + this.modalIndex).width();
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").css({ "max-height": cHeight * 0.7, "max-width": cWidth * 0.8, "overflow": "auto" });
            } else {
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-content .modal-body").css({ "max-height": "auto", "max-width": "auto", "overflow-x": "hidden" });
            }

            $(".modal-body.text-left").css({ "text-indent": "2em", "word-wrap": "break-word" });
        },
        initFunction: function () {
            let  _this = this;
            $("#showModal" + _this.modalIndex + " #close").click(function () {
                if (_this.callbackB && _this.Bclose) {
                    if (!_this.callbackBF()) {
                        _this.cancelFlow();
                        return;
                    }
                }

            });
            $("#showModal" + _this.modalIndex + " #bcancel").click(function () {
                if (_this.callbackQ && _this.Qclose) {
                    if (!_this.callbackQF()) {
                        _this.cancelFlow();
                        return;
                    }
                }

            });

            $("#showModal" + _this.modalIndex).off('shown.bs.modal').on("shown.bs.modal", function () {
                if (_this.modalIndex > 1) {
                    $("#showModal0" + (_this.modalIndex - 1) + " .modal-dialog").css({ "opacity": 0.8 });
                }
                _this.callbackShown();
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
        cancelFlow: function () {
            //阻止默认事件
            // 兼容FF和IE和Opera    
            let  Event = event || window.event;
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

        }

    };
    let  opts = $.extend(defaults, options);
    opts.init();
}
