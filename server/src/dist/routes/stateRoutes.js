"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stateController_1 = require("../controllers/stateController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const validation_1 = require("../utils/validation");
const router = express_1.default.Router();
router.post('/states', authMiddleware_1.default, (0, validation_1.stateValidationRules)(), validation_1.validate, stateController_1.createState);
router.get('/states', authMiddleware_1.default, stateController_1.getStates);
router.put('/states/:id', authMiddleware_1.default, (0, validation_1.stateValidationRules)(), validation_1.validate, stateController_1.updateState);
router.delete('/states/:id', authMiddleware_1.default, stateController_1.deleteState);
exports.default = router;
