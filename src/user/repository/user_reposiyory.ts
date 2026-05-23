import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/User_Schema';
import { UseDto } from '../dto/CreateUserDto';
import { CuisineEnum } from 'src/common/enums/cuisine.enum';


@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  create(dto:UseDto) {
    return this.userModel.create(dto);
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }


  findByCuisineMatch(cuisines: CuisineEnum[], userId: string) {
  return this.userModel.aggregate([
    {
      $match: {
        favoriteCuisines: { $in: cuisines },
        _id: { $ne: new Types.ObjectId(userId) },
      },
    },
  ]);
}
}