
import { Request, Response } from "express";
import Errors, { HttpmCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import ProductceService from "../modules/Product.service";
import { ProductInput } from "../libs/types/product";
import { AdminRequest } from "../libs/types/member";

//REACT
const productController: T = {};
const prodectService = new  ProductceService() ;

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


productController.createNewProduct = async  (req:AdminRequest, res: Response) => {
  try {
    console.log("createNewProductts");
    console.log("file", req.files);
    if(!req.files?.length)
     throw new Errors(HttpmCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

     const data: ProductInput = req.body;
     data.productImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g,"");
     });

    await prodectService.createNewProduct(data);

    res.send(`<script> alert("Sucessful creation!"); window.location.replace('admin/product/all) </script>`);


  } catch (err) {
    console.log("Error, createNewProduct:", err);
    const message = err instanceof Errors ? err.message:  Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert(${message}); window.location.replace('admin/product/all) </script>`);

  }
};




productController.updateChosenProduct = async  (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
    const id = req.params.id;

    const result = await prodectService.updateChosenProduct(id, req.body);

    res.status(HttpmCode.OK).json({data: result});
  } catch (err) {
    console.log("Error, updateChosenProduct:", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);

  }
};


export default productController;