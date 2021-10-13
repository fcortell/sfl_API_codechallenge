'use strict';
const Engine = require('../core/engine');

exports.getStats = function (req, res, next) {
    try {
        //var bookingReq = JSON.parse(req.body);
        var result = Engine.avgMinMax(req.body);
        console.log(JSON.stringify(result));
        res.json(result);

    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });

    };
}

