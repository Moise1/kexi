import Joi from "@hapi/joi";

export const validateSignup = (user) => {
  const schema = Joi.object().keys({
    signup_first_name: Joi.string().min(3).max(50).required(),
    signup_last_name: Joi.string().min(3).max(20).required(),
    signup_email: Joi.string().email({minDomainSegments: 2}).trim().required(),
    signup_password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    .required()
    
  });
  return schema.validate(entry, options);
}; 