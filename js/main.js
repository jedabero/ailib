(function() {
    var input = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ];
    var desiredOut = [0, 1, 1, 1],
        bias = -1,
        coeff = 0.7,
        iterations = 100000,
        out;

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

    var matrix = function(i, j, fn) {
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

    var rand = function(i, j, m) {
        return matrix(i, j, function () {
            var number = Math.round(Math.random() * 10000) / 10000;
            if (m != null) {
                number *= m;
            }
            return number;
        });
    };

    var zeros = function (i, j) {
        return matrix(i, j);
    }

    var weights = rand(3,1,-2);
    console.log(weights);
    for (var i = 0; i < iterations; i++) {
        out = zeros(4, 1);
        for (var j = 0; j < input.length; j++) {
            var y = bias*weights[0][0] + input[j][0]*weights[1][0]  + input[j][1]*weights[2][0];
            out[j][0] = 1 / (1 + Math.exp(-y));
            var delta = desiredOut[j] - out[j][0];
            weights[0][0] = weights[0][0] + coeff*bias*delta;
            weights[1][0] = weights[1][0] + coeff*input[j][0]*delta;
            weights[2][0] = weights[2][0] + coeff*input[j][0]*delta;
        }
    }

    console.log(out, weights);

}());
