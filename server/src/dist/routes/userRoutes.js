"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post('/register', [
    (0, express_validator_1.check)('username', 'Username is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Password is required').isLength({ min: 6 })
], userController_1.register);
router.post('/login', [
    (0, express_validator_1.check)('username', 'Username is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Password is required').isLength({ min: 6 })
], userController_1.login);
exports.default = router;
