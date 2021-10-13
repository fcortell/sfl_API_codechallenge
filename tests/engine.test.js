const assert = require('assert');
const Engine = require('../core/engine');

// Data
var requestMaximize = require('./data/maximize.request.json');
var responseMaximize = require('./data/maximize.response.json');

var requestStats = require('./data/stats.request.json');
var responseStats = require('./data/stats.response.json');

describe('Engine function tests', () => {
    it('should return maximize response', () => {
        assert.deepStrictEqual(Engine.maximizeProfits(requestMaximize), responseMaximize);
    });
    it('should return stats response', () => {
        assert.deepStrictEqual(Engine.avgMinMax(requestStats), responseStats);
    });
});