"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_dao_1 = __importDefault(require("../dao/messages.dao"));
class MessageService {
    async list(limit, page) {
        return messages_dao_1.default.getMessages(limit, page);
    }
    async listByOwnerId(ownerId) {
        return messages_dao_1.default.getMessagesByOwner(ownerId);
    }
    async create(resource) {
        return messages_dao_1.default.addMessage(resource);
    }
    async readById(id) {
        return messages_dao_1.default.getMessageById(id);
    }
    async readMessageByCategory(name) {
        return messages_dao_1.default.getMessageByCategory(name);
    }
    async putById(id, resource) {
        return messages_dao_1.default.updateMessageById(id, resource);
    }
    async patchById(id, resource) {
        return messages_dao_1.default.updateMessageById(id, resource);
    }
    async deleteById(id) {
        return messages_dao_1.default.removeMessageById(id);
    }
}
exports.default = new MessageService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tZXNzYWdlcy9zZXJ2aWNlcy9tZXNzYWdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsdUVBQThDO0FBTTlDLE1BQU0sY0FBYztJQUNsQixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQWEsRUFBRSxJQUFZO1FBQ3BDLE9BQU8sc0JBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQWU7UUFDakMsT0FBTyxzQkFBVyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQTBCO1FBQ3JDLE9BQU8sc0JBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBVTtRQUN2QixPQUFPLHNCQUFXLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBWTtRQUN0QyxPQUFPLHNCQUFXLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBVSxFQUFFLFFBQXVCO1FBQy9DLE9BQU8sc0JBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBVSxFQUFFLFFBQXlCO1FBQ25ELE9BQU8sc0JBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBVTtRQUN6QixPQUFPLHNCQUFXLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxjQUFjLEVBQUUsQ0FBQyJ9