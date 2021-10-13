const { body, validationResult } = require('express-validator');

exports.validateInput = [
    body().isArray(),
    body('*.request_id', 'request_id must not be null').not().isEmpty(),
    body('*.check_in', 'check_in must not be null').not().isEmpty(),
    body('*.nights', 'nights must not be null').not().isEmpty(),
    body('*.selling_rate', 'selling_rate must not be null').not().isEmpty(),
    body('*.margin', 'margin must not be null').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: `Error! Field ${errors.array()[0].param} is mandatory`, errors: errors.array() });
        }
        next();
    },
];