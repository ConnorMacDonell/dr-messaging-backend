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
const messages_dao_1 = __importDefault(require("../dao/messages.dao"));
class MessageService {
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return messages_dao_1.default.getMessages(limit, page);
        });
    }
    listByOwnerId(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return messages_dao_1.default.getMessagesByOwner(ownerId);
        });
    }
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return messages_dao_1.default.addMessage(resource);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return messages_dao_1.default.removeMessageById(id);
        });
    }
    readMessageByCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return messages_dao_1.default.getMessageByCategory(name);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return messages_dao_1.default.updateMessageById(id, resource);
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return messages_dao_1.default.updateMessageById(id, resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return messages_dao_1.default.removeMessageById(id);
        });
    }
}
exports.default = new MessageService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tZXNzYWdlcy9zZXJ2aWNlcy9tZXNzYWdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQThDO0FBTTlDLE1BQU0sY0FBYztJQUNaLElBQUksQ0FBQyxLQUFhLEVBQUUsSUFBWTs7WUFDcEMsT0FBTyxzQkFBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUFDLE9BQWU7O1lBQ2pDLE9BQU8sc0JBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFSyxNQUFNLENBQUMsUUFBMEI7O1lBQ3JDLE9BQU8sc0JBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUFBO0lBRUssUUFBUSxDQUFDLEVBQVU7O1lBQ3ZCLE9BQU8sc0JBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQyxDQUFDO0tBQUE7SUFFSyxxQkFBcUIsQ0FBQyxJQUFZOztZQUN0QyxPQUFPLHNCQUFXLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRUssT0FBTyxDQUFDLEVBQVUsRUFBRSxRQUF1Qjs7WUFDL0MsT0FBTyxzQkFBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNwRCxDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsRUFBVSxFQUFFLFFBQXlCOztZQUNuRCxPQUFPLHNCQUFXLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3BELENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxFQUFVOztZQUN6QixPQUFPLHNCQUFXLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLGNBQWMsRUFBRSxDQUFDIn0=