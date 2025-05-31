"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:users-controller');
class UsersMiddleware {
    async validateEmailUniqueness(req, res, next) {
        const user = await users_service_1.default.getUserByEmail(req.body.email);
        if (user) {
            res.status(400).send({ error: 'A user with the given email already exists' });
        }
        else {
            next();
        }
    }
    async validateUserExistence(req, res, next) {
        const user = await users_service_1.default.readById(req.params.userId);
        if (user) {
            res.locals.user = user;
            next();
        }
        else {
            res.status(404).send({ error: `User ${req.params.userId} not found` });
        }
    }
    async validateUserEmailMatchesUserId(req, res, next) {
        if (res.locals.user._id === req.params.userId) {
            next();
        }
        else {
            res.status(400).send({ error: "Invalid email" });
        }
    }
    //use arrow function to properly bind `this`
    validatePatchEmail = async (req, res, next) => {
        if (req.body.email) {
            log('Validating email', req.body.email);
            this.validateUserEmailMatchesUserId(req, res, next);
        }
        else {
            next();
        }
    };
    async extractUserId(req, res, next) {
        req.body.id = req.params.userId;
        next();
    }
    async userCantChangePermission(req, res, next) {
        if ('permissionFlags' in req.body && req.body.permissionFlags !== res.locals.user.permissionFlags) {
            res.status(400).send({ errors: ['User cannot change permission flags'] });
        }
        else {
            next();
        }
    }
}
exports.default = new UsersMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91c2Vycy9taWRkbGV3YXJlL3VzZXJzLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw4RUFBb0Q7QUFDcEQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTNELE1BQU0sZUFBZTtJQUNuQixLQUFLLENBQUMsdUJBQXVCLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO1FBQ25HLE1BQU0sSUFBSSxHQUFHLE1BQU0sdUJBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ1QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsNENBQTRDLEVBQUMsQ0FBQyxDQUFDO1FBQzlFLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7UUFDakcsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNELElBQUksSUFBSSxFQUFFLENBQUM7WUFDVCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDO2FBQU0sQ0FBQztZQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDekUsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsOEJBQThCLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO1FBQzFHLElBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDN0MsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDO2FBQU0sQ0FBQztZQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLGVBQWUsRUFBQyxDQUFDLENBQUE7UUFDaEQsQ0FBQztJQUNILENBQUM7SUFFRCw0Q0FBNEM7SUFDNUMsa0JBQWtCLEdBQUcsS0FBSyxFQUFFLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQixFQUFFLEVBQUU7UUFDckcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ25CLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXhDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RELENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7UUFDekYsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDO0lBRUQsS0FBSyxDQUFDLHdCQUF3QixDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtRQUNwRyxJQUFJLGlCQUFpQixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDbEcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RSxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQztJQUNILENBQUM7Q0FDRjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==