import{T} from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../modules/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import { Message } from "../libs/Errors";

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




restaurantController.processSignup = async  (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");
    console.log("body:", req.body);

    const newMmember: MemberInput = req.body;
    newMmember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMmember);
    //TODO: SESSIONS AUTHENTACATION

    req.session.member = result;
    req.session.save( function() {
       res.send(result);
    });
  } catch (err) {
    console.log("Error, processSignup:", err);
    res.send(err);
  }
};

restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");
    console.log("body:", req.body);
    const input: LoginInput = req.body;

    const memberService = new MemberService();
    const result = await memberService.processLogin(input);

    req.session.member = result;
    req.session.save( function() {
       res.send(result);
    });

  } catch (err) {
    console.log("Error, processLogin:", err);
    res.send(err);
  }
};


restaurantController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("checkAuthSession");
    if(req.session?.member)
    res.send(`<script> alert("${req.session.member.memberNick}) </script>`);
  else res.send(`<script> alert("${ Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, checkAuthSession:", err);
    res.send(err);
  }
};


export default restaurantController;