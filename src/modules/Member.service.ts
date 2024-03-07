import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors ,{ HttpmCode, Message} from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";

class MemberService {
  private readonly memberModel;

  constructor () {
    this.memberModel = MemberModel;
  }

    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel
        .findOne({memberType: MemberType.RESTAURANT})
        .exec();
;
        if (exist) throw new Errors(HttpmCode.BAD_REQUEST, Message.CREATE_FAILED);

        const salt = await bcrypt.genSalt();
        input.memberPasword = await bcrypt.hash(input.memberPasword, salt);

      try {
         const result = await this.memberModel.create(input);
         result.memberPasword = "";
         return result;
      } catch (err) {
        throw new Errors(HttpmCode.BAD_REQUEST, Message.CREATE_FAILED);
      }

    }


    public async processLogin(input: LoginInput): Promise<Member> {
      const member = await this.memberModel
      .findOne(
        {memberNick: input.memberNick},
        {memberNick: 1, memberPasword: 1})
      .exec();
      if(!member) throw new Errors(HttpmCode.NOT_FOUND, Message.NO_MEMBER_NICK);

      const isMatch = await bcrypt.compare(
        input.memberPasword,
        member.memberPasword
        );


      if(isMatch){
        throw new Errors(HttpmCode.UNAUTHORIZED, Message.WRONG_PASWORD);
      }



      return await this.memberModel.findById(member._id).exec();

      console.log("memeberNick", member);
      return member;
    }
}

export default MemberService;