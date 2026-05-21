import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Follow, FollowDocument } from '../schemas/FollowSchema';
import { CreateFollowDto } from '../dto/CreateFollowDto';
import { RestaurantDto } from 'src/restaurant/dto/RestaurantDto';

@Injectable()
export class FollowRepository {
  constructor(
    @InjectModel(Follow.name)
    private readonly followModel: Model<FollowDocument>,
  ) {}

  async create(dto: CreateFollowDto): Promise<Follow> {
    const createdFollow = await this.followModel.create({
      userId: new Types.ObjectId(dto.userId),
      restaurantId: new Types.ObjectId(dto.restaurantId),
    });
    return createdFollow.toObject();
  }

  async findUsersFollows(userIds: any[]): Promise<any[]> {
    const objectUserIds = userIds.map((id) => new Types.ObjectId(id));

    return await this.followModel.aggregate([
      { $match: { userId: { $in: objectUserIds } } },

      {
        $group: {
          _id: '$restaurantId',
        },
      },

      {
        $addFields: {
          _id: { $toObjectId: '$_id' },
        },
      },

      {
        $lookup: {
          from: 'restaurants',
          localField: '_id',
          foreignField: '_id',
          as: 'restaurant',
        },
      },

      {
        $unwind: '$restaurant',
      },

      {
        $replaceRoot: { newRoot: '$restaurant' },
      },
    ]);
  }
  }


