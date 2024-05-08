"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../../lib/logger"));
// Override the stream method to use custom logger
const stream = {
    // Use http severity level
    write: (message) => logger_1.default.http(message),
};
// Skip Morgan http logging unless in dev mode
const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};
morgan_1.default.token('body', function (req, res) { return JSON.stringify(req); });
// Build morgan middleware
const morganMiddleware = (0, morgan_1.default)(
// Define message format string (this same as default).
":method :url :body :status :res[content-length] - :response-time ms", 
// Options: stream and skip overwritten above
{ stream, skip });
exports.default = morganMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9yZ2FuLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXV0aC9taWRkbGV3YXJlL21vcmdhbi5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQStDO0FBQy9DLDhEQUFzQztBQUV0QyxrREFBa0Q7QUFDbEQsTUFBTSxNQUFNLEdBQWtCO0lBQzVCLDBCQUEwQjtJQUMxQixLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLGdCQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztDQUN6QyxDQUFDO0FBRUYsOENBQThDO0FBQzlDLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtJQUNoQixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUM7SUFDbEQsT0FBTyxHQUFHLEtBQUssYUFBYSxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUVGLGdCQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFekUsMEJBQTBCO0FBQzFCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSxnQkFBTTtBQUM3Qix1REFBdUQ7QUFDdkQscUVBQXFFO0FBQ3JFLDZDQUE2QztBQUM3QyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FDakIsQ0FBQztBQUVGLGtCQUFlLGdCQUFnQixDQUFDIn0=