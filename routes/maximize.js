'use strict';

const express = require('express');
const router = express.Router();
const MaximizeController = require('../controllers/maximize-controller');
const MaximizeValidation = require('../validators/maximize-validation');

router.post('/', MaximizeValidation.validateInput, MaximizeController.getMaximized);
module.exports = router;