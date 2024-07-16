import { Request, Response } from 'express';
import { State, IState } from '../models/stateModel';

export const createState = async (req: Request, res: Response) => {
  const { name, description, status, createdBy } = req.body;

  try {
    const state: IState = new State({
      name,
      description,
      status,
      createdBy,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await state.save();
    res.status(201).send(state);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const getStates = async (req: Request, res: Response) => {
  try {
    const states = await State.find({});
    res.send(states);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};

export const updateState = async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'status', 'updatedAt'];
  const isValidOperation = updates.find(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).send({ error: 'State not found' });
    }

    updates.forEach(update => (state[update] = req.body[update]));
    state.updatedAt = new Date();
    await state.save();

    res.send(state);
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);

    if (!state) {
      return res.status(404).send({ error: 'State not found' });
    }

    res.send({ message: 'State deleted successfully' });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
