import User from "../model/usermodel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";


export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'You can only Update your own Account!'));

    }

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            }
        }, {new: true})

        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return next(errorHandler(400, 'Invalid user ID format'));
        }
        next(error);
    }
}


export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return next(errorHandler(404, 'User not Found!'))
        }

        const {password: pass, ...rest} = user._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}