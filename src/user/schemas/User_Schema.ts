import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CuisineEnum } from 'src/common/enums/cuisine.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
  })
  fullName: string;

  @Prop({
    type: [String],
    enum: CuisineEnum,
    default: [],
  })
  favoriteCuisines: CuisineEnum[];
}

export const UserSchema =
  SchemaFactory.createForClass(User);