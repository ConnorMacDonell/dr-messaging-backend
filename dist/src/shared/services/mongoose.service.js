"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:mongoose-service');
class MongooseService {
    count = 0;
    mongooseOptions = {
        serverSelectionTimeoutMS: 5000,
    };
    constructor() {
        this.connectWithRetry();
    }
    getMongoose() {
        return mongoose_1.default;
    }
    connectWithRetry = () => {
        log('Attempting MongoDB connection (will retry if needed');
        // Use environment variable for production, fallback to local for development
        const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/api-db';
        console.log('Connecting to MongoDB:', mongoUrl.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Log URL without credentials
        mongoose_1.default
            .connect(mongoUrl, this.mongooseOptions)
            .then(() => {
            console.log('MongoDB is connected...');
        })
            .catch((err) => {
            const retrySeconds = 5;
            console.log(`MongoDB connection unsuccessful (will retry #${++this
                .count} after ${retrySeconds} seconds):`, err);
            setTimeout(this.connectWithRetry, retrySeconds * 1000);
        });
    };
}
exports.default = new MongooseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaGFyZWQvc2VydmljZXMvbW9uZ29vc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUNoQyxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFM0QsTUFBTSxlQUFlO0lBQ1gsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNWLGVBQWUsR0FBRztRQUN4Qix3QkFBd0IsRUFBRSxJQUFJO0tBQy9CLENBQUM7SUFFRjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxrQkFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxnQkFBZ0IsR0FBRyxHQUFHLEVBQUU7UUFDdEIsR0FBRyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7UUFFM0QsNkVBQTZFO1FBQzdFLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLGtDQUFrQyxDQUFDO1FBRS9FLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsOEJBQThCO1FBRXpILGtCQUFRO2FBQ0wsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQ3ZDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDYixNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxnREFBZ0QsRUFBRSxJQUFJO2lCQUNuRCxLQUFLLFVBQVUsWUFBWSxZQUFZLEVBQzFDLEdBQUcsQ0FDTixDQUFDO1lBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUM7Q0FDSDtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==