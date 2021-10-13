'use strict';
const Engine = require('../core/engine');

exports.getMaximized = function (req, res, next) {
    try {
        var result = Engine.maximizeProfits(req.body);
        console.log(JSON.stringify(result));
        res.json(result);

    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error'
        });

    };

}