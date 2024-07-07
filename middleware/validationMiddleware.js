const { check, validationResult } = require('express-validator');

exports.validateRegister = [
  check('firstName').not().isEmpty().withMessage('First name is required'),
  check('lastName').not().isEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateLogin = [
  check('email').isEmail().withMessage('Email is required'),
  check('password').not().isEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
