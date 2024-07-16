"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const userModel_1 = require("../models/userModel");
const app_1 = __importDefault(require("../app"));
const db_1 = __importDefault(require("../config/db"));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield userModel_1.User.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    (yield (0, db_1.default)()).disconnect();
}));
describe('User API', () => {
    it('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send({
            username: 'testuser',
            password: 'password123'
        });
        expect(response.status).toBe(201);
        expect(response.body.username).toBe('testuser');
    }));
    it('should log in an existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel_1.User.create({
            username: 'testuser',
            password: 'password123'
        });
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({ username: 'testuser', password: 'password123' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    }));
    it('should not log in a non-existing user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({ username: 'nonuser', password: 'password123' });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid username or password');
    }));
});
