const controller = module.exports
const bcrypt = require('bcrypt');
const Joi = require('joi');
const UserModel = require('../../models/user.model');
const AuthService = require('../../services/auth.service');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
})


controller.signin = async function (req, res) {
  let user = req.user;
  let token = AuthService.generateToken(user);
  res.json({ user, token });
}

controller.signup = async function (user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new UserModel(user).save();
}