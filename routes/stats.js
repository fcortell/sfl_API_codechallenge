'use strict';

const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/stats-controller');
const StatsValidation = require('../validators/stats-validation');

router.post('/', StatsValidation.validateInput, StatsController.getStats);
module.exports = router;