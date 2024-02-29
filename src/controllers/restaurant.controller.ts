import{T} from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../modules/member.servervice";



const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home Page");
  } catch (err) {
    console.log(`Error, goHome:`, err)
  }

}


restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login Page");
  } catch (err) {
    console.log(`Error, getLogin:`, err)
  }

}


restaurantController.getSignup= (req: Request, res: Response) => {
  try {
    res.send("Signup Page");
  } catch (err) {
    console.log(`Error, getSignup:`, err)
  }

};


export default restaurantController;