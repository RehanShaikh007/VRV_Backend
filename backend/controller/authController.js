import User from "../model/usermodel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword, role: role || 'user' });

  try {
    await newUser.save();
    res.status(200).json({
      message: "User created Successfully!",
      newUser
  });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not Found!"));
    }

    const validPassword = await bcryptjs.compare(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials!"));
    }

    const token = jwt.sign({ id: validUser._id, role: validUser.role }, process.env.JWT_SECRET, {expiresIn: '1d'});

    const { password: pass, ...rest } = validUser._doc;

    res.cookie('access_token', token, {
      httpOnly: true
    }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const signOut = async (req, res, next) => {
  try {
      res.cookie('access_token',"", {
          httpOnly: true,
          expires: new Date(Date.now()),
      });


      if (req.user && req.user.role === 'admin') {
          res.status(200).json('Admin Logged Out Successfully!');
      } else {
          res.status(200).json('User Logged Out Successfully!');
      }

  } catch (error) {
      next(error);
  }
};