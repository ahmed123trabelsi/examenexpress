const yup = require("yup");
const validate = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      adresse: yup.string().required(),
      email: yup.string().email().required(),
     
    });
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });
  }
};
module.exports = validate;