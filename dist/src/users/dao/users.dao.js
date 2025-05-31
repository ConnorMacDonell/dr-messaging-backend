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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3VzZXJzL2Rhby91c2Vycy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSw4RkFBcUU7QUFDckUsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQixtR0FBb0Y7QUFFcEYsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFeEQsTUFBTSxRQUFRO0lBQ1osS0FBSyxHQUF5QixFQUFFLENBQUM7SUFFakMsTUFBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBRTlDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsR0FBRyxFQUFFLE1BQU07UUFDWCxLQUFLLEVBQUUsTUFBTTtRQUNiLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtRQUN6QyxTQUFTLEVBQUUsTUFBTTtRQUNqQixRQUFRLEVBQUUsTUFBTTtRQUNoQixlQUFlLEVBQUUsTUFBTTtLQUN4QixFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFbEIsSUFBSSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFckU7UUFDRSxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUF5QjtRQUNyQyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6QixHQUFHLEVBQUUsTUFBTTtZQUNYLEdBQUcsVUFBVTtZQUNiLGVBQWUsRUFBRSwyQ0FBYyxDQUFDLGVBQWU7U0FDaEQsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2FBQ3BCLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUNsQixJQUFJLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQWM7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQWE7UUFDaEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFRCxLQUFLLENBQUMsMEJBQTBCLENBQUMsS0FBYTtRQUM1QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDO2FBQ3JDLE1BQU0sQ0FBQyxxQ0FBcUMsQ0FBQzthQUM3QyxJQUFJLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQWMsRUFBRSxVQUFxQztRQUN4RSxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQ25ELEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUNkLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUNwQixFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FDZCxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVQsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBYztRQUNqQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckQsQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxRQUFRLEVBQUUsQ0FBQyJ9