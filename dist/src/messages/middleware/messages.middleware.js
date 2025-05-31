"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_service_1 = __importDefault(require("../services/messages.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)("app:messages-middleware");
class MessagesMiddleware {
    async validateCategoryUniqueness(req, res, next) {
        const message = await messages_service_1.default.readMessageByCategory(req.body.category);
        if (message) {
            res.status(400).send('A message with the given category already exists.');
        }
        else {
            next();
        }
    }
    async validateMessageExistence(req, res, next) {
        const message = await messages_service_1.default.readById(req.params.messageId);
        if (message) {
            res.locals.message = message;
            next();
        }
        else {
            res.status(404).send({ error: `Message ${req.params.messageId} not found` });
        }
    }
    async extractMessageId(req, res, next) {
        req.body.id = req.params.messageId;
        next();
    }
}
exports.default = new MessagesMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tZXNzYWdlcy9taWRkbGV3YXJlL21lc3NhZ2VzLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvRkFBMEQ7QUFFMUQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRTlELE1BQU0sa0JBQWtCO0lBQ3RCLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7UUFDdEcsTUFBTSxPQUFPLEdBQUcsTUFBTSwwQkFBYyxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUUsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7UUFDNUUsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLHdCQUF3QixDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtRQUNwRyxNQUFNLE9BQU8sR0FBRyxNQUFNLDBCQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEUsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUM3QixJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7YUFBTSxDQUFDO1lBQ04sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUMvRSxDQUFDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7UUFDNUYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDO0NBR0Y7QUFFRCxrQkFBZSxJQUFJLGtCQUFrQixFQUFFLENBQUMifQ==