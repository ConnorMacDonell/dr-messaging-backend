"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};
winston_1.default.addColors(colors);
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
const transports = [
    new winston_1.default.transports.Console(),
    new winston_1.default.transports.File({
        filename: 'logs/error.log',
        level: 'error',
    }),
    new winston_1.default.transports.File({ filename: 'logs/all.log' }),
];
const Logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
exports.default = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBNkI7QUFFN0IsTUFBTSxNQUFNLEdBQUc7SUFDYixLQUFLLEVBQUUsQ0FBQztJQUNSLElBQUksRUFBRSxDQUFDO0lBQ1AsSUFBSSxFQUFFLENBQUM7SUFDUCxJQUFJLEVBQUUsQ0FBQztJQUNQLEtBQUssRUFBRSxDQUFDO0NBQ1QsQ0FBQTtBQUVELE1BQU0sS0FBSyxHQUFHLEdBQUcsRUFBRTtJQUNqQixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUE7SUFDakQsTUFBTSxhQUFhLEdBQUcsR0FBRyxLQUFLLGFBQWEsQ0FBQTtJQUMzQyxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7QUFDekMsQ0FBQyxDQUFBO0FBRUQsTUFBTSxNQUFNLEdBQUc7SUFDYixLQUFLLEVBQUUsS0FBSztJQUNaLElBQUksRUFBRSxRQUFRO0lBQ2QsSUFBSSxFQUFFLE9BQU87SUFDYixJQUFJLEVBQUUsU0FBUztJQUNmLEtBQUssRUFBRSxPQUFPO0NBQ2YsQ0FBQTtBQUVELGlCQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRXpCLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDbkMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLHdCQUF3QixFQUFFLENBQUMsRUFDOUQsaUJBQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQ3RDLGlCQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDbkIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FDN0QsQ0FDRixDQUFBO0FBRUQsTUFBTSxVQUFVLEdBQUc7SUFDakIsSUFBSSxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7SUFDaEMsSUFBSSxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDMUIsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixLQUFLLEVBQUUsT0FBTztLQUNmLENBQUM7SUFDRixJQUFJLGlCQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsQ0FBQztDQUMxRCxDQUFBO0FBRUQsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUM7SUFDbEMsS0FBSyxFQUFFLEtBQUssRUFBRTtJQUNkLE1BQU07SUFDTixNQUFNO0lBQ04sVUFBVTtDQUNYLENBQUMsQ0FBQTtBQUVGLGtCQUFlLE1BQU0sQ0FBQyJ9