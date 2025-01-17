﻿/*
  Highcharts JS v4.2.1 (2015-12-21)
 Solid angular gauge module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (a) { typeof module === "object" && module.exports ? module.exports = a : a(Highcharts) })(function (a) {
    var q = a.getOptions().plotOptions, r = a.pInt, s = a.pick, k = a.each, l; q.solidgauge = a.merge(q.gauge, { colorByPoint: !0 }); l = {
        initDataClasses: function (b) {
            var d = this, i = this.chart, c, g = 0, e = this.options; this.dataClasses = c = []; k(b.dataClasses, function (f, h) {
                var p, f = a.merge(f); c.push(f); if (!f.color) e.dataClassColor === "category" ? (p = i.options.colors, f.color = p[g++], g === p.length && (g = 0)) : f.color = d.tweenColors(a.Color(e.minColor),
                a.Color(e.maxColor), h / (b.dataClasses.length - 1))
            })
        }, initStops: function (b) { this.stops = b.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; k(this.stops, function (b) { b.color = a.Color(b[1]) }) }, toColor: function (b, d) {
            var a, c = this.stops, g, e = this.dataClasses, f, h; if (e) for (h = e.length; h--;) { if (f = e[h], g = f.from, c = f.to, (g === void 0 || b >= g) && (c === void 0 || b <= c)) { a = f.color; if (d) d.dataClass = h; break } } else {
                this.isLog && (b = this.val2lin(b)); a = 1 - (this.max - b) / (this.max - this.min); for (h = c.length; h--;) if (a > c[h][0]) break;
                g = c[h] || c[h + 1]; c = c[h + 1] || g; a = 1 - (c[0] - a) / (c[0] - g[0] || 1); a = this.tweenColors(g.color, c.color, a)
            } return a
        }, tweenColors: function (b, a, i) { var c; !a.rgba.length || !b.rgba.length ? b = a.input || "none" : (b = b.rgba, a = a.rgba, c = a[3] !== 1 || b[3] !== 1, b = (c ? "rgba(" : "rgb(") + Math.round(a[0] + (b[0] - a[0]) * (1 - i)) + "," + Math.round(a[1] + (b[1] - a[1]) * (1 - i)) + "," + Math.round(a[2] + (b[2] - a[2]) * (1 - i)) + (c ? "," + (a[3] + (b[3] - a[3]) * (1 - i)) : "") + ")"); return b }
    }; k(["fill", "stroke"], function (b) {
        a.Fx.prototype[b + "Setter"] = function () {
            this.elem.attr(b, l.tweenColors(a.Color(this.start),
            a.Color(this.end), this.pos))
        }
    }); a.seriesTypes.solidgauge = a.extendClass(a.seriesTypes.gauge, {
        type: "solidgauge", pointAttrToOptions: {}, bindAxes: function () { var b; a.seriesTypes.gauge.prototype.bindAxes.call(this); b = this.yAxis; a.extend(b, l); b.options.dataClasses && b.initDataClasses(b.options); b.initStops(b.options) }, drawPoints: function () {
            var b = this, d = b.yAxis, i = d.center, c = b.options, g = b.chart.renderer, e = c.overshoot, f = e && typeof e === "number" ? e / 180 * Math.PI : 0; a.each(b.points, function (a) {
                var e = a.graphic, j = d.startAngleRad +
                d.translate(a.y, null, null, null, !0), k = r(s(a.options.radius, c.radius, 100)) * i[2] / 200, m = r(s(a.options.innerRadius, c.innerRadius, 60)) * i[2] / 200, n = d.toColor(a.y, a), o = Math.min(d.startAngleRad, d.endAngleRad), l = Math.max(d.startAngleRad, d.endAngleRad); n === "none" && (n = a.color || b.color || "none"); if (n !== "none") a.color = n; j = Math.max(o - f, Math.min(l + f, j)); c.wrap === !1 && (j = Math.max(o, Math.min(l, j))); o = Math.min(j, d.startAngleRad); j = Math.max(j, d.startAngleRad); j - o > 2 * Math.PI && (j = o + 2 * Math.PI); a.shapeArgs = m = {
                    x: i[0], y: i[1],
                    r: k, innerR: m, start: o, end: j, fill: n
                }; a.startR = k; if (e) { if (a = m.d, e.animate(m), a) m.d = a } else a.graphic = g.arc(m).attr({ stroke: c.borderColor || "none", "stroke-width": c.borderWidth || 0, fill: n, "sweep-flag": 0 }).add(b.group)
            })
        }, animate: function (b) { if (!b) this.startAngleRad = this.yAxis.startAngleRad, a.seriesTypes.pie.prototype.animate.call(this, b) }
    })
});