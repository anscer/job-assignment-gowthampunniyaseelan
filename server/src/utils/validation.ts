import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const stateValidationRules = () => {
  return [
    body('name').isString().optional({ checkFalsy: true }).notEmpty(),
    body('description').isString().optional({ checkFalsy: true }),
    body('status').isString().optional({ checkFalsy: true }).notEmpty(),
    body('createdBy').isString().optional({ checkFalsy: true }).notEmpty()
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
