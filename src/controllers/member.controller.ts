import{T} from "../libs/types/common";
import { Request, Response } from "express";
import MemberService from "../modules/Member.service";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { HttpmCode, Message } from "../libs/Errors";
import AuthService from "../modules/Auth.service";
import { AUTH_TIMER } from "../libs/config";

const memberService = new MemberService();
const authService = new AuthService ();

//REACT
const memberController: T = {};


memberController.signup = async  (req: Request, res: Response) => {
  try {
    console.log("signup");
    console.log("body:", req.body);

    const input: MemberInput = req.body,
     result: Member = await memberService.signup(input);
     const token = await authService.createToken(result);


     res.cookie("accessToken", token,
     { maxAge: AUTH_TIMER *3600 *1000,
       httpOnly: false
     });


    res.status(HttpmCode.CREAT).json({member: result, accessToken: token});
  } catch (err) {
    console.log("Error, signup:", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);

  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: LoginInput = req.body,
     result = await memberService.login(input),
     token = await authService.createToken(result);

    res.cookie("accessToken", token,
    { maxAge: AUTH_TIMER *3600 *1000,
      httpOnly: false
    });


    res.status(HttpmCode.OK).json({member: result, accessToken: token});
  } catch (err) {
    console.log("Error, signup:", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};




memberController.verifyAuth = async (req: Request, res: Response) => {

  try {
    let member = null;
    const token =req.cookies["accessToken"];
    if(token) member = await authService.checkAuth(token);

    if(!member)
     throw new Errors(HttpmCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);

    console.log("member:", member);
    res.status(HttpmCode.OK).json({member: member});

  }catch (err) {
    console.log("Error, verifyAuth:", err);
    if(err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }

}

export default memberController;