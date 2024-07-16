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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteState = exports.updateState = exports.getStates = exports.createState = void 0;
const stateModel_1 = require("../models/stateModel");
const createState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, status, createdBy } = req.body;
    try {
        const state = new stateModel_1.State({
            name,
            description,
            status,
            createdBy,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        yield state.save();
        res.status(201).send(state);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.createState = createState;
const getStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const states = yield stateModel_1.State.find({});
        res.send(states);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.getStates = getStates;
const updateState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'status', 'updatedAt'];
    const isValidOperation = updates.find(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const state = yield stateModel_1.State.findById(req.params.id);
        if (!state) {
            return res.status(404).send({ error: 'State not found' });
        }
        updates.forEach(update => (state[update] = req.body[update]));
        state.updatedAt = new Date();
        yield state.save();
        res.send(state);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
exports.updateState = updateState;
const deleteState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const state = yield stateModel_1.State.findByIdAndDelete(req.params.id);
        if (!state) {
            return res.status(404).send({ error: 'State not found' });
        }
        res.send({ message: 'State deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
});
exports.deleteState = deleteState;
