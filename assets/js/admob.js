if (typeof _admob == "undefined") {
    var _admob = function () {
        var Q = "http://mmv.admob.com/static/iphone";
        var R = {};
        var B = 0;
        var E = false;
        var D = null;
        var L = null;
        var N = false;
        var S = RegExp("Android (1|2).").test(navigator.userAgent);
        var A = RegExp("OS [2-5]_[^ ]* .* AppleWebKit").test(navigator.userAgent);
        var T = "20100322-iFumar-32e2f06531a21bf4";
        var K = "20100524-iSafari-aab64cf8cc87d083";
        var J = function (Y) {
            var Z = R[0].shim;
            var X = R[0].ad;
            var V = false;
            if (S) {
                L = parseInt(window.getComputedStyle(Z).getPropertyValue("width"), 10)
            } else {
                L = window.innerWidth
            }
            X.style.width = L + "px";
            X.style.height = L * 0.15 + "px";
            X.style.left = window.scrollX + "px";
            X.style.top = 0;
            Z.style.height = L * 0.15 + "px";
            var W = F("admob-back-0");
            if (W) {
                W.style["-webkit-transform"] = "scale(" + L / 320 + ")";
                W.style.left = (L - 320) / 2 + window.scrollX + "px";
                W.style.top = (L * 0.9375 - 300) / 2 + "px"
            }
            if (X.contentWindow.ADMOB) {
                X.contentWindow.ADMOB.resize(L)
            }
        };
        var F = function (V) {
            return document.getElementById(V)
        };
        var H = function (V, W) {
            return W && (" " + V.className + " ").indexOf(" " + W + " ") != -1
        };
        var C = function (V, W) {
            if (V) {
                if (!H(V, W)) {
                    V.className += (V.className ? " " : "") + W
                }
                return V
            }
            return null
        };
        var I = function (V, W) {
            if (V) {
                V.className = V.className.replace(new RegExp("(^|\\s+)" + W + "(\\s+|$)"), " ").replace(/^\s+|\s+$/g, "");
                return V
            }
            return null
        };
        var P = function (V) {
            var W = {
                position: "absolute",
                left: "0px",
                padding: 0,
                margin: 0,
                border: 0
            };
            if (N) {
                W["-webkit-transition-property"] = "left";
                W["-webkit-transition-duration"] = ".25s"
            }
            return _admob.dom.createElement(["iframe", {
                src: "about:blank",
                frameBorder: 0,
                width: 320,
                height: 0,
                scrolling: "no",
                id: "aframe" + V
            }, W])
        };
        var G = function (V) {
            var W = _admob.dom.createElement(["div", {
                id: "admob-back-" + V,
                className: "admob-outer-container"
            }, {}, [
                ["div", {
                    id: "admob-back-anim-container-" + V,
                    className: "admob-animation-container"
                }, {}, [
                    ["div", {
                        id: "admob-back-content-" + V,
                        className: "admob-back"
                    }, {}, [
                        ["div", {
                            className: "admob-back-title"
                        }, {}, [
                            ["div", {
                                id: "admob-back-text-" + V,
                                className: "admob-back-text"
                            }, {}],
                            ["div", {
                                id: "admob-back-done-" + V,
                                className: "admob-back-done"
                            }, {}, [
                                ["img", {
                                    src: Q + "/img/done_btn.png"
                                }, {}]
                            ]]
                        ]],
                        ["div", {
                            id: "admob-canvas-content-" + V
                        }, {}]
                    ]]
                ]]
            ]]);
            return W
        };
        var M = function (V) {
            var W = curtop = 0;
            if (V.offsetParent) {
                do {
                    W += V.offsetLeft;
                    curtop += V.offsetTop
                } while (V = V.offsetParent)
            }
            return [W, curtop]
        };
        var O = function (Z, V) {
            var Y = Z.contentDocument;
            var X = _admob.vars_cache[V] || _admob.vars_cache[0];
            var W = Y.createElementNS("http://www.w3.org/1999/xhtml", "html:script");
            W.src = Q + "/ad.js?1274801737";
            Y.open();
            Y.write(['<link rel="stylesheet" type="text/css" href="', Q + '/ad.css" /><span style="display: none" id="admob_vars">', "{frameNum: ", V, ', text: "', X.text, '", bg: "', X.bgcolor, '", pubid: "', X.pubid, '", sdk: ', (X.sdk ? "true" : "false"), ", confirm: ", (X.confirm ? "true" : "false"), ", test: ", (X.test ? "true" : "null"), ", test_action: ", (X.test_action ? '"' + X.test_action + '"' : "null"), ", ama: ", (X.ama ? "true" : "null"), ", new_window: ", (X.new_window ? "true" : "null"), ', v: "', (X.v ? X.v : K), '", isu: "', X.isu, '", ti: "', (X.ti ? X.ti : "null"), '"}</span>', '<div style="width: 320px" id="starter-node"></div>'].join(""));
            Y.close();
            Y.getElementById("starter-node").appendChild(W)
        };
        var U = function (V) {
            if (D) {
                window.clearTimeout(D)
            }
            D = window.setTimeout(function () {
                J.apply(this, [V])
            }, 20)
        };
        return {
            vars_cache: [],
            initAma: function () {
                if (!A) {
                    return false
                }
                this.attachStylesheet();
                N = true;
                K = T;
                document.write("<span></span>");
                this.fetchAd(document.body.firstChild, true, true);
                document.body.addEventListener("touchend", U);
                window.addEventListener("load", U, false)
            }, init: function () {
                if (!A && !S) {
                    return false
                }
                this.attachStylesheet();
                var Y = document.getElementsByTagName("script");
                var W = 0;
                for (var X = 0, V = Y.length; X < V; X++) {
                    if (Y[X].src.match(/iadmob.js/)) {
                        this.fetchAd(Y[X], true)
                    }
                }
                window.addEventListener(A ? "orientationchange" : "resize", this.orientationChange);
                window.setTimeout(this.orientationChange, 500)
            }, orientationChange: function (X) {
                for (var W in R) {
                    var V = W;
                    window.setTimeout(function (Z) {
                        var Y = window.orientation;
                        R[Z].ad.contentWindow.ADMOB.orientationChange(Math.abs(Y) === 90, window.innerWidth);
                        R[Z].ad.style.left = (window.innerWidth / 2 - 160) + "px";
                        if (R[Z].back) {
                            R[Z].back.style.left = (window.innerWidth / 2 - 160) + "px"
                        }
                    }, 500, [V])
                }
                return true
            }, attachStylesheet: function () {
                var V = _admob.dom.createElement(["link", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "data:text/css;base64,ZGl2LmFkbW9iLW91dGVyLWNvbnRhaW5lciwgZGl2LmFkbW9iLW91dGVyLWNvbnRhaW5lciBkaXYsIC5hZG1vYi1iYWNrLXRpdGxlLCAuYWRtb2ItYmFjaywgLmFkbW9iLWNhbnZhcy1pbWFnZSB7CiAgbWFyZ2luOiAwOwogIHBhZGRpbmc6IDA7CiAgZm9udC1mYW1pbHk6IEhlbHZldGljYTsKICBmb250LXNpemU6IDEzcHg7Cn0KCi5hZG1vYi1iYWNrIHsKICB3aWR0aDogMzIwcHg7CiAgaGVpZ2h0OiAzMDBweDsKICBkaXNwbGF5OiBub25lOwogIG92ZXJmbG93OiBoaWRkZW47CiAgLXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDsKICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMXM7Cn0KCi5hZG1vYi1iYWNrLXRpdGxlIHsKICBoZWlnaHQ6IDQ3cHg7CiAgd2lkdGg6IDMyMHB4OwogIC13ZWJraXQtYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4OwogIC13ZWJraXQtYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDsKICBiYWNrZ3JvdW5kOiAjNzE4M2ExIHVybCgnaHR0cDovL21tLmFkbW9iLmNvbS9zdGF0aWMvaXBob25lL2ltZy9ibGVuZF9zaG9ydC5wbmcnKSByZXBlYXQteDsKfQoKLmFkbW9iLWJhY2stdGV4dCB7CiAgZmxvYXQ6IGxlZnQ7IAogIGNvbG9yOiAjZmZmOyAKICBmb250LXdlaWdodDogYm9sZDsgCiAgbGluZS1oZWlnaHQ6IDQ3cHg7CiAgd2lkdGg6IDI0MHB4OwogIG92ZXJmbG93OiBoaWRkZW47CiAgZm9udC1mYW1pbHk6IGFyaWFsOyAKICBwYWRkaW5nLWxlZnQ6IDEwcHggIWltcG9ydGFudDsKfQoKLmFkbW9iLWJhY2stZG9uZSB7CiAgd2lkdGg6IDU0cHg7CiAgcGFkZGluZzogOHB4IDhweCAwIDAgIWltcG9ydGFudDsKICBmbG9hdDogcmlnaHQ7IAp9CgouYWRtb2Itb3V0ZXItY29udGFpbmVyIHsKICB6LWluZGV4OiAwOwogIHdpZHRoOiAzMjBweDsKICBoZWlnaHQ6IDMwMHB4OwogIGRpc3BsYXk6IG5vbmU7CiAgcG9zaXRpb246IGFic29sdXRlOwogIGxlZnQ6IDA7Cn0KCi5hZG1vYi1hbmltYXRpb24tY29udGFpbmVyIHsKICBvdmVyZmxvdzogdmlzaWJsZTsgCiAgei1pbmRleDogMTAwMDA7IAogIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDsKICAtd2Via2l0LWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW4tb3V0OwogIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAxczsKfQoKLmFkbW9iLWZsaXAtY29udGFpbmVyIHsKICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7CiAgLXdlYmtpdC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDsKICAtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMXM7CiAgLXdlYmtpdC1wZXJzcGVjdGl2ZTogODAwOwogIC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6ICdhZG1vYi1mbGlwLWNvbnRhaW5lcic7Cn0KCkAtd2Via2l0LWtleWZyYW1lcyBhZG1vYi1mbGlwLWNvbnRhaW5lciB7CiAgZnJvbSB7CiAgICAtd2Via2l0LXBlcnNwZWN0aXZlOiAxMjAwOwogIH0KICA1MCUgewogICAgLXdlYmtpdC1wZXJzcGVjdGl2ZTogNjAwOwogIH0KICB0byB7CiAgICAtd2Via2l0LXBlcnNwZWN0aXZlOiAxMjAwOwogIH0KfQoKLmFkbW9iLWZsaXAtY29udGFpbmVyLXB1c2hiYWNrIHsKICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiAnYWRtb2ItZmxpcC1jb250YWluZXItcHVzaGJhY2snOwp9CgpALXdlYmtpdC1rZXlmcmFtZXMgYWRtb2ItZmxpcC1jb250YWluZXItcHVzaGJhY2sgewogIGZyb20gewogICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMHB4KTsKICB9CiAgNTAlIHsKICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKC0xNjBweCk7CiAgfQogIHRvIHsKICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVaKDBweCk7CiAgfQp9CgouYWRtb2Itb3BhY2l0eS0wIHsKICBvcGFjaXR5OiAwOwp9CgouYWRtb2ItZmxpcC1sZWZ0LW9sZC12aWV3IHsKICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiAnYWRtb2ItZmxpcC1sZWZ0LW9sZC12aWV3JzsKICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjsKfQoKQC13ZWJraXQta2V5ZnJhbWVzIGFkbW9iLWZsaXAtbGVmdC1vbGQtdmlldyB7CiAgZnJvbSB7CiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSgwZGVnKTsKICAgIG9wYWNpdHk6IDE7CiAgfQogIDUwJSB7CiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlWSgtOTBkZWcpOwogICAgb3BhY2l0eTogMTsKICB9CiAgdG8gewogICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoLTE4MGRlZyk7CiAgICBvcGFjaXR5OiAwOwogIH0KfQoKLmFkbW9iLWZsaXAtcmlnaHQtbmV3LXZpZXcgewogIC13ZWJraXQtYW5pbWF0aW9uLW5hbWU6ICdhZG1vYi1mbGlwLXJpZ2h0LW5ldy12aWV3JzsKICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjsKfQoKQC13ZWJraXQta2V5ZnJhbWVzIGFkbW9iLWZsaXAtcmlnaHQtbmV3LXZpZXcgewogIGZyb20gewogICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVkoLTE4MGRlZyk7CiAgfQogIHRvIHsKICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpOwogIH0KfQoKCgo%3D"
                }]);
                if (document.getElementsByTagName("head").length) {
                    document.getElementsByTagName("head")[0].appendChild(V)
                } else {
                    document.body.appendChild(V)
                }
            }, fetchAd: function (a, W, b) {
                var V = W || false;
                var Y = B;
                var Z = P(Y);
                var c = _admob.dom.createElement(["div", {
                    rel: b ? "ama" : ""
                }, {
                    height: "0px",
                    width: "100%",
                    padding: 0,
                    margin: 0,
                    border: 0,
                    position: "static",
                    background: "none"
                }, [" "]]);
                R[Y] = {
                    ad: Z,
                    shim: c,
                    back: null,
                    shown: false,
                    anchorEl: a
                };
                if (V) {
                    a.parentNode.insertBefore(Z, a);
                    a.parentNode.insertBefore(c, a)
                } else {
                    a.appendChild(Z);
                    a.appendChild(c)
                }
                var X = M(Z);
                Z.style.left = (0 - X[0]) + "px";
                O(R[Y].ad, Y);
                B++;
                return {
                    adEl: R[Y].ad,
                    shim: R[Y].shim
                }
            }, renderCanvas: function (W, X) {
                var V = G(W);
                var Y = R[W];
                Y.back = V;
                Y.ad.parentNode.insertBefore(V, Y.shim);
                if (Math.abs(window.orientation) === 90) {
                    V.style.left = (window.innerWidth / 2 - 160) + "px"
                }
                _admob.jsonp.request({
                    url: X.canvas_url,
                    params: {}, success: function (g) {
                        var b = g.canvas;
                        document.body.appendChild(_admob.dom.createElement(g.apixel));
                        if (g.height) {
                            document.getElementById("admob-back-" + W).style.height = g.height + "px";
                            document.getElementById("admob-back-content-" + W).style.height = g.height + "px"
                        }
                        var e = document.getElementById("admob-canvas-content-" + W);
                        for (var d = 0, Z = b.length; d < Z; d++) {
                            e.appendChild(_admob.dom.createElement(b[d]))
                        }
                        F("admob-back-done-" + W).addEventListener("click", function (c) {
                            c.preventDefault();
                            c.stopPropagation();
                            _admob.flipBack.apply(this, [c, W])
                        });
                        var f = document.querySelector(".admob-canvas-map");
                        if (f) {
                            var a = f.children;
                            for (var d = 0, Z = a.length; d < Z; d++) {
                                a[d].rel = a[d].coords;
                                a[d].addEventListener("click", function (h) {
                                    h.preventDefault();
                                    var c = _admob.dom.createElement(["img", {
                                        src: "http://www.admob.com/get_canvas.php?id=" + g.canvas_id + "&link_id=" + encodeURIComponent(h.target.linkname)
                                    }]);
                                    c.addEventListener("load", function () {
                                        document.location = h.target.href
                                    });
                                    document.body.appendChild(c)
                                })
                            }
                        }
                        _admob.show(W)
                    }, scope: this
                });
                F("admob-back-text-" + W).innerHTML = X[8]
            }, show: function (V) {
                if (!R[V].shown) {
                    R[V].shown = true;
                    if (R[V].shim.rel == "ama") {
                        J();
                        return true
                    }
                    R[V].shim.style.height = "48px";
                    R[V].ad.height = 48
                }
            }, workAroundIFrameBug: function (V, W) {
                if (RegExp("OS 3_[^ ]* .* AppleWebKit/").test(navigator.userAgent)) {
                    if (W) {
                        R[V].ad.style.top = R[V].originalTop + "px"
                    } else {
                        var X = M(R[V].ad);
                        if (X[1] < 80) {
                            R[V].originalTop = X[1];
                            R[V].ad.style.top = "80px";
                            window.scrollTo(0, 3)
                        }
                    }
                }
            }, gotourl: function (V, W) {
                if (top != self) {
                    window.top.location = V
                } else {
                    if (W) {
                        window.open(V, "_new");
                        return true
                    }
                    document.location = V
                }
            }, findPos: function (V) {
                return M(R[V].ad)
            }, flip: function (Z, a) {
                R[Z].flipped = true;
                if (!R[Z].first_time) {
                    R[Z].first_time = true;
                    if (a.image_url) {
                        document.body.appendChild(_admob.dom.createElement("img", {
                            src: a.image_url
                        }))
                    }
                }
                if (N || S) {
                    F("admob-back-" + Z).style.display = "block";
                    F("admob-back-" + Z).style.zIndex = 10000;
                    var W = F("admob-back-content-" + Z);
                    W.style.display = "block";
                    return true
                }
                var Y = a.canvas_url;
                var W = F("admob-back-content-" + Z);
                W.style.display = "block";
                W.style.opacity = 1;
                document.body.addEventListener("touchend", function (f) {
                    if (R[Z].flipped) {
                        f.preventDefault();
                        var d = f.target;
                        while (d.parentNode != document.body) {
                            if (d.parentNode == F("admob-back-content-" + Z)) {
                                return
                            }
                            d = d.parentNode
                        }
                        _admob.flipBack.apply(this, [f, Z])
                    }
                });
                var X = F("admob-back-" + Z);
                var c = F("admob-back-anim-container-" + Z);
                X.style.display = "block";
                var b = M(X)[1];
                if ((window.scrollY + 200) < b) {
                    window.scrollTo(0, b)
                }
                C(X, "admob-flip-container");
                C(c, "admob-flip-container-pushback");
                C(W, "admob-flip-right-new-view");
                R[Z].ad.style.display = "none";
                var V = function () {
                    W.removeEventListener("webkitAnimationEnd", V);
                    I(X, "admob-flip-container");
                    I(c, "admob-flip-container-pushback");
                    I(W, "admob-flip-right-new-view")
                };
                W.addEventListener("webkitAnimationEnd", V)
            }, flipBack: function (Z, Y) {
                R[Y].flipped = false;
                var X = F("admob-back-" + Y);
                var a = F("admob-back-anim-container-" + Y);
                var W = F("admob-back-content-" + Y);
                var V = function () {
                    X.style.display = "none";
                    R[Y].ad.style.display = "block";
                    I(X, "admob-flip-container");
                    I(a, "admob-flip-container-pushback");
                    I(W, "admob-flip-left-old-view");
                    W.removeEventListener("webkitAnimationEnd", V)
                };
                if (N || S) {
                    V();
                    return true
                }
                R[Y].ad.contentWindow.ADMOB.transitions.flipBack.apply(R[Y].ad.contentWindow.ADMOB.transitions, [Z]);
                C(X, "admob-flip-container");
                C(a, "admob-flip-container-pushback");
                C(W, "admob-flip-left-old-view");
                W.style.opacity = 0;
                W.addEventListener("webkitAnimationEnd", V)
            }
        }
    }();
    _admob.dom = function () {
        return {
            createElement: function (B) {
                var E = typeof B[1] != "undefined" ? B[1] : {};
                var F = typeof B[2] != "undefined" ? B[2] : {};
                var D = typeof B[3] != "undefined" ? B[3] : [];
                var G = document.createElementNS("http://www.w3.org/1999/xhtml", "html:" + B[0]);
                for (var C in E) {
                    G[C] = E[C]
                }
                for (var C in F) {
                    G.style[C] = F[C]
                }
                for (var C = 0, A = D.length; C < A; C++) {
                    if (typeof D[C] != "object") {
                        G.appendChild(document.createTextNode(D[C]))
                    } else {
                        G.appendChild(_admob.dom.createElement(D[C]))
                    }
                }
                return G
            }
        }
    }();
    _admob.jsonp = function () {
        var A = 0;
        var B = {};
        return {
            request: function (H) {
                var G = A;
                var D = [];
                var F = H.timeout || 15000;
                for (var E in H.params) {
                    D.push(E + "=" + H.params[E])
                }
                D = D.join("&");
                var I = H.url + ((H.url.indexOf("?") == -1) ? "?" : "&") + (D.length ? D + "&" : "") + "cb=_admob.jsonp.runcb&cbp[]=" + G;
                var C = _admob.dom.createElement(["script", {
                    src: I,
                    type: "text/javascript"
                }]);
                B[G] = {
                    success: H.success,
                    failure: H.failure,
                    scope: H.scope,
                    failTimeout: window.setTimeout(function () {
                        _admob.jsonp.setReqNumTimedOut(G);
                        if (H.scope) {
                            H.failure.apply(H.scope)
                        } else {
                            H.failure()
                        }
                    }, F),
                    scriptTag: document.body.appendChild(C)
                };
                A++
            }, setReqNumTimedOut: function (C) {
                B[C].timedOut = true;
                document.body.removeChild(B[C].scriptTag)
            }, runcb: function (D, C) {
                window.clearTimeout(B[C].failTimeout);
                if (B[C].timedOut == true) {
                    return false
                }
                if (B[C].scope) {
                    B[C].success.apply(B[C].scope, [D])
                } else {
                    B[C].success(D)
                }
            }
        }
    }();
    if (admob_vars.ama) {
        _admob.vars_cache.push(admob_vars);
        _admob.initAma.apply(_admob)
    } else {
        if (!admob_vars.manual_mode) {
            window.addEventListener("load", function () {
                _admob.init.apply(_admob)
            }, false)
        } else {
            window.addEventListener("load", function () {
                _admob.attachStylesheet.apply(_admob)
            }, false)
        }
    }
}
_admob.vars_cache.push(admob_vars);