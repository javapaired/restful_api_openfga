// validators/userValidator.js

import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `"name" cannot be empty`,
    "any.required": `"name" is required`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `"email" cannot be empty`,
    "string.email": `"email" must be a valid email`,
    "any.required": `"email" is required`,
  }),
});

export async function validateBody(req, res, next) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
}
