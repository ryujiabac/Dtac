﻿/*
 Highcharts JS v4.2.1 (2015-12-21)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (n) { typeof module === "object" && module.exports ? module.exports = n : n(Highcharts) })(function (n) {
    function K(a, b, c) { this.init(a, b, c) } var P = n.arrayMin, Q = n.arrayMax, s = n.each, H = n.extend, t = n.merge, R = n.map, o = n.pick, A = n.pInt, p = n.getOptions().plotOptions, i = n.seriesTypes, u = n.extendClass, L = n.splat, r = n.wrap, M = n.Axis, z = n.Tick, I = n.Point, S = n.Pointer, T = n.CenteredSeriesMixin, B = n.TrackerMixin, w = n.Series, y = Math, E = y.round, C = y.floor, N = y.max, U = n.Color, v = function () { }; H(K.prototype, {
        init: function (a, b, c) {
            var f = this, e =
            f.defaultOptions; f.chart = b; f.options = a = t(e, b.angular ? { background: {} } : void 0, a); (a = a.background) && s([].concat(L(a)).reverse(), function (a) { var b = a.backgroundColor, j = c.userOptions, a = t(f.defaultBackgroundOptions, a); if (b) a.backgroundColor = b; a.color = a.backgroundColor; c.options.plotBands.unshift(a); j.plotBands = j.plotBands || []; j.plotBands !== c.options.plotBands && j.plotBands.unshift(a) })
        }, defaultOptions: { center: ["50%", "50%"], size: "85%", startAngle: 0 }, defaultBackgroundOptions: {
            shape: "circle", borderWidth: 1, borderColor: "silver",
            backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, "#FFF"], [1, "#DDD"]] }, from: -Number.MAX_VALUE, innerRadius: 0, to: Number.MAX_VALUE, outerRadius: "105%"
        }
    }); var G = M.prototype, z = z.prototype, V = { getOffset: v, redraw: function () { this.isDirty = !1 }, render: function () { this.isDirty = !1 }, setScale: v, setCategories: v, setTitle: v }, O = {
        isRadial: !0, defaultRadialGaugeOptions: {
            labels: { align: "center", x: 0, y: null }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1,
            tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2
        }, defaultRadialXOptions: { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 }, defaultRadialYOptions: { gridLineInterpolation: "circle", labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } }, setOptions: function (a) { a = this.options = t(this.defaultOptions, this.defaultRadialOptions, a); if (!a.plotBands) a.plotBands = [] }, getOffset: function () {
            G.getOffset.call(this);
            this.chart.axisOffset[this.side] = 0; this.center = this.pane.center = T.getCenter.call(this.pane)
        }, getLinePath: function (a, b) { var c = this.center, b = o(b, c[2] / 2 - this.offset); return this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], b, b, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 }) }, setAxisTranslation: function () {
            G.setAxisTranslation.call(this); if (this.center) this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min ||
            1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0
        }, beforeSetTickPositions: function () { this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0) }, setAxisSize: function () { G.setAxisSize.call(this); if (this.isRadial) { this.center = this.pane.center = n.CenteredSeriesMixin.getCenter.call(this.pane); if (this.isCircular) this.sector = this.endAngleRad - this.startAngleRad; this.len = this.width = this.height = this.center[2] * o(this.sector, 1) / 2 } }, getPosition: function (a,
        b) { return this.postTranslate(this.isCircular ? this.translate(a) : 0, o(this.isCircular ? b : this.translate(a), this.center[2] / 2) - this.offset) }, postTranslate: function (a, b) { var c = this.chart, f = this.center, a = this.startAngleRad + a; return { x: c.plotLeft + f[0] + Math.cos(a) * b, y: c.plotTop + f[1] + Math.sin(a) * b } }, getPlotBandPath: function (a, b, c) {
            var f = this.center, e = this.startAngleRad, d = f[2] / 2, h = [o(c.outerRadius, "100%"), c.innerRadius, o(c.thickness, 10)], j = /%$/, m, g = this.isCircular; this.options.gridLineInterpolation === "polygon" ?
            f = this.getPlotLinePath(a).concat(this.getPlotLinePath(b, !0)) : (a = Math.max(a, this.min), b = Math.min(b, this.max), g || (h[0] = this.translate(a), h[1] = this.translate(b)), h = R(h, function (a) { j.test(a) && (a = A(a, 10) * d / 100); return a }), c.shape === "circle" || !g ? (a = -Math.PI / 2, b = Math.PI * 1.5, m = !0) : (a = e + this.translate(a), b = e + this.translate(b)), f = this.chart.renderer.symbols.arc(this.left + f[0], this.top + f[1], h[0], h[0], { start: Math.min(a, b), end: Math.max(a, b), innerR: o(h[1], h[0] - h[2]), open: m })); return f
        }, getPlotLinePath: function (a,
        b) { var c = this, f = c.center, e = c.chart, d = c.getPosition(a), h, j, m; c.isCircular ? m = ["M", f[0] + e.plotLeft, f[1] + e.plotTop, "L", d.x, d.y] : c.options.gridLineInterpolation === "circle" ? (a = c.translate(a)) && (m = c.getLinePath(0, a)) : (s(e.xAxis, function (a) { a.pane === c.pane && (h = a) }), m = [], a = c.translate(a), f = h.tickPositions, h.autoConnect && (f = f.concat([f[0]])), b && (f = [].concat(f).reverse()), s(f, function (d, b) { j = h.getPosition(d, a); m.push(b ? "L" : "M", j.x, j.y) })); return m }, getTitlePosition: function () {
            var a = this.center, b = this.chart,
            c = this.options.title; return { x: b.plotLeft + a[0] + (c.x || 0), y: b.plotTop + a[1] - { high: 0.5, middle: 0.25, low: 0 }[c.align] * a[2] + (c.y || 0) }
        }
    }; r(G, "init", function (a, b, c) {
        var k; var f = b.angular, e = b.polar, d = c.isX, h = f && d, j, m; m = b.options; var g = c.pane || 0; if (f) { if (H(this, h ? V : O), j = !d) this.defaultRadialOptions = this.defaultRadialGaugeOptions } else if (e) H(this, O), this.defaultRadialOptions = (j = d) ? this.defaultRadialXOptions : t(this.defaultYAxisOptions, this.defaultRadialYOptions); a.call(this, b, c); if (!h && (f || e)) {
            a = this.options; if (!b.panes) b.panes =
            []; this.pane = (k = b.panes[g] = b.panes[g] || new K(L(m.pane)[g], b, this), g = k); g = g.options; b.inverted = !1; m.chart.zoomType = null; this.startAngleRad = b = (g.startAngle - 90) * Math.PI / 180; this.endAngleRad = m = (o(g.endAngle, g.startAngle + 360) - 90) * Math.PI / 180; this.offset = a.offset || 0; if ((this.isCircular = j) && c.max === void 0 && m - b === 2 * Math.PI) this.autoConnect = !0
        }
    }); r(z, "getPosition", function (a, b, c, f, e) { var d = this.axis; return d.getPosition ? d.getPosition(c) : a.call(this, b, c, f, e) }); r(z, "getLabelPosition", function (a, b, c, f, e, d, h,
    j, m) {
        var g = this.axis, l = d.y, k = 20, i = d.align, x = (g.translate(this.pos) + g.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360; g.isRadial ? (a = g.getPosition(this.pos, g.center[2] / 2 + o(d.distance, -25)), d.rotation === "auto" ? f.attr({ rotation: x }) : l === null && (l = g.chart.renderer.fontMetrics(f.styles.fontSize).b - f.getBBox().height / 2), i === null && (g.isCircular ? (this.label.getBBox().width > g.len * g.tickInterval / (g.max - g.min) && (k = 0), i = x > k && x < 180 - k ? "left" : x > 180 + k && x < 360 - k ? "right" : "center") : i = "center", f.attr({ align: i })), a.x += d.x, a.y +=
        l) : a = a.call(this, b, c, f, e, d, h, j, m); return a
    }); r(z, "getMarkPath", function (a, b, c, f, e, d, h) { var j = this.axis; j.isRadial ? (a = j.getPosition(this.pos, j.center[2] / 2 + f), b = ["M", b, c, "L", a.x, a.y]) : b = a.call(this, b, c, f, e, d, h); return b }); p.arearange = t(p.area, {
        lineWidth: 1, marker: null, threshold: null, tooltip: { pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' }, trackByArea: !0, dataLabels: { align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 },
        states: { hover: { halo: !1 } }
    }); i.arearange = u(i.area, {
        type: "arearange", pointArrayMap: ["low", "high"], dataLabelCollections: ["dataLabel", "dataLabelUpper"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "low", deferTranslatePolar: !0, highToXY: function (a) { var b = this.chart, c = this.xAxis.postTranslate(a.rectPlotX, this.yAxis.len - a.plotHigh); a.plotHighX = c.x - b.plotLeft; a.plotHigh = c.y - b.plotTop }, getSegments: function () {
            var a = this; s(a.points, function (b) {
                if (!a.options.connectNulls && (b.low === null || b.high === null)) b.y =
                null; else if (b.low === null && b.high !== null) b.y = b.high
            }); w.prototype.getSegments.call(this)
        }, translate: function () { var a = this, b = a.yAxis; i.area.prototype.translate.apply(a); s(a.points, function (a) { var f = a.low, e = a.high, d = a.plotY; e === null && f === null ? a.y = null : f === null ? (a.plotLow = a.plotY = null, a.plotHigh = b.translate(e, 0, 1, 0, 1)) : e === null ? (a.plotLow = d, a.plotHigh = null) : (a.plotLow = d, a.plotHigh = b.translate(e, 0, 1, 0, 1)) }); this.chart.polar && s(this.points, function (b) { a.highToXY(b) }) }, getSegmentPath: function (a) {
            var b,
            c = [], f = a.length, e = w.prototype.getSegmentPath, d, h; h = this.options; var j = h.step; for (b = n.grep(a, function (a) { return a.plotLow !== null }) ; f--;) d = a[f], d.plotHigh !== null && c.push({ plotX: d.plotHighX || d.plotX, plotY: d.plotHigh }); a = e.call(this, b); if (j) j === !0 && (j = "left"), h.step = { left: "right", center: "center", right: "left" }[j]; c = e.call(this, c); h.step = j; h = [].concat(a, c); this.chart.polar || (c[0] = "L"); this.areaPath = this.areaPath.concat(a, c); return h
        }, drawDataLabels: function () {
            var a = this.data, b = a.length, c, f = [], e = w.prototype,
            d = this.options.dataLabels, h = d.align, j = d.verticalAlign, m = d.inside, g, l, k = this.chart.inverted; if (d.enabled || this._hasPointLabels) {
                for (c = b; c--;) if (g = a[c]) { l = m ? g.plotHigh < g.plotLow : g.plotHigh > g.plotLow; g.y = g.high; g._plotY = g.plotY; g.plotY = g.plotHigh; f[c] = g.dataLabel; g.dataLabel = g.dataLabelUpper; g.below = l; if (k) { if (!h) d.align = l ? "right" : "left" } else if (!j) d.verticalAlign = l ? "top" : "bottom"; d.x = d.xHigh; d.y = d.yHigh } e.drawDataLabels && e.drawDataLabels.apply(this, arguments); for (c = b; c--;) if (g = a[c]) {
                    l = m ? g.plotHigh <
                    g.plotLow : g.plotHigh > g.plotLow; g.dataLabelUpper = g.dataLabel; g.dataLabel = f[c]; g.y = g.low; g.plotY = g._plotY; g.below = !l; if (k) { if (!h) d.align = l ? "left" : "right" } else if (!j) d.verticalAlign = l ? "bottom" : "top"; d.x = d.xLow; d.y = d.yLow
                } e.drawDataLabels && e.drawDataLabels.apply(this, arguments)
            } d.align = h; d.verticalAlign = j
        }, alignDataLabel: function () { i.column.prototype.alignDataLabel.apply(this, arguments) }, setStackedPoints: v, getSymbol: v, drawPoints: v
    }); p.areasplinerange = t(p.arearange); i.areasplinerange = u(i.arearange, {
        type: "areasplinerange",
        getPointSpline: i.spline.prototype.getPointSpline
    }); (function () {
        var a = i.column.prototype; p.columnrange = t(p.column, p.arearange, { lineWidth: 1, pointRange: null }); i.columnrange = u(i.arearange, {
            type: "columnrange", translate: function () {
                var b = this, c = b.yAxis, f = b.xAxis, e = b.chart, d; a.translate.apply(b); s(b.points, function (a) {
                    var j = a.shapeArgs, m = b.options.minPointLength, g, l; a.plotHigh = d = c.translate(a.high, 0, 1, 0, 1); a.plotLow = a.plotY; l = d; g = a.plotY - d; Math.abs(g) < m ? (m -= g, g += m, l -= m / 2) : g < 0 && (g *= -1, l -= g); j.height = g; j.y =
                    l; a.tooltipPos = e.inverted ? [c.len + c.pos - e.plotLeft - l - g / 2, f.len + f.pos - e.plotTop - j.x - j.width / 2, g] : [f.left - e.plotLeft + j.x + j.width / 2, c.pos - e.plotTop + l + g / 2, g]
                })
            }, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], drawGraph: v, crispCol: a.crispCol, pointAttrToOptions: a.pointAttrToOptions, drawPoints: a.drawPoints, drawTracker: a.drawTracker, animate: a.animate, getColumnMetrics: a.getColumnMetrics
        })
    })(); p.gauge = t(p.line, {
        dataLabels: {
            enabled: !0, defer: !1, y: 15, borderWidth: 1, borderColor: "silver", borderRadius: 3, crop: !1,
            verticalAlign: "top", zIndex: 2
        }, dial: {}, pivot: {}, tooltip: { headerFormat: "" }, showInLegend: !1
    }); B = {
        type: "gauge", pointClass: u(I, { setState: function (a) { this.state = a } }), angular: !0, drawGraph: v, fixedBox: !0, forceDL: !0, trackerGroups: ["group", "dataLabelsGroup"], translate: function () {
            var a = this.yAxis, b = this.options, c = a.center; this.generatePoints(); s(this.points, function (f) {
                var e = t(b.dial, f.dial), d = A(o(e.radius, 80)) * c[2] / 200, h = A(o(e.baseLength, 70)) * d / 100, j = A(o(e.rearLength, 10)) * d / 100, m = e.baseWidth || 3, g = e.topWidth ||
                1, l = b.overshoot, k = a.startAngleRad + a.translate(f.y, null, null, null, !0); l && typeof l === "number" ? (l = l / 180 * Math.PI, k = Math.max(a.startAngleRad - l, Math.min(a.endAngleRad + l, k))) : b.wrap === !1 && (k = Math.max(a.startAngleRad, Math.min(a.endAngleRad, k))); k = k * 180 / Math.PI; f.shapeType = "path"; f.shapeArgs = { d: e.path || ["M", -j, -m / 2, "L", h, -m / 2, d, -g / 2, d, g / 2, h, m / 2, -j, m / 2, "z"], translateX: c[0], translateY: c[1], rotation: k }; f.plotX = c[0]; f.plotY = c[1]
            })
        }, drawPoints: function () {
            var a = this, b = a.yAxis.center, c = a.pivot, f = a.options, e = f.pivot,
            d = a.chart.renderer; s(a.points, function (b) { var c = b.graphic, e = b.shapeArgs, g = e.d, l = t(f.dial, b.dial); c ? (c.animate(e), e.d = g) : b.graphic = d[b.shapeType](e).attr({ stroke: l.borderColor || "none", "stroke-width": l.borderWidth || 0, fill: l.backgroundColor || "black", rotation: e.rotation, zIndex: 1 }).add(a.group) }); c ? c.animate({ translateX: b[0], translateY: b[1] }) : a.pivot = d.circle(0, 0, o(e.radius, 5)).attr({ "stroke-width": e.borderWidth || 0, stroke: e.borderColor || "silver", fill: e.backgroundColor || "black", zIndex: 2 }).translate(b[0],
            b[1]).add(a.group)
        }, animate: function (a) { var b = this; if (!a) s(b.points, function (a) { var f = a.graphic; f && (f.attr({ rotation: b.yAxis.startAngleRad * 180 / Math.PI }), f.animate({ rotation: a.shapeArgs.rotation }, b.options.animation)) }), b.animate = null }, render: function () { this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup); w.prototype.render.call(this); this.group.clip(this.chart.clipRect) }, setData: function (a, b) {
            w.prototype.setData.call(this, a, !1); this.processData();
            this.generatePoints(); o(b, !0) && this.chart.redraw()
        }, drawTracker: B && B.drawTrackerPoint
    }; i.gauge = u(i.line, B); p.boxplot = t(p.column, { fillColor: "#FFFFFF", lineWidth: 1, medianWidth: 2, states: { hover: { brightness: -0.3 } }, threshold: null, tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>' }, whiskerLength: "50%", whiskerWidth: 2 }); i.boxplot =
    u(i.column, {
        type: "boxplot", pointArrayMap: ["low", "q1", "median", "q3", "high"], toYData: function (a) { return [a.low, a.q1, a.median, a.q3, a.high] }, pointValKey: "high", pointAttrToOptions: { fill: "fillColor", stroke: "color", "stroke-width": "lineWidth" }, drawDataLabels: v, translate: function () { var a = this.yAxis, b = this.pointArrayMap; i.column.prototype.translate.apply(this); s(this.points, function (c) { s(b, function (b) { c[b] !== null && (c[b + "Plot"] = a.translate(c[b], 0, 1, 0, 1)) }) }) }, drawPoints: function () {
            var a = this, b = a.options, c = a.chart.renderer,
            f, e, d, h, j, m, g, l, k, i, x, n, J, p, t, r, v, u, w, y, B, A, z = a.doQuartiles !== !1, F, D = a.options.whiskerLength; s(a.points, function (q) {
                k = q.graphic; B = q.shapeArgs; x = {}; p = {}; r = {}; A = q.color || a.color; if (q.plotY !== void 0) if (f = q.pointAttr[q.selected ? "selected" : ""], v = B.width, u = C(B.x), w = u + v, y = E(v / 2), e = C(z ? q.q1Plot : q.lowPlot), d = C(z ? q.q3Plot : q.lowPlot), h = C(q.highPlot), j = C(q.lowPlot), x.stroke = q.stemColor || b.stemColor || A, x["stroke-width"] = o(q.stemWidth, b.stemWidth, b.lineWidth), x.dashstyle = q.stemDashStyle || b.stemDashStyle, p.stroke =
                q.whiskerColor || b.whiskerColor || A, p["stroke-width"] = o(q.whiskerWidth, b.whiskerWidth, b.lineWidth), r.stroke = q.medianColor || b.medianColor || A, r["stroke-width"] = o(q.medianWidth, b.medianWidth, b.lineWidth), g = x["stroke-width"] % 2 / 2, l = u + y + g, i = ["M", l, d, "L", l, h, "M", l, e, "L", l, j], z && (g = f["stroke-width"] % 2 / 2, l = C(l) + g, e = C(e) + g, d = C(d) + g, u += g, w += g, n = ["M", u, d, "L", u, e, "L", w, e, "L", w, d, "L", u, d, "z"]), D && (g = p["stroke-width"] % 2 / 2, h += g, j += g, F = /%$/.test(D) ? y * parseFloat(D) / 100 : D / 2, J = ["M", l - F, h, "L", l + F, h, "M", l - F, j, "L", l + F, j]),
                g = r["stroke-width"] % 2 / 2, m = E(q.medianPlot) + g, t = ["M", u, m, "L", w, m], k) q.stem.animate({ d: i }), D && q.whiskers.animate({ d: J }), z && q.box.animate({ d: n }), q.medianShape.animate({ d: t }); else { q.graphic = k = c.g().add(a.group); q.stem = c.path(i).attr(x).add(k); if (D) q.whiskers = c.path(J).attr(p).add(k); if (z) q.box = c.path(n).attr(f).add(k); q.medianShape = c.path(t).attr(r).add(k) }
            })
        }, setStackedPoints: v
    }); p.errorbar = t(p.boxplot, {
        color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' },
        whiskerWidth: null
    }); i.errorbar = u(i.boxplot, { type: "errorbar", pointArrayMap: ["low", "high"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "high", doQuartiles: !1, drawDataLabels: i.arearange ? i.arearange.prototype.drawDataLabels : v, getColumnMetrics: function () { return this.linkedParent && this.linkedParent.columnMetrics || i.column.prototype.getColumnMetrics.call(this) } }); p.waterfall = t(p.column, { lineWidth: 1, lineColor: "#333", dashStyle: "dot", borderColor: "#333", dataLabels: { inside: !0 }, states: { hover: { lineWidthPlus: 0 } } });
    i.waterfall = u(i.column, {
        type: "waterfall", upColorProp: "fill", pointValKey: "y", translate: function () {
            var a = this.options, b = this.yAxis, c, f, e, d, h, j, m, g, l, k = o(a.minPointLength, 5), n = a.threshold, x = a.stacking; i.column.prototype.translate.apply(this); this.minPointLengthOffset = 0; m = g = n; f = this.points; for (c = 0, a = f.length; c < a; c++) {
                e = f[c]; j = this.processedYData[c]; d = e.shapeArgs; l = (h = x && b.stacks[(this.negStacks && j < n ? "-" : "") + this.stackKey]) ? h[e.x].points[this.index + "," + c] : [0, j]; if (e.isSum) e.y = j; else if (e.isIntermediateSum) e.y =
                j - g; h = N(m, m + e.y) + l[0]; d.y = b.translate(h, 0, 1); if (e.isSum) d.y = b.translate(l[1], 0, 1), d.height = Math.min(b.translate(l[0], 0, 1), b.len) - d.y + this.minPointLengthOffset; else if (e.isIntermediateSum) d.y = b.translate(l[1], 0, 1), d.height = Math.min(b.translate(g, 0, 1), b.len) - d.y + this.minPointLengthOffset, g = l[1]; else { if (m !== 0) d.height = j > 0 ? b.translate(m, 0, 1) - d.y : b.translate(m, 0, 1) - b.translate(m - j, 0, 1); m += j } d.height < 0 && (d.y += d.height, d.height *= -1); e.plotY = d.y = E(d.y) - this.borderWidth % 2 / 2; d.height = N(E(d.height), 0.001); e.yBottom =
                d.y + d.height; if (d.height <= k) d.height = k, this.minPointLengthOffset += k; d.y -= this.minPointLengthOffset; d = e.plotY + (e.negative ? d.height : 0) - this.minPointLengthOffset; this.chart.inverted ? e.tooltipPos[0] = b.len - d : e.tooltipPos[1] = d
            }
        }, processData: function (a) {
            var b = this.yData, c = this.options.data, f, e = b.length, d, h, j, m, g, l; h = d = j = m = this.options.threshold || 0; for (l = 0; l < e; l++) g = b[l], f = c && c[l] ? c[l] : {}, g === "sum" || f.isSum ? b[l] = h : g === "intermediateSum" || f.isIntermediateSum ? b[l] = d : (h += g, d += g), j = Math.min(h, j), m = Math.max(h,
            m); w.prototype.processData.call(this, a); this.dataMin = j; this.dataMax = m
        }, toYData: function (a) { return a.isSum ? a.x === 0 ? null : "sum" : a.isIntermediateSum ? a.x === 0 ? null : "intermediateSum" : a.y }, getAttribs: function () {
            i.column.prototype.getAttribs.apply(this, arguments); var a = this, b = a.options, c = b.states, f = b.upColor || a.color, b = n.Color(f).brighten(0.1).get(), e = t(a.pointAttr), d = a.upColorProp; e[""][d] = f; e.hover[d] = c.hover.upColor || b; e.select[d] = c.select.upColor || f; s(a.points, function (d) {
                if (!d.options.color) d.y > 0 ? (d.pointAttr =
                e, d.color = f) : d.pointAttr = a.pointAttr
            })
        }, getGraphPath: function () { var a = this.data, b = a.length, c = E(this.options.lineWidth + this.borderWidth) % 2 / 2, f = [], e, d, h; for (h = 1; h < b; h++) d = a[h].shapeArgs, e = a[h - 1].shapeArgs, d = ["M", e.x + e.width, e.y + c, "L", d.x, e.y + c], a[h - 1].y < 0 && (d[2] += e.height, d[5] += e.height), f = f.concat(d); return f }, getExtremes: v, drawGraph: w.prototype.drawGraph
    }); p.polygon = t(p.scatter, { marker: { enabled: !1 } }); i.polygon = u(i.scatter, {
        type: "polygon", fillGraph: !0, getSegmentPath: function (a) {
            return w.prototype.getSegmentPath.call(this,
            a).concat("z")
        }, drawGraph: w.prototype.drawGraph, drawLegendSymbol: n.LegendSymbolMixin.drawRectangle
    }); p.bubble = t(p.scatter, { dataLabels: { formatter: function () { return this.point.z }, inside: !0, verticalAlign: "middle" }, marker: { lineColor: null, lineWidth: 1 }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z" }); B = u(I, {
        haloPath: function () {
            return I.prototype.haloPath.call(this, this.shapeArgs.r +
            this.series.options.states.hover.halo.size)
        }, ttBelow: !1
    }); i.bubble = u(i.scatter, {
        type: "bubble", pointClass: B, pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], bubblePadding: !0, zoneAxis: "z", pointAttrToOptions: { stroke: "lineColor", "stroke-width": "lineWidth", fill: "fillColor" }, applyOpacity: function (a) { var b = this.options.marker, c = o(b.fillOpacity, 0.5), a = a || b.fillColor || this.color; c !== 1 && (a = U(a).setOpacity(c).get("rgba")); return a }, convertAttribs: function () {
            var a =
            w.prototype.convertAttribs.apply(this, arguments); a.fill = this.applyOpacity(a.fill); return a
        }, getRadii: function (a, b, c, f) { var e, d, h, j = this.zData, m = [], g = this.options, l = g.sizeBy !== "width", k = g.zThreshold, i = b - a; for (d = 0, e = j.length; d < e; d++) h = j[d], g.sizeByAbsoluteValue && h !== null && (h = Math.abs(h - k), b = Math.max(b - k, Math.abs(a - k)), a = 0), h === null ? h = null : h < a ? h = c / 2 - 1 : (h = i > 0 ? (h - a) / i : 0.5, l && h >= 0 && (h = Math.sqrt(h)), h = y.ceil(c + h * (f - c)) / 2), m.push(h); this.radii = m }, animate: function (a) {
            var b = this.options.animation; if (!a) s(this.points,
            function (a) { var f = a.graphic, a = a.shapeArgs; f && a && (f.attr("r", 1), f.animate({ r: a.r }, b)) }), this.animate = null
        }, translate: function () { var a, b = this.data, c, f, e = this.radii; i.scatter.prototype.translate.call(this); for (a = b.length; a--;) c = b[a], f = e ? e[a] : 0, typeof f === "number" && f >= this.minPxSize / 2 ? (c.shapeType = "circle", c.shapeArgs = { x: c.plotX, y: c.plotY, r: f }, c.dlBox = { x: c.plotX - f, y: c.plotY - f, width: 2 * f, height: 2 * f }) : c.shapeArgs = c.plotY = c.dlBox = void 0 }, drawLegendSymbol: function (a, b) {
            var c = this.chart.renderer, f = c.fontMetrics(a.itemStyle.fontSize).f /
            2; b.legendSymbol = c.circle(f, a.baseline - f, f).attr({ zIndex: 3 }).add(b.legendGroup); b.legendSymbol.isMarker = !0
        }, drawPoints: i.column.prototype.drawPoints, alignDataLabel: i.column.prototype.alignDataLabel, buildKDTree: v, applyZones: v
    }); M.prototype.beforePadding = function () {
        var a = this, b = this.len, c = this.chart, f = 0, e = b, d = this.isXAxis, h = d ? "xData" : "yData", j = this.min, m = {}, g = y.min(c.plotWidth, c.plotHeight), l = Number.MAX_VALUE, k = -Number.MAX_VALUE, i = this.max - j, n = b / i, p = []; s(this.series, function (b) {
            var h = b.options; if (b.bubblePadding &&
            (b.visible || !c.options.chart.ignoreHiddenSeries)) if (a.allowZoomOutside = !0, p.push(b), d) s(["minSize", "maxSize"], function (a) { var d = h[a], b = /%$/.test(d), d = A(d); m[a] = b ? g * d / 100 : d }), b.minPxSize = m.minSize, b.maxPxSize = m.maxSize, b = b.zData, b.length && (l = o(h.zMin, y.min(l, y.max(P(b), h.displayNegative === !1 ? h.zThreshold : -Number.MAX_VALUE))), k = o(h.zMax, y.max(k, Q(b))))
        }); s(p, function (a) {
            var b = a[h], c = b.length, g; d && a.getRadii(l, k, a.minPxSize, a.maxPxSize); if (i > 0) for (; c--;) typeof b[c] === "number" && (g = a.radii[c], f = Math.min((b[c] -
            j) * n - g, f), e = Math.max((b[c] - j) * n + g, e))
        }); p.length && i > 0 && !this.isLog && (e -= b, n *= (b + f - e) / b, s([["min", "userMin", f], ["max", "userMax", e]], function (d) { o(a.options[d[0]], a[d[1]]) === void 0 && (a[d[0]] += d[2] / n) }))
    }; (function () {
        function a(a, b, c) { a.call(this, b, c); if (this.chart.polar) this.closeSegment = function (a) { var d = this.xAxis.center; a.push("L", d[0], d[1]) }, this.closedStacks = !0 } function b(a, b) {
            var c = this.chart, f = this.options.animation, g = this.group, e = this.markerGroup, k = this.xAxis.center, i = c.plotLeft, n = c.plotTop;
            if (c.polar) { if (c.renderer.isSVG) f === !0 && (f = {}), b ? (c = { translateX: k[0] + i, translateY: k[1] + n, scaleX: 0.001, scaleY: 0.001 }, g.attr(c), e && e.attr(c)) : (c = { translateX: i, translateY: n, scaleX: 1, scaleY: 1 }, g.animate(c, f), e && e.animate(c, f), this.animate = null) } else a.call(this, b)
        } var c = w.prototype, f = S.prototype, e; c.searchPointByAngle = function (a) { var b = this.chart, c = this.xAxis.pane.center; return this.searchKDTree({ clientX: 180 + Math.atan2(a.chartX - c[0] - b.plotLeft, a.chartY - c[1] - b.plotTop) * (-180 / Math.PI) }) }; r(c, "buildKDTree",
        function (a) { if (this.chart.polar) this.kdByAngle ? this.searchPoint = this.searchPointByAngle : this.kdDimensions = 2; a.apply(this) }); c.toXY = function (a) { var b, c = this.chart, f = a.plotX; b = a.plotY; a.rectPlotX = f; a.rectPlotY = b; b = this.xAxis.postTranslate(a.plotX, this.yAxis.len - b); a.plotX = a.polarPlotX = b.x - c.plotLeft; a.plotY = a.polarPlotY = b.y - c.plotTop; this.kdByAngle ? (c = (f / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, c < 0 && (c += 360), a.clientX = c) : a.clientX = a.plotX }; i.area && r(i.area.prototype, "init", a); i.areaspline &&
        r(i.areaspline.prototype, "init", a); i.spline && r(i.spline.prototype, "getPointSpline", function (a, b, c, f) {
            var g, e, k, i, n, p, o; if (this.chart.polar) {
                g = c.plotX; e = c.plotY; a = b[f - 1]; k = b[f + 1]; this.connectEnds && (a || (a = b[b.length - 2]), k || (k = b[1])); if (a && k) i = a.plotX, n = a.plotY, b = k.plotX, p = k.plotY, i = (1.5 * g + i) / 2.5, n = (1.5 * e + n) / 2.5, k = (1.5 * g + b) / 2.5, o = (1.5 * e + p) / 2.5, b = Math.sqrt(Math.pow(i - g, 2) + Math.pow(n - e, 2)), p = Math.sqrt(Math.pow(k - g, 2) + Math.pow(o - e, 2)), i = Math.atan2(n - e, i - g), n = Math.atan2(o - e, k - g), o = Math.PI / 2 + (i + n) / 2, Math.abs(i -
                o) > Math.PI / 2 && (o -= Math.PI), i = g + Math.cos(o) * b, n = e + Math.sin(o) * b, k = g + Math.cos(Math.PI + o) * p, o = e + Math.sin(Math.PI + o) * p, c.rightContX = k, c.rightContY = o; f ? (c = ["C", a.rightContX || a.plotX, a.rightContY || a.plotY, i || g, n || e, g, e], a.rightContX = a.rightContY = null) : c = ["M", g, e]
            } else c = a.call(this, b, c, f); return c
        }); r(c, "translate", function (a) { var b = this.chart; a.call(this); if (b.polar && (this.kdByAngle = b.tooltip && b.tooltip.shared, !this.preventPostTranslate)) { a = this.points; for (b = a.length; b--;) this.toXY(a[b]) } }); r(c, "getSegmentPath",
        function (a, b) { var c = this.points; if (this.chart.polar && this.options.connectEnds !== !1 && b[b.length - 1] === c[c.length - 1] && c[0].y !== null) this.connectEnds = !0, b = [].concat(b, [c[0]]); return a.call(this, b) }); r(c, "animate", b); if (i.column) e = i.column.prototype, r(e, "animate", b), r(e, "translate", function (a) {
            var b = this.xAxis, c = this.yAxis.len, e = b.center, g = b.startAngleRad, f = this.chart.renderer, k, i; this.preventPostTranslate = !0; a.call(this); if (b.isRadial) {
                b = this.points; for (i = b.length; i--;) k = b[i], a = k.barX + g, k.shapeType = "path",
                k.shapeArgs = { d: f.symbols.arc(e[0], e[1], c - k.plotY, null, { start: a, end: a + k.pointWidth, innerR: c - o(k.yBottom, c) }) }, this.toXY(k), k.tooltipPos = [k.plotX, k.plotY], k.ttBelow = k.plotY > e[1]
            }
        }), r(e, "alignDataLabel", function (a, b, e, f, g, i) { if (this.chart.polar) { a = b.rectPlotX / Math.PI * 180; if (f.align === null) f.align = a > 20 && a < 160 ? "left" : a > 200 && a < 340 ? "right" : "center"; if (f.verticalAlign === null) f.verticalAlign = a < 45 || a > 315 ? "bottom" : a > 135 && a < 225 ? "top" : "middle"; c.alignDataLabel.call(this, b, e, f, g, i) } else a.call(this, b, e, f, g, i) });
        r(f, "getCoordinates", function (a, b) { var c = this.chart, f = { xAxis: [], yAxis: [] }; c.polar ? s(c.axes, function (a) { var d = a.isXAxis, e = a.center, i = b.chartX - e[0] - c.plotLeft, e = b.chartY - e[1] - c.plotTop; f[d ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(d ? Math.PI - Math.atan2(i, e) : Math.sqrt(Math.pow(i, 2) + Math.pow(e, 2)), !0) }) }) : f = a.call(this, b); return f })
    })()
});