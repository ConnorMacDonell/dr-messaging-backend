"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_dao_1 = __importDefault(require("../dao/users.dao"));
class UserService {
    async list(limit, page) {
        return users_dao_1.default.getUsers(limit, page);
    }
    async create(resource) {
        return users_dao_1.default.addUser(resource);
    }
    async readById(id) {
        return users_dao_1.default.getUserById(id);
    }
    async getUserByEmail(email) {
        return users_dao_1.default.getUserByEmail(email);
    }
    async getUserByEmailWithPassword(email) {
        return users_dao_1.default.getUserByEmailWithPassword(email);
    }
    async putById(id, resource) {
        return users_dao_1.default.updateUserById(id, resource);
    }
    async patchById(id, resource) {
        return users_dao_1.default.updateUserById(id, resource);
    }
    async deleteById(id) {
        return users_dao_1.default.removeUserById(id);
    }
}
exports.default = new UserService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91c2Vycy9zZXJ2aWNlcy91c2Vycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUVBQXdDO0FBTXhDLE1BQU0sV0FBVztJQUNmLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBYSxFQUFFLElBQVk7UUFDcEMsT0FBTyxtQkFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBdUI7UUFDbEMsT0FBTyxtQkFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFVO1FBQ3ZCLE9BQU8sbUJBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBYTtRQUNoQyxPQUFPLG1CQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDRCxLQUFLLENBQUMsMEJBQTBCLENBQUMsS0FBYTtRQUM1QyxPQUFPLG1CQUFRLENBQUMsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBVSxFQUFFLFFBQW9CO1FBQzVDLE9BQU8sbUJBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQVUsRUFBRSxRQUFzQjtRQUNoRCxPQUFPLG1CQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFVO1FBQ3pCLE9BQU8sbUJBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxXQUFXLEVBQUUsQ0FBQyJ9