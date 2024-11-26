import Product from "../model/productMode.js";

import { errorHandler } from "../utils/error.js";

export const addProduct = async (req, res, next) => {
  const { name, description, price, category, stock, imageUrl } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    stock,
    imageUrl,
  });

  try {
    
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created Successfully!",
      product: savedProduct,
});
}
  catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return next(errorHandler(404, "Product Not Found!"));
    }

    res.status(200).json({
      message: "Product Updated Successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return next(errorHandler(400, "Invalid Product ID"));
    }
    next(error);
  }
};

export const deleteProduct = async(req, res, next) => {
   try {
     const deletedProduct = await Product.findByIdAndDelete(req.params.id);

     if(!deletedProduct){
      return next(errorHandler(404, 'Product Not Found!'));
     }

     res.status(200).json({
      message: 'Product Deleted Successfully!',
      product: deletedProduct.name,
    });
   } catch (error) {
      if(error.kind === 'ObjectId'){
        return next(errorHandler(400, 'Invalid Product ID'));
      }
      next(error);
   }
}


export const listProducts = async(req, res,next) => {
  try {
     const products = await Product.find();
     res.status(200).json(products);
  } catch (error) {
     next(error);
  }
};


export const viewProduct = async(req, res, next) => {
   try {
      const product = await Product.findById(req.params.id);

      if(!product){
        return next(errorHandler(404, 'Product not Found!'));
      }

      res.status(200).json(product);
   } catch (error) {
      next(error);
   }
}