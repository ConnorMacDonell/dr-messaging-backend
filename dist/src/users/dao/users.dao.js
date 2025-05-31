"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_service_1 = __importDefault(require("../../shared/services/mongoose.service"));
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const shared_permissionflag_enum_1 = require("../../shared/middleware/shared.permissionflag.enum");
const log = (0, debug_1.default)('app:in-memory-dao');
class UsersDao {
    users = [];
    Schema = mongoose_service_1.default.getMongoose().Schema;
    userSchema = new this.Schema({
        _id: String,
        email: String,
        password: { type: String, select: false },
        firstName: String,
        lastName: String,
        permissionFlags: Number,
        stripeCustomerId: String,
        stripeSubscriptionId: String,
    }, { id: false });
    User = mongoose_service_1.default.getMongoose().model('Users', this.userSchema);
    constructor() {
        log('Created new instance of UserDAO');
    }
    async addUser(userFields) {
        const userId = shortid_1.default.generate();
        const user = new this.User({
            _id: userId,
            ...userFields,
            permissionFlags: shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION,
        });
        await user.save();
        return userId;
    }
    async getUsers(limit = 25, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
    async getUserById(userId) {
        return this.User.findOne({ _id: userId }).exec();
    }
    async getUserByEmail(email) {
        return this.User.findOne({ email: email }).exec();
    }
    async getUserByEmailWithPassword(email) {
        return this.User.findOne({ email: email })
            .select('_id email permissionFlags +password')
            .exec();
    }
    async updateUserById(userId, userFields) {
        const existingUser = await this.User.findOneAndUpdate({ _id: userId }, { $set: userFields }, { new: true }).exec();
        return existingUser;
    }
    async removeUserById(userId) {
        return this.User.deleteOne({ _id: userId }).exec();
    }
}
exports.default = new UsersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3VzZXJzL2Rhby91c2Vycy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSw4RkFBcUU7QUFDckUsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQixtR0FBb0Y7QUFFcEYsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFeEQsTUFBTSxRQUFRO0lBQ1osS0FBSyxHQUF5QixFQUFFLENBQUM7SUFFakMsTUFBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBRWhELFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsR0FBRyxFQUFFLE1BQU07UUFDWCxLQUFLLEVBQUUsTUFBTTtRQUNiLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtRQUN6QyxTQUFTLEVBQUUsTUFBTTtRQUNqQixRQUFRLEVBQUUsTUFBTTtRQUNoQixlQUFlLEVBQUUsTUFBTTtRQUN2QixnQkFBZ0IsRUFBRSxNQUFNO1FBQ3hCLG9CQUFvQixFQUFFLE1BQU07S0FDN0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRWhCLElBQUksR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXJFO1FBQ0UsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBeUI7UUFDckMsTUFBTSxNQUFNLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDekIsR0FBRyxFQUFFLE1BQU07WUFDWCxHQUFHLFVBQVU7WUFDYixlQUFlLEVBQUUsMkNBQWMsQ0FBQyxlQUFlO1NBQ2hELENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTthQUNwQixLQUFLLENBQUMsS0FBSyxDQUFDO2FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDbEIsSUFBSSxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFjO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFhO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQsS0FBSyxDQUFDLDBCQUEwQixDQUFDLEtBQWE7UUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQzthQUNyQyxNQUFNLENBQUMscUNBQXFDLENBQUM7YUFDN0MsSUFBSSxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFjLEVBQUUsVUFBcUM7UUFDeEUsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUNuRCxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFDZCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFDcEIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQ2QsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVULE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQWM7UUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JELENBQUM7Q0FDRjtBQUVELGtCQUFlLElBQUksUUFBUSxFQUFFLENBQUMifQ==