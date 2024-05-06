import express from "express";
import { CreateMountainDto } from "../dtos/create.mountain.dto";
import { PutMountainDto } from "../dtos/put.mountain.dto";
import { PatchMountainDto } from "../dtos/patch.mountain.dto";
import debug from "debug";
import shortid from "shortid";
import mongooseService from '../../common/services/mongoose.service';



const log: debug.IDebugger = debug('app:in-memory-dao');


class MountainDao {
  mountains: Array<CreateMountainDto> = []

  Schema = mongooseService.getMongoose().Schema;

  mountainSchema = new this.Schema({
    _id: String,
    name: String,
    description: String,
    rating: Number, //rating between 1-10
    lat: Number, //latitude
    long: Number, //longitude
    photos: Array<String>, //array of src strings for images
  }, {id: false});
  
  Mountain = mongooseService.getMongoose().model('Mountains', this.mountainSchema);

  constructor() {
    log('Created new instance of MountainDAO');
  }

  async addMountain(mountainFields: CreateMountainDto) {
    const mountainId = shortid.generate();
    const mountain = new this.Mountain({
      _id: mountainId,
      ...mountainFields
    });
    await mountain.save();
    return mountainId;
  }

  async getMountains(limit=10, pageNumber=0) {
    return this.Mountain.find()
      .limit(limit)
      .skip(limit*pageNumber)
      .exec();
  }

  async getMountainById(mountainId: string) {
    return this.Mountain.findOne({ _id: mountainId }).exec();
  }

  async getMountainByName(mountainName: string) {
    return this.Mountain.findOne({ name: mountainName }).exec();
  }

  async updateMountainById(mountainId: string, mountainFields: PatchMountainDto | PutMountainDto) {
    const existingMountain = await this.Mountain.findOneAndUpdate(
      { _id: mountainId },
      { $set: mountainFields},
      { new: true },
    ).exec();

    return existingMountain;
  }

  async removeMountainById(mountainId: string) {
    return this.Mountain.deleteOne({ _id: mountainId }).exec();
  }
}

export default new MountainDao();