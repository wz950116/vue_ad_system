(function(){
    // Array.prototype.indexOf
    (function (ap) {
        if (ap.indexOf) {
            return;
        }
        ap.indexOf = function (val) {
            var r = -1;
            var i, v;
            for (i = 0; i < this.length; i++) {
                v = this[i];
                if (v === val) {
                    r = i;
                }
            }
            return r;
        };
    }(Array.prototype));

    var isSupportPlaceHolder = function () {
        if ("placeholder" in document.createElement("input")) {
            return true;
        } else {
            return false;
        }
    };
    function insertAfter(newEl, targetEl)
    {
        var parentEl = targetEl.parentNode;
        if(parentEl.lastChild == targetEl) {
            parentEl.appendChild(newEl);
        } else {
            parentEl.insertBefore(newEl,targetEl.nextSibling);
        }
    };
    function addEvent(element,e,fn) {
        if(element.addEventListener) {
          element.addEventListener(e,fn,false);
        }
        else {
          element.attachEvent("on"+e,fn);
        }
    }
    //判断对象类型
    function getType(o){
        var _t;
        return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
    }
    //获取元素样式
    function getStyle(el, styleName) {
        return el.style[styleName] ? el.style[styleName] : el.currentStyle ? el.currentStyle[styleName] : window.getComputedStyle(el, null)[styleName];
    }
    function getStyleNum(el, styleName) {
        return parseInt(getStyle(el, styleName).replace(/px|pt|em/ig,''));
    }
    function setStyle(el, obj){
        if (getType(obj) == "object") {
            for (s in obj) { 
                var cssArrt = s.split("-");
                for (var i = 1; i < cssArrt.length; i++) {
                    cssArrt[i] = cssArrt[i].replace(cssArrt[i].charAt(0), cssArrt[i].charAt(0).toUpperCase());
                }
                var cssArrtnew = cssArrt.join("");
                el.style[cssArrtnew] = obj[s];
            }
        } else if (getType(obj) == "string") {
            el.style.cssText = obj;
        }
    }
    function getSize(el) {
        if (getStyle(el, "display") != "none") {
            return { width: el.offsetWidth || getStyleNum(el, "width"), height: el.offsetHeight || getStyleNum(el, "height") };
        }
        var _addCss = { display: "", position: "absolute", visibility: 'hidden' };
        var _oldCss = {};
        for (i in _addCss) {
            _oldCss[i] = getStyle(el, i);
        }
        setStyle(el, _addCss);
        var _width = el.clientWidth || getStyleNum(el, "width");
        var _height = el.clientHeight || getStyleNum(el, "height");
        for (i in _oldCss) {
            setStyle(el, _oldCss);
        }
        return { width: _width, height: _height };
    } 
    var checkedInput = function () {
        [].forEach.call(document.querySelectorAll("input"), function (ele) {
            var _this= ele;
            var thisParent = ele.parentNode;
             thisParent.style.position = "relative";
            var thisType = ele.getAttribute("type");
            var thisPlaceHolder = ele.getAttribute("placeholder");
            var thisPaddLeft = parseFloat(getStyle(_this,"paddingLeft"));
            var thisPaddTop = parseFloat(getStyle(_this,"paddingTop"));
            var thisParentPaddLeft = parseFloat(getStyle(thisParent,"paddingLeft"));
            var thisParentPaddTop = parseFloat(getStyle(thisParent,"paddingTop"));
            var thisWidth = getSize(_this).width;
            var thisHeight = getSize(_this).height;         
            var list = [ 'text', 'password', 'url', 'email' ];
            var posLeft = 0;
            var posTop = 0;
            if (list.indexOf(thisType) >= 0) {
                posLeft = parseFloat(_this.offsetLeft) + thisPaddLeft + thisParentPaddLeft;//假placeholder left值
                posTop = parseFloat(_this.offsetTop) + thisPaddTop + + thisParentPaddTop;  //假placeholder top值
            }
            if (!_this.getAttribute('data-placeholder-mark') && _this.value == "" && _this.getAttribute('placeholder')) {
                 _this.setAttribute('data-placeholder-mark', Math.random());
                 var markData = _this.getAttribute('data-placeholder-mark');
                 var newSpan = "";
                 newSpan = document.createElement("span");
                 newSpan.setAttribute('data-placeholder-mark', markData);
                 newSpan.className= 'placeholder-style';
                 newSpan.style.top = posTop + "px";
                 newSpan.style.left = posLeft + "px";
                 newSpan.style.width = thisWidth + "px";
                 newSpan.style.height = thisHeight + "px";
                 newSpan.style.lineHeight = thisHeight + "px";
                 newSpan.innerHTML = thisPlaceHolder;
                 insertAfter(newSpan, _this);
                 var spanEle = thisParent.querySelector('span[data-placeholder-mark="' + markData + '"]')
                 if (_this.value == "") {
                     spanEle.style.display = 'block';
                     addEvent(spanEle, "click", function () {
                         spanEle.style.display = 'none';
                         _this.focus();
                     });
                 }
                 addEvent(_this, "blur", function () {
                     if (_this.value === '') {
                         spanEle.style.display = 'block';
                     }
                 });
                 addEvent(_this, "focus", function () {
                     if (_this.value === '') {
                         spanEle.style.display = 'none';
                     }
                 });
                 addEvent(_this, "change", function () {
                     if (_this.value != '') {
                         spanEle.style.display = 'none';
                     }
                 });
                 setInterval(function () {
                    if (_this.value != '') {
                         spanEle.style.display = 'none';
                     }
                    posLeft = parseFloat(parseFloat(_this.offsetLeft) + thisPaddLeft + thisParentPaddLeft);//假placeholder left值
                    newSpan.style.left = posLeft + "px";
                 }, 200);
            }
        })
    };
    //不支持placeholder触发

    if(!isSupportPlaceHolder()) {
        setInterval(function () {
            checkedInput();
        }, 1000);
    }
})();