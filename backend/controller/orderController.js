import Product from "../model/productMode.js";
import {errorHandler} from "../utils/error.js";
import Order from "../model/orderModel.js";

export const placeOrder = async(req, res, next) => {
    try {
        const {userId, products, shippingAddress, paymentMethod} = req.body;

        let totalPrice = 0;

        for(const item of products){
            const product = await Product.findById(item.productId);

            if(!product){
                return next(errorHandler(404, 'Product Not Found!'));
            }

            totalPrice += product.price * item.quantity;
        }

        const newOrder = new Order ({
            userId, products, totalPrice, shippingAddress, paymentMethod
        });

        await newOrder.save();

        res.status(201).json({
            message: 'Order Placed Successfully!',
            newOrder
        });
    } catch (error) {
        next(error);
    }
}

export const viewOrders = async(req, res, next) => {
    try {
        let orders;
        if(req.user.role === 'admin'){
            orders = await Order.find();
        }

        else {
            orders = await Order.find({userId: req.user.id});
        }
        res.status(201).json(orders);
    } catch (error) {
        next(error);
    }
}

export const viewSingleOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id.trim();
        const order = await Order.findById(req.params.id);

        if(!order){
            return next(errorHandler(400, 'Order Not Found!'));
        }

        if(req.user.role !== 'admin' && order.userId.toString() !== req.user.id){
            return next(errorHandler(401, 'UnAuthorized Access'));
        }

        res.status(201).json(order);
    } catch (error) {
        if (error.name === 'CastError') {
            return next(errorHandler(400, 'Invalid order ID format'));
          }
        next(error);
    }
}


export const cancelOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if(!order){
            return next(errorHandler(402, 'Order Not Found!'));
        }

        if(req.user.role !== 'admin' && order.userId.toString() !== req.user.id){
            return next(errorHandler(403, 'UnAuthorized Access'));
        }
         
        await Order.findByIdAndDelete(req.params.id);
        res.status(201).json({
           message:'Order Cancelled Successfully!', 
           order,
        });
    } catch (error) {
        next(error);
    }
}