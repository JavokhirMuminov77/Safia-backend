import{T} from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../modules/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

const memberService = new MemberService();


const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.render("home");
    console.log('home');

  } catch (err) {
    console.log(`Error, goHome:`, err)
  }

}


restaurantController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log(`Error, getSignup:`, err)
  }

};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(`Error, getLogin:`, err)
  }

}




restaurantController.processSignup = async  (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    console.log("body:", req.body);

    const newMmember: MemberInput = req.body;
    newMmember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMmember);

    //TODO: SESSIONS AUTHENTACATION

    res.send(result);
  } catch (err) {
    console.log("Error, processSignup:", err);
    res.send(err);
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




export default restaurantController;