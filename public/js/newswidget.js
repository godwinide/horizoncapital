function showNews(i, t, e, o, n, r, d, a, l) {
    n = void 0 === n ? "f93" : n, r = void 0 === r ? "f93" : r, a = void 0 === a ? 495 : a, d = void 0 === d ? "777" : d, l = void 0 !== l && l;
    var h = document.getElementById("cr-copyright");
    h && h.parentNode.removeChild(h);
    var p = "",
        m = "",
        c = "";
    1 == t ? (p = "100%", m = "100%") : (p = Number(i).toString() + "px; ", m = i.toString() + "px; "), document.body.clientWidth < 415 && (p = "100%", m = "100%"), e > 0 && (c = " padding:10px; ");
    var s = '<div style="display:inline-block; width:' + p + ';"><h1 style="text-align:center; font:23px verdana !important; text-decoration:none !important; font-weight:normal !important; color:#' + d + '; margin-bottom:5px;">Cryptocurrency News</h1><div style="min-width:320px; width:' + p + "; min-height:" + a + "px; height:" + a + "px; max-height:" + a + "px;" + c + "border:" + e + "px solid #" + o + ';display:inline-block; box-sizing:unset;"><iframe src="' + (1 == l ? "//" + location.hostname : "https://cryptorival.com") + "/widget/news/?linkColor=" + n + "&hoverColor=" + r + '" allowtransparency="false" scrolling="yes" frameborder="0" border="0" cellspacing="0" style="height:' + a + "px; width:" + m + "; min-width:320px; min-height:" + a + "px; max-height:" + a + 'px;"></iframe></div></div>';
    document.write(s)
}