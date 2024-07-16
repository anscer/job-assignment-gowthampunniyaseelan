"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
  var _a;
  const token =
    (_a = req.header("Authorization")) === null || _a === void 0
      ? void 0
      : _a.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Authentication required" });
  }
  try {
    const decoded = jsonwebtoken_1.default.verify(token, "123");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ error: "Invalid token" });
  }
};
exports.default = authMiddleware;
