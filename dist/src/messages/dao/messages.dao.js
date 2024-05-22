"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const shortid_1 = __importDefault(require("shortid"));
const mongoose_service_1 = __importDefault(require("../../shared/services/mongoose.service"));
const log = (0, debug_1.default)('app:in-memory-dao');
class MessageDao {
    constructor() {
        this.messages = [];
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.messageSchema = new this.Schema({
            _id: String,
            message_body: String,
            owner_id: String,
            category: String,
        }, { id: false });
        this.Message = mongoose_service_1.default.getMongoose().model('Messages', this.messageSchema);
        log('Created new instance of MessageDAO');
    }
    addMessage(messageFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageId = shortid_1.default.generate();
            const message = new this.Message(Object.assign({ _id: messageId }, messageFields));
            yield message.save();
            return messageId;
        });
    }
    getMessages() {
        return __awaiter(this, arguments, void 0, function* (limit = 10, pageNumber = 0) {
            return this.Message.find()
                .limit(limit)
                .skip(limit * pageNumber)
                .exec();
        });
    }
    getMessageById(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Message.findOne({ _id: messageId }).exec();
        });
    }
    getMessageByCategory(messageCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Message.findOne({ name: messageCategory }).exec();
        });
    }
    updateMessageById(messageId, messageFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingMessage = yield this.Message.findOneAndUpdate({ _id: messageId }, { $set: messageFields }, { new: true }).exec();
            return existingMessage;
        });
    }
    removeMessageById(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Message.deleteOne({ _id: messageId }).exec();
        });
    }
}
exports.default = new MessageDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21lc3NhZ2VzL2Rhby9tZXNzYWdlcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQSxrREFBMEI7QUFDMUIsc0RBQThCO0FBQzlCLDhGQUFxRTtBQUlyRSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUd4RCxNQUFNLFVBQVU7SUFjZDtRQWJBLGFBQVEsR0FBNEIsRUFBRSxDQUFBO1FBRXRDLFdBQU0sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUU5QyxrQkFBYSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM5QixHQUFHLEVBQUUsTUFBTTtZQUNYLFlBQVksRUFBRSxNQUFNO1lBQ3BCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNO1NBQ2pCLEVBQUUsRUFBQyxFQUFFLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUVoQixZQUFPLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUc1RSxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUssVUFBVSxDQUFDLGFBQStCOztZQUM5QyxNQUFNLFNBQVMsR0FBRyxpQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3JDLE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8saUJBQzlCLEdBQUcsRUFBRSxTQUFTLElBQ1gsYUFBYSxFQUNoQixDQUFDO1lBQ0gsTUFBTSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDckIsT0FBTyxTQUFTLENBQUM7UUFDbkIsQ0FBQztLQUFBO0lBRUssV0FBVzs2REFBQyxLQUFLLEdBQUMsRUFBRSxFQUFFLFVBQVUsR0FBQyxDQUFDO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7aUJBQ3ZCLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ1osSUFBSSxDQUFDLEtBQUssR0FBQyxVQUFVLENBQUM7aUJBQ3RCLElBQUksRUFBRSxDQUFDO1FBQ1osQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLFNBQWlCOztZQUNwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekQsQ0FBQztLQUFBO0lBRUssb0JBQW9CLENBQUMsZUFBdUI7O1lBQ2hELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoRSxDQUFDO0tBQUE7SUFFSyxpQkFBaUIsQ0FBQyxTQUFpQixFQUFFLGFBQThDOztZQUN2RixNQUFNLGVBQWUsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQ3pELEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxFQUNsQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUMsRUFDdEIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQ2QsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVULE9BQU8sZUFBZSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtJQUVLLGlCQUFpQixDQUFDLFNBQWlCOztZQUN2QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0QsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLFVBQVUsRUFBRSxDQUFDIn0=