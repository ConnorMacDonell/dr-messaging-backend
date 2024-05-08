"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:mongoose-service');
class MongooseService {
    constructor() {
        this.count = 0;
        this.mongooseOptions = {
            serverSelectionTimeoutMS: 5000,
        };
        this.connectWithRetry = () => {
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
        this.connectWithRetry();
    }
    getMongoose() {
        return mongoose_1.default;
    }
}
exports.default = new MongooseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21tb24vc2VydmljZXMvbW9uZ29vc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHdEQUFnQztBQUNoQyxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFM0QsTUFBTSxlQUFlO0lBTW5CO1FBTFEsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLG9CQUFlLEdBQUc7WUFDeEIsd0JBQXdCLEVBQUUsSUFBSTtTQUMvQixDQUFDO1FBVUYscUJBQWdCLEdBQUcsR0FBRyxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1lBQzNELGtCQUFRO2lCQUNMLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDO2lCQUNqRSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2IsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUNQLGdEQUFnRCxFQUFFLElBQUk7cUJBQ25ELEtBQUssVUFBVSxZQUFZLFlBQVksRUFDMUMsR0FBRyxDQUNOLENBQUM7Z0JBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7UUF2QkEsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELFdBQVc7UUFDVCxPQUFPLGtCQUFRLENBQUM7SUFDbEIsQ0FBQztDQW1CRjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==