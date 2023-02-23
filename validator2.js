// Validation Module JOI - USER

const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().max(255).required(),
  lastname : Joi.string().max(255).required(),
  city: Joi.string().max(255),
  language: Joi.string().max(255)
})

const validateUserJOI = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    { abortEarly: false }
  )
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
}

// Validation Module JOI - MOVIE

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(255).required(),
  year: Joi.number().min(1895).max(2100).required(),
  color: Joi.string().max(255).required(),
  duration: Joi.number().min(0).max(1000).required()
})

const validateMovieJOI = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const {error} = movieSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  )
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
}

// Validation Module EXPRESS-VALIDATOR - USER

const { body, validationResult } = require('express-validator');

const validateUserExpress = [
  body("email")
    .notEmpty()
    .withMessage("L'adresse mail est obligatoire")
    .isEmail()
    .withMessage("L'adresse mail n'est pas valide"),
  body("firstname")
    .notEmpty()
    .withMessage('Le prénom est obligatoire')
    .isLength({ max: 255})
    .withMessage('La longueur maximale est de 255 caractères'),
  body("lastname")
    .notEmpty()
    .withMessage('Le nom est obligatoire')
    .isLength({ max: 255})
    .withMessage('La longueur maximale est de 255 caractères'),
  body("city").optional()
    .isLength({ max:255 })
    .withMessage('La longueur maximale est de 255 caractères'),
  body("language")
    .isLength({ max:255 })
    .withMessage('La longueur maximale est de 255 caractères'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

// Validation Module EXPRESS-VALIDATOR - MOVIE




const validateMovieExpress = [
  body("title")
    .notEmpty()
    .withMessage("Le titre est obligatoire")
    .isLength({ max: 255})
    .withMessage("La longueur maximale est de 255 caractères"),
  body("director")
    .notEmpty()
    .withMessage('Le nom du réalisteur est obligatoire')
    .isLength({ max: 255})
    .withMessage('La longueur maximale est de 255 caractères'),
  body("year")
    .notEmpty()
    .withMessage('L\'année est obligatoire')
    .isInt({ min: 1895, max: 2100})
    .withMessage('L\'année n\'est pas valide'),
  body("color").optional()
    .notEmpty()
    .withMessage('La couleur est obligatoire')
    .isBoolean()
    .withMessage('La saisie est invalide'),
  body("duration")
    .notEmpty()
    .withMessage('La durée est obligatoire')
    .isInt({ min: 0, max: 1000})
    .withMessage('La durée n\'est pas valide'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = {
  validateMovieJOI,
  validateUserJOI,
  validateUserExpress,
  validateMovieExpress,
};