import { User } from "../models/userModel.js";
export const addUser = async (req, res) => {
  const body = req.body;
  try {
    const newUser = new User(body);
    const token = await newUser.generateAuthToken();
    const saveUser = await newUser.save();
    res.send({ saveUser, token });
  } catch (err) {
    res.send(err);
  }
};

export const getUser = async (req, res) => {
  res.send(req.user);
};

export const logIn = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send("nope");
  }
};

export const logOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

export const updateUser = async (req, res) => {
  const body = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, body, {
      new: true,
      runValidators: true,
    });
    res.send(req.user);
  } catch (err) {
    res.send(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
};