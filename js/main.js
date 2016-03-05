/*!
 * Module AILIB
 * - Math
 */

var AILIB = (function() {
    'use strict';
    var ai = {
        version: '0.0.1'
    };

    function _Math() {
        var me = this;

        me.matrix = function(i, j, fn) {
            var matrix = [];
            for (var k = 0; k < i; k++) {
                var vector = [];
                for (var l = 0; l < j; l++) {
                    vector.push((fn != null) ? fn() : 0);
                }
                matrix.push(vector);
            }
            return matrix;
        };

        me.rand = function(i, j, m) {
            return me.matrix(i, j, function() {
                var number = Math.round(Math.random() * 10000) / 10000;
                if (m != null) {
                    number *= m;
                }
                return number;
            });
        };

        me.zeros = function(i, j) {
            return me.matrix(i, j);
        }

    }

    ai.Math = new _Math();

    function Perceptron(input, desiredOutput, config) {
        if (!(Array.isArray(input) && Array.isArray(desiredOutput))) {
            var error = "Both input and desiredOutput must be arrays. They are "
                + typeof input + " and "
                + typeof desiredOutput + " respectively."
            throw new Error(error);
        }
        if (input.length != desiredOutput.length) {
            var error = "Both input and desiredOutput must have same length. They have "
                + input.length + " and "
                + desiredOutput.length + " items respectively."
            throw new Error(error);
        }
        var me = this;
        me.input = input;
        me.desiredOutput = desiredOutput;
        me.config = $.extend({
            bias: -1,
            learningRate: 0.7,
            iterations: 100
        }, config || {});
        return me;
    }

    Perceptron.prototype.learn = function () {
        var me = this;
        me.weights = ai.Math.rand(3, 1, -2);
        console.log(me.weights);
        for (var i = 0; i < me.config.iterations; i++) {
            me.output = ai.Math.zeros(4, 1);
            for (var j = 0; j < me.input.length; j++) {
                var y = me.config.bias * me.weights[0][0] + me.input[j][0] * me.weights[1][0] + me.input[j][1] * me.weights[2][0];
                me.output[j][0] = 1 / (1 + Math.exp(-y));
                var delta = me.desiredOutput[j] - me.output[j][0];
                me.weights[0][0] = me.weights[0][0] + me.config.learningRate * me.config.bias * delta;
                me.weights[1][0] = me.weights[1][0] + me.config.learningRate * me.input[j][0] * delta;
                me.weights[2][0] = me.weights[2][0] + me.config.learningRate * me.input[j][0] * delta;
            }
        }
        console.log(me.output, me.weights);
    };

    ai.Perceptron = {
        learn: function (input, desiredOutput, config) {
            var perceptron = new Perceptron(input, desiredOutput, config);
            perceptron.learn();
            return perceptron;
        }
    };

    var input = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ];
    var desiredOut = [0, 1, 1, 1],
        bias = -1,
        coeff = 0.7,
        iterations = 100000;

    /* TODO Should use a seed * /
    var date = new Date();
    var value = [
        date.getFullYear(), date.getMonth(), date.getDate(),
        date.getHours(), date.getMinutes(), date.getSeconds()
    ].reduce(function(prev, curr, index, arr) {
        console.log(arr);
        return prev + curr;
    });
    value = 100 * value;
    /* */

    ai.Perceptron.learn(input, desiredOut, {bias: bias, learningRate: coeff, iterations: iterations});

    return ai;

}(jQuery));
