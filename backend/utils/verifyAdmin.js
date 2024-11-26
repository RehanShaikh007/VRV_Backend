import {errorHandler} from "../utils/error.js";

export const verifyAdmin = (req, res, next) => {
    if(req.user && req.user.role == 'admin'){
        next();
    } else{
        return next(errorHandler(403, 'Admin Access Required'));
    }
};