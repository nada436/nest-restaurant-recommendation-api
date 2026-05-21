import { IsMongoId } from 'class-validator';

export class CreateFollowDto {
 
  @IsMongoId()
  userId: string;

  @IsMongoId()
  restaurantId: string;
}
