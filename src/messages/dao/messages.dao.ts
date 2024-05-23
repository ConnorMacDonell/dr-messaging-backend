import express from "express";
import { CreateMessageDto } from "../dtos/create.message.dto";
import { PutMessageDto } from "../dtos/put.message.dto";
import { PatchMessageDto } from "../dtos/patch.message.dto";
import debug from "debug";
import shortid from "shortid";
import mongooseService from '../../shared/services/mongoose.service';
import Logger from "../../lib/logger";



const log: debug.IDebugger = debug('app:in-memory-dao');


class MessageDao {
  messages: Array<CreateMessageDto> = []

  Schema = mongooseService.getMongoose().Schema;

  messageSchema = new this.Schema({
    _id: String,
    messageBody: String,
    ownerId: String,
    category: String,
  }, {id: false});
  
  Message = mongooseService.getMongoose().model('Messages', this.messageSchema);

  constructor() {
    log('Created new instance of MessageDAO');
  }

  async addMessage(messageFields: CreateMessageDto) {
    const messageId = shortid.generate();
    const message = new this.Message({
      _id: messageId,
      ...messageFields
    });
    await message.save();
    return messageId;
  }

  async getMessages(limit=10, pageNumber=0) {
    return this.Message.find()
      .limit(limit)
      .skip(limit*pageNumber)
      .exec();
  }

  async getMessagesByOwner(ownerId: string) {
    return this.Message.find({ ownerId: ownerId }).exec();
  }

  async getMessageById(messageId: string) {
    return this.Message.findOne({ _id: messageId }).exec();
  }

  async getMessageByCategory(messageCategory: string) {
    return this.Message.findOne({ name: messageCategory }).exec();
  }

  async updateMessageById(messageId: string, messageFields: PatchMessageDto | PutMessageDto) {
    const existingMessage = await this.Message.findOneAndUpdate(
      { _id: messageId },
      { $set: messageFields},
      { new: true },
    ).exec();

    return existingMessage;
  }

  async removeMessageById(messageId: string) {
    return this.Message.deleteOne({ _id: messageId }).exec();
  }
}

export default new MessageDao();