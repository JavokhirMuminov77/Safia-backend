
import { Request, Response } from "express";
import Errors from "../libs/Errors";
import { T } from "../libs/types/common";
import ProductceService from "../modules/product.service";

//REACT
const productController: T = {};
const prodectService = new  ProductceService ;

productController.getAllProducts = async  (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");
    res.render("products");
  } catch (err) {
    console.log("Error, getAllProduct:", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);

  }
};


productController.createNewProduct = async  (req: Request, res: Response) => {
  try {
    console.log("createNewProductts");
  } catch (err) {
    console.log("Error, createNewProduct:", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);

  }
};




productController.updateChosenProduct = async  (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
  } catch (err) {
    console.log("Error, updateChosenProduct:", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);

  }
};


export default productController;