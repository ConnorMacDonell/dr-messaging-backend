"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_service_1 = __importDefault(require("../services/messages.service"));
const debug_1 = __importDefault(require("debug"));
const twilio_service_1 = __importDefault(require("../services/twilio.service"));
const log = (0, debug_1.default)('app:messages-controller');
class MessagesController {
    async listMessages(req, res) {
        const messages = await messages_service_1.default.list(10, req.body.page - 1);
        res.status(200).send(messages);
    }
    async listMessagesByOwnerId(req, res) {
        const messages = await messages_service_1.default.listByOwnerId(res.locals.jwt.userId);
        res.status(200).send(messages);
    }
    async getMessageById(req, res) {
        const message = await messages_service_1.default.readById(req.body.id);
        res.status(200).send(message);
    }
    async getMessageByCategory(req, res) {
        const message = await messages_service_1.default.readMessageByCategory(req.body.category);
        res.status(200).send(message);
    }
    async createMessage(req, res) {
        const messageId = await messages_service_1.default.create(req.body);
        res.status(200).send(messageId);
    }
    async patch(req, res) {
        log(await messages_service_1.default.patchById(req.body.id, req.body));
        res.status(204).send();
    }
    async put(req, res) {
        log(await messages_service_1.default.putById(req.body.id, req.body));
        res.status(204).send();
    }
    async removeMessage(req, res) {
        log(await messages_service_1.default.deleteById(req.body.id));
        res.status(204).send();
    }
    async sendMessage(req, res) {
        const message = await messages_service_1.default.readById(req.body.id);
        const messageBody = message?.messageBody;
        const result = await twilio_service_1.default.sendMessage(req.body.recipients, messageBody);
        res.status(204).send(result);
    }
    async sendTestMessage(req, res) {
        const messageBody = "This message sent automatically, courtesy of Connor MacDonell";
        const result = await twilio_service_1.default.sendTestMessage('+14083355926', messageBody);
        res.status(204).send(result);
    }
}
exports.default = new MessagesController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tZXNzYWdlcy9jb250cm9sbGVycy9tZXNzYWdlcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0ZBQTBEO0FBRTFELGtEQUEwQjtBQUMxQixnRkFBdUQ7QUFFdkQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHlCQUF5QixDQUFDLENBQUM7QUFFOUQsTUFBTSxrQkFBa0I7SUFDdEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzVELE1BQU0sUUFBUSxHQUFHLE1BQU0sMEJBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxLQUFLLENBQUMscUJBQXFCLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUNyRSxNQUFNLFFBQVEsR0FBRyxNQUFNLDBCQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDOUQsTUFBTSxPQUFPLEdBQUcsTUFBTSwwQkFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLLENBQUMsb0JBQW9CLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUNwRSxNQUFNLE9BQU8sR0FBRyxNQUFNLDBCQUFjLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzdELE1BQU0sU0FBUyxHQUFHLE1BQU0sMEJBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDckQsR0FBRyxDQUFDLE1BQU0sMEJBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQ25ELEdBQUcsQ0FBQyxNQUFNLDBCQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBb0IsRUFBRSxHQUFxQjtRQUM3RCxHQUFHLENBQUMsTUFBTSwwQkFBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFvQixFQUFFLEdBQXFCO1FBQzNELE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzRCxNQUFNLFdBQVcsR0FBRyxPQUFPLEVBQUUsV0FBcUIsQ0FBQztRQUNuRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHdCQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2pGLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDL0QsTUFBTSxXQUFXLEdBQUcsK0RBQStELENBQUM7UUFDcEYsTUFBTSxNQUFNLEdBQUcsTUFBTSx3QkFBYSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDaEYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxrQkFBa0IsRUFBRSxDQUFDIn0=