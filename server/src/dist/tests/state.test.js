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
const stateModel_1 = require("../models/stateModel");
const app_1 = __importDefault(require("../app"));
const db_1 = __importDefault(require("../config/db"));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield stateModel_1.State.deleteMany({});
    yield userModel_1.User.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    (yield (0, db_1.default)()).disconnect();
}));
describe('State API', () => {
    let token;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.User.create({
            username: 'testuser',
            password: 'password123',
        });
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({ username: 'testuser', password: 'password123' });
        token = response.body.token;
    }));
    it('should create a new state', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/states')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'Test State',
            description: 'This is a test state',
            status: 'active',
            createdBy: 'testuser',
        });
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test State');
        expect(response.body.description).toBe('This is a test state');
        expect(response.body.status).toBe('active');
        expect(response.body.createdBy).toBe('testuser');
    }));
    it('should fetch all states', () => __awaiter(void 0, void 0, void 0, function* () {
        yield stateModel_1.State.create({
            name: 'Test State',
            description: 'This is a test state',
            status: 'active',
            createdBy: 'testuser',
        });
        const response = yield (0, supertest_1.default)(app_1.default)
            .get('/states')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe('Test State');
    }));
    it('should update a state', () => __awaiter(void 0, void 0, void 0, function* () {
        const state = yield stateModel_1.State.create({
            name: 'Test State',
            description: 'This is a test state',
            status: 'active',
            createdBy: 'testuser',
        });
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/states/${state._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Updated State' });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Updated State');
        expect(response.body.description).toBe('This is a test state');
        expect(response.body.status).toBe('active');
    }));
    it('should delete a state', () => __awaiter(void 0, void 0, void 0, function* () {
        const state = yield stateModel_1.State.create({
            name: 'Test State',
            description: 'This is a test state',
            status: 'active',
            createdBy: 'testuser',
        });
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/states/${state._id}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('State deleted successfully');
    }));
});
