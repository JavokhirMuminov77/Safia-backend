import { ExtendedRequest } from "../libs/types/member";
import { T  } from "../libs/types/common";
import { Response } from "express";
import Errors, { HttpmCode } from "../libs/Errors";
import OrderService from "../modules/Order.service";


const orderService = new OrderService
const orderController: T = {};

orderController.createOrder = async (req:ExtendedRequest, res: Response) => {
  try {
    console.log("createOrder");
    const result = await orderService.createOrder(req.member, req.body)


    res.status(HttpmCode.CREAT).json({result})
  } catch (err) {
    console.log("Error, signup:", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);

  }
}


export default orderController;