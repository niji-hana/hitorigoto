// 展開するツリーメニュー
var tree_gecko = (navigator.userAgent.indexOf("Gecko") >= 0) ? 1 : 0;
function tree_init() {
    if(!document.getElementById) return;
    var obj = document.getElementById(tree_id);
    if(!obj) { setTimeout("tree_init()", 500); return; }
    var i;
    for(i = 0; i < obj.childNodes.length; i++) {
        if(obj.childNodes[i].nodeName == "UL") {
            var ul = obj.childNodes[i];
            ul.onclick = tree_onclick;
            ul.style.cursor = tree_gecko ? "pointer" : "hand";
            tree_init_ul(ul);
        }
    }
    obj.style.visibility = "visible";
}
function tree_init_ul(ul) {
    var i;
    for(i = 0; i < ul.childNodes.length; i++) {
        if(ul.childNodes[i].nodeName == "LI") {
            tree_init_li(ul.childNodes[i]);
        }
    }
}
function tree_init_li(li) {
    var i;
    var f = 0;
    for(i = 0; i < li.childNodes.length; i++) {
        if(li.childNodes[i].nodeName == "UL") {
            f = 1;
            tree_init_ul(li.childNodes[i]);
            if(li.className != tree_openclass)
                li.childNodes[i].style.display = "none";
        }
    }
    if(!tree_gecko) {
        if(f) {
            if(li.className == tree_openclass)
                li.style.listStyleImage = "url(" + tree_open + ")";
            else
                li.style.listStyleImage = "url(" + tree_close + ")";
        }
        else li.style.listStyleImage = "url(" + tree_none + ")";
    }
}
function tree_onclick(e) {
    var src;
    if(window.event) {
        window.event.cancelBubble = true;
        src = window.event.srcElement;
    }
    else if(e) {
        src = e.target;
        e.stopPropagation();
    }
    if(src.nodeName == "UL" || src.nodeName == "LI") return;
    while(1) {
        if(src.nodeName == "LI") break;
        src = src.parentNode;
    }
    var i;
    for(i = 0; i < src.childNodes.length; i++) {
        if(src.childNodes[i].nodeName == "UL") {
            var ul = src.childNodes[i];
            if(ul.style.display == "none") {
                ul.style.display = "block";
                if(!tree_gecko)
                    src.style.listStyleImage = "url(" + tree_open + ")";
            }
            else {
                ul.style.display = "none";
                if(!tree_gecko)
                    src.style.listStyleImage = "url(" + tree_close + ")";
            }
        }
    }
}
