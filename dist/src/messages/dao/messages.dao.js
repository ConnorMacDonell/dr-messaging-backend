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
            body: String,
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
    getMessageByName(messageName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Message.findOne({ name: messageName }).exec();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21lc3NhZ2VzL2Rhby9tZXNzYWdlcy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQSxrREFBMEI7QUFDMUIsc0RBQThCO0FBQzlCLDhGQUFxRTtBQUlyRSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUd4RCxNQUFNLFVBQVU7SUFjZDtRQWJBLGFBQVEsR0FBNEIsRUFBRSxDQUFBO1FBRXRDLFdBQU0sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUU5QyxrQkFBYSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM5QixHQUFHLEVBQUUsTUFBTTtZQUNYLElBQUksRUFBRSxNQUFNO1lBQ1osUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU07U0FDakIsRUFBRSxFQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBRWhCLFlBQU8sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRzVFLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFSyxVQUFVLENBQUMsYUFBK0I7O1lBQzlDLE1BQU0sU0FBUyxHQUFHLGlCQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckMsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxpQkFDOUIsR0FBRyxFQUFFLFNBQVMsSUFDWCxhQUFhLEVBQ2hCLENBQUM7WUFDSCxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixPQUFPLFNBQVMsQ0FBQztRQUNuQixDQUFDO0tBQUE7SUFFSyxXQUFXOzZEQUFDLEtBQUssR0FBQyxFQUFFLEVBQUUsVUFBVSxHQUFDLENBQUM7WUFDdEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtpQkFDdkIsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDWixJQUFJLENBQUMsS0FBSyxHQUFDLFVBQVUsQ0FBQztpQkFDdEIsSUFBSSxFQUFFLENBQUM7UUFDWixDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsU0FBaUI7O1lBQ3BDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RCxDQUFDO0tBQUE7SUFFSyxnQkFBZ0IsQ0FBQyxXQUFtQjs7WUFDeEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVELENBQUM7S0FBQTtJQUVLLGlCQUFpQixDQUFDLFNBQWlCLEVBQUUsYUFBOEM7O1lBQ3ZGLE1BQU0sZUFBZSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FDekQsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQ2xCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBQyxFQUN0QixFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FDZCxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVQsT0FBTyxlQUFlLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssaUJBQWlCLENBQUMsU0FBaUI7O1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzRCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksVUFBVSxFQUFFLENBQUMifQ==