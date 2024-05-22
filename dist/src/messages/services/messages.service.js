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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tZXNzYWdlcy9zZXJ2aWNlcy9tZXNzYWdlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUVBQThDO0FBTTlDLE1BQU0sY0FBYztJQUNaLElBQUksQ0FBQyxLQUFhLEVBQUUsSUFBWTs7WUFDcEMsT0FBTyxzQkFBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFDLFFBQTBCOztZQUNyQyxPQUFPLHNCQUFXLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxFQUFVOztZQUN2QixPQUFPLHNCQUFXLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsQ0FBQztLQUFBO0lBRUsscUJBQXFCLENBQUMsSUFBWTs7WUFDdEMsT0FBTyxzQkFBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxFQUFVLEVBQUUsUUFBdUI7O1lBQy9DLE9BQU8sc0JBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDcEQsQ0FBQztLQUFBO0lBRUssU0FBUyxDQUFDLEVBQVUsRUFBRSxRQUF5Qjs7WUFDbkQsT0FBTyxzQkFBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNwRCxDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsRUFBVTs7WUFDekIsT0FBTyxzQkFBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxjQUFjLEVBQUUsQ0FBQyJ9