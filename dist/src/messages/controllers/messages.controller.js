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
const messages_service_1 = __importDefault(require("../services/messages.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:messages-controller');
class MessagesController {
    listMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield messages_service_1.default.list(10, req.body.page - 1);
            res.status(200).send(messages);
        });
    }
    listMessagesByOwnerId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield messages_service_1.default.listByOwnerId(res.locals.jwt.userId);
            res.status(200).send(messages);
        });
    }
    getMessageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield messages_service_1.default.readById(req.body.id);
            res.status(200).send(message);
        });
    }
    getMessageByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield messages_service_1.default.readMessageByCategory(req.body.category);
            res.status(200).send(message);
        });
    }
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageId = yield messages_service_1.default.create(req.body);
            res.status(200).send(messageId);
        });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield messages_service_1.default.patchById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield messages_service_1.default.putById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    removeMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield messages_service_1.default.deleteById(req.body.id));
            res.status(204).send();
        });
    }
}
exports.default = new MessagesController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tZXNzYWdlcy9jb250cm9sbGVycy9tZXNzYWdlcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0ZBQTBEO0FBRTFELGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMseUJBQXlCLENBQUMsQ0FBQztBQUU5RCxNQUFNLGtCQUFrQjtJQUNoQixZQUFZLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDNUQsTUFBTSxRQUFRLEdBQUcsTUFBTSwwQkFBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsQ0FBQztLQUFBO0lBRUsscUJBQXFCLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDckUsTUFBTSxRQUFRLEdBQUcsTUFBTSwwQkFBYyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDOUQsTUFBTSxPQUFPLEdBQUcsTUFBTSwwQkFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUVLLG9CQUFvQixDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3BFLE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUVLLGFBQWEsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUM3RCxNQUFNLFNBQVMsR0FBRyxNQUFNLDBCQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFSyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDckQsR0FBRyxDQUFDLE1BQU0sMEJBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFSyxHQUFHLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDbkQsR0FBRyxDQUFDLE1BQU0sMEJBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFSyxhQUFhLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDN0QsR0FBRyxDQUFDLE1BQU0sMEJBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLGtCQUFrQixFQUFFLENBQUMifQ==