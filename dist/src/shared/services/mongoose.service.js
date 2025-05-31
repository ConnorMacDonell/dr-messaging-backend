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
        mongoose_1.default
            .connect('mongodb://localhost:27017/api-db', this.mongooseOptions)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaGFyZWQvc2VydmljZXMvbW9uZ29vc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUNoQyxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFM0QsTUFBTSxlQUFlO0lBQ1gsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNWLGVBQWUsR0FBRztRQUN4Qix3QkFBd0IsRUFBRSxJQUFJO0tBQy9CLENBQUM7SUFFRjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxrQkFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxnQkFBZ0IsR0FBRyxHQUFHLEVBQUU7UUFDdEIsR0FBRyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7UUFDM0Qsa0JBQVE7YUFDTCxPQUFPLENBQUMsa0NBQWtDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQzthQUNqRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2IsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsZ0RBQWdELEVBQUUsSUFBSTtpQkFDbkQsS0FBSyxVQUFVLFlBQVksWUFBWSxFQUMxQyxHQUFHLENBQ04sQ0FBQztZQUNGLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDO0NBQ0g7QUFFRCxrQkFBZSxJQUFJLGVBQWUsRUFBRSxDQUFDIn0=