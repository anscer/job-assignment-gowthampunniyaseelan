"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
const stateRoutes_1 = __importDefault(require("./routes/stateRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authMiddleware_1 = __importDefault(
  require("./middleware/authMiddleware")
);
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.default)();
app.use(
  (0, express_session_1.default)({
    secret: "123",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(
  "/api-docs",
  swagger_ui_express_1.default.serve,
  swagger_ui_express_1.default.setup(swaggerDocument)
);
app.use(stateRoutes_1.default);
app.use(userRoutes_1.default);
app.use(authMiddleware_1.default);
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});
exports.default = app;
