import express from 'express';
import { createState, getStates, updateState, deleteState } from '../controllers/stateController';
import authMiddleware from '../middleware/authMiddleware';
import { stateValidationRules, validate } from '../utils/validation';

const router = express.Router();

router.post('/states', authMiddleware, stateValidationRules(), validate, createState);
router.get('/states', authMiddleware, getStates);
router.put('/states/:id', authMiddleware, stateValidationRules(), validate, updateState);
router.delete('/states/:id', authMiddleware, deleteState);

export default router;
