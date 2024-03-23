import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import Errors ,{ HttpmCode, Message} from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseOnjectId } from "../libs/config";

class MemberService {
  private readonly memberModel;

  constructor () {
    this.memberModel = MemberModel;
  }





  /**SPA */

  public async signup(input: MemberInput): Promise<Member> {

    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);


  try {
     const result = await this.memberModel.create(input);
     result.memberPasword = "";
     return result.toJSON();
  } catch (err) {
    console.log("Error, model:signup", err);
    throw new Errors(HttpmCode.BAD_REQUEST, Message.USED_NICK_PHONE);
  }

}


public async login(input: LoginInput): Promise<Member> {
  //TODO: Cosider member status later
  const member = await this.memberModel
  .findOne(
    {memberNick: input.memberNick},
    {memberNick: 1, memberPassword: 1})
  .exec();
  if(!member) throw new Errors(HttpmCode.NOT_FOUND, Message.NO_MEMBER_NICK);

  const isMatch = await bcrypt.compare(
    input.memberPassword,
    member.memberPassword
    );


  if(!isMatch){
    throw new Errors(HttpmCode.UNAUTHORIZED, Message.WRONG_PASWORD);
  }



  return await this.memberModel.findById(member._id).lean().exec();

}

  /**SSR */

    public async processSignup(input: MemberInput): Promise<Member> {
        const exist = await this.memberModel
        .findOne({memberType: MemberType.RESTAURANT})
        .exec();


        if (exist) throw new Errors(HttpmCode.BAD_REQUEST, Message.CREATE_FAILED);

         const salt = await bcrypt.genSalt();
         input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

      try {
         const result = await this.memberModel.create(input);
         //result.memberPasword = "";
         console.log('inout',result);
         return result;
      } catch (err) {
        throw new Errors(HttpmCode.BAD_REQUEST, Message.CREATE_FAILED);
      }

    }


    public async processLogin(input: LoginInput): Promise<Member> {
      const member = await this.memberModel
      .findOne(
        {memberNick: input.memberNick},
        {memberNick: 1, memberPassword: 1})
      .exec();
      if(!member) throw new Errors(HttpmCode.NOT_FOUND, Message.NO_MEMBER_NICK);

      const isMatch = await bcrypt.compare(
        input.memberPassword,
        member.memberPassword
        );


      if(!isMatch){
        throw new Errors(HttpmCode.UNAUTHORIZED, Message.WRONG_PASWORD);
      }



      return await this.memberModel.findById(member._id).exec();

    }


    public async getUsers(): Promise<Member[]> {
      const result = await this.memberModel
      .find({memberType: MemberType.USER})
      .exec();
      if(!result) throw new Errors(HttpmCode.NOT_FOUND, Message.NO_DATA_FAUND);

      return result;
    }


    public async updateChoseUser(input: MemberUpdateInput): Promise<Member> {
      input._id = shapeIntoMongooseOnjectId(input._id);
      const result = await this.memberModel
      .findByIdAndUpdate({ _id: input._id}, input, { new: true})
      .exec();
      if(!result) throw new Errors(HttpmCode.NOT_MODIFIED, Message.UPDATE_FAILED);

      return result;
    }
 }

export default MemberService;