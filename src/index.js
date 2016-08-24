'use strict';
var d3 = require('d3');
var Graph = require('lightning-graph')
var _ = require('lodash');
var utils = require('lightning-client-utils');


var Visualization = Graph.extend({

    getDefaultStyles: function() {
        return {
            color: '#68a1e5',
            stroke: 'white',
            size: 8
        }
    },

    formatData: function(data) {
        var retColor = utils.getColorFromData(data);
        var retSize = data.size || [];
        var retName = data.name || [];
        var styles = this.styles

        var s, c, k

        data.nodes = data.nodes.map(function (d,i) {
            d = []
            d.i = i
            d.n = retName[i]
            s = retSize.length > 1 ? retSize[i] : retSize[0]
            c = retColor.length > 1 ? retColor[i] : retColor[0]
            d.c = c ? c : styles.color
            d.s = s ? s : styles.size
            d.k = c ? c.darker(0.75) : styles.stroke
            d.l = (data.labels || []).length > i ? data.labels[i] : null;
            return d;
        });

        data.links = data.links.map(function (d) {
            d.source = d[0];
            d.target = d[1];
            d.value = d[2];
            return d;
        });

        var force = d3.layout.force()
            .size([this.height, this.height])
            .charge(-120)
            .linkDistance(30)
            .nodes(data.nodes)
            .links(data.links)

        force.start();
        for (var i = data.nodes.length * data.nodes.length; i > 0; --i) {
            force.tick();
        }
        force.stop();

        utils.updateSettings(this, { nodes: data.nodes.map(function (node) { return {
          x: node.x,
          y: node.y
        }}) });

        return data;
    },

    getSource: function(l) {
        return l.source.i
    },

    getTarget: function(l) {
        return l.target.i
    },

    setScales: function() {

        var self = this

        var xDomain = d3.extent(self.data.nodes, function(d) {
            return d.x;
        });

        var yDomain = d3.extent(self.data.nodes, function(d) {
            return d.y;
        });

        var sizeMax = d3.max(self.data.nodes, function(d) {
                return d.s;
            });

        if (sizeMax) {
            var padding = sizeMax * 2
        } else {
            var padding = 8 * 2 + 10
        }

        var xRng = Math.abs(xDomain[1] - xDomain[0])
        var yRng = Math.abs(yDomain[1] - yDomain[0])

        xDomain[0] -= xRng * 0.025
        xDomain[1] += xRng * 0.025
        yDomain[0] -= yRng * 0.025
        yDomain[1] += yRng * 0.025

        var adjust = (xRng * (this.height/this.width)) / 2

        this.x.domain([xDomain[0] - adjust, xDomain[1] + adjust])
        this.y.domain(yDomain)

        this.x.range([0, this.width])
        this.y.range([this.height, 0])
    },

    getLine: function(link) {
        var self = this;
        var start = self.data.nodes[link.source.i]
        var end = self.data.nodes[link.target.i]
        return [[self.x(start.x), self.y(start.y)], [self.x(end.x), self.y(end.y)]]
    }

});


module.exports = Visualization;
