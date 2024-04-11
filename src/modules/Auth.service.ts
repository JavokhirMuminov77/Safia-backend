import { token } from "morgan";
import Errors, { HttpmCode, Message } from "../libs/Errors";
import { AUTH_TIMER } from "../libs/config";
import { Member } from "../libs/types/member";
import jwt from "jsonwebtoken";

class AuthService {
  constructor () {


  }

  public async createToken(payload: Member) {
    return new Promise((resolve, reject) => {
      const duration = `${AUTH_TIMER}h`;/*24 soat ishlasin degani*/
      jwt.sign(payload, process.env.SECRET_TOKEN as string, {
        expiresIn: duration,
      }, (err, token) => {
       if(err) reject(new Errors(
        HttpmCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED )
        );
        else resolve(token as string);
      }

      );

    })

  }
}

export default AuthService;