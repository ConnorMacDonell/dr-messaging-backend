"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const shortid_1 = __importDefault(require("shortid"));
const mongoose_service_1 = __importDefault(require("../../shared/services/mongoose.service"));
const log = (0, debug_1.default)('app:in-memory-dao');
class MessageDao {
    messages = [];
    Schema = mongoose_service_1.default.getMongoose().Schema;
    messageSchema = new this.Schema({
        _id: String,
        messageBody: String,
        ownerId: String,
        category: String,
    }, { id: false });
    Message = mongoose_service_1.default.getMongoose().model('Messages', this.messageSchema);
    constructor() {
        log('Created new instance of MessageDAO');
    }
    async addMessage(messageFields) {
        const messageId = shortid_1.default.generate();
        const message = new this.Message({
            _id: messageId,
            ...messageFields
        });
        await message.save();
        return messageId;
    }
    async getMessages(limit = 10, pageNumber = 0) {
        return this.Message.find()
            .limit(limit)
            .skip(limit * pageNumber)
            .exec();
    }
    async getMessagesByOwner(ownerId) {
        return this.Message.find({ ownerId: ownerId }).exec();
    }
    async getMessageById(messageId) {
        return this.Message.findOne({ _id: messageId }).exec();
    }
    async getMessageByCategory(messageCategory) {
        return this.Message.findOne({ category: messageCategory }).exec();
    }
    async updateMessageById(messageId, messageFields) {
        const existingMessage = await this.Message.findOneAndUpdate({ _id: messageId }, { $set: messageFields }, { new: true }).exec();
        return existingMessage;
    }
    async removeMessageById(messageId) {
        return this.Message.deleteOne({ _id: messageId }).exec();
    }
}
exports.default = new MessageDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21lc3NhZ2VzL2Rhby9tZXNzYWdlcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFJQSxrREFBMEI7QUFDMUIsc0RBQThCO0FBQzlCLDhGQUFxRTtBQUtyRSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUd4RCxNQUFNLFVBQVU7SUFDZCxRQUFRLEdBQTRCLEVBQUUsQ0FBQTtJQUV0QyxNQUFNLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFFOUMsYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM5QixHQUFHLEVBQUUsTUFBTTtRQUNYLFdBQVcsRUFBRSxNQUFNO1FBQ25CLE9BQU8sRUFBRSxNQUFNO1FBQ2YsUUFBUSxFQUFFLE1BQU07S0FDakIsRUFBRSxFQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBRWhCLE9BQU8sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTlFO1FBQ0UsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBK0I7UUFDOUMsTUFBTSxTQUFTLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDL0IsR0FBRyxFQUFFLFNBQVM7WUFDZCxHQUFHLGFBQWE7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFDLEVBQUUsRUFBRSxVQUFVLEdBQUMsQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO2FBQ3ZCLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDWixJQUFJLENBQUMsS0FBSyxHQUFDLFVBQVUsQ0FBQzthQUN0QixJQUFJLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBZTtRQUN0QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBaUI7UUFDcEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pELENBQUM7SUFFRCxLQUFLLENBQUMsb0JBQW9CLENBQUMsZUFBdUI7UUFDaEQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BFLENBQUM7SUFFRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsU0FBaUIsRUFBRSxhQUE4QztRQUN2RixNQUFNLGVBQWUsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQ3pELEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUMsRUFDdEIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQ2QsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVULE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsU0FBaUI7UUFDdkMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNELENBQUM7Q0FDRjtBQUVELGtCQUFlLElBQUksVUFBVSxFQUFFLENBQUMifQ==