import{T} from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../modules/Member.servervice";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";



const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home Page");
    console.log('home');

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

restaurantController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    console.log("body:", req.body);
    const input: LoginInput = req.body;

    const memberService = new MemberService();
    const result = await memberService.processLogin(input);


    res.send(result);
  } catch (err) {
    console.log("Error, processLogin:", err);
    res.send(err);
  }
};


restaurantController.processSignup = async  (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    console.log("body:", req.body);

    const newMmember: MemberInput = req.body;
    newMmember.memberType = MemberType.RESTAURANT

    const memberService = new MemberService();
    const result = await memberService.processSignup(newMmember);


    res.send(result);
  } catch (err) {
    console.log("Error, processSignup:", err);
    res.send(err);
  }
};

export default restaurantController;