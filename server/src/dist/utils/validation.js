"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.stateValidationRules = void 0;
const express_validator_1 = require("express-validator");
const stateValidationRules = () => {
    return [
        (0, express_validator_1.body)('name').isString().optional({ checkFalsy: true }).notEmpty(),
        (0, express_validator_1.body)('description').isString().optional({ checkFalsy: true }),
        (0, express_validator_1.body)('status').isString().optional({ checkFalsy: true }).notEmpty(),
        (0, express_validator_1.body)('createdBy').isString().optional({ checkFalsy: true }).notEmpty()
    ];
};
exports.stateValidationRules = stateValidationRules;
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validate = validate;
