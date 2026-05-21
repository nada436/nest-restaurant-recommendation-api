import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CuisineEnum } from 'src/common/enums/cuisine.enum';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Restaurant {
  @Prop({
    type: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
  })
  name: {
    en: string;
    ar: string;
  };

  @Prop({
    unique: true,
    required: true,
  })
  slug: string;

  @Prop({
    type: [String],
    enum: CuisineEnum,
    default: [],
  })
  cuisines: CuisineEnum[];

 @Prop({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    required: true,
  },
})
location: {
  type: string;
  coordinates: number[];
};};

export const RestaurantSchema =
  SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({ location: '2dsphere' });