"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shared_permissionflag_enum_1 = require("./shared.permissionflag.enum");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:shared-permission-middleware');
class SharedPermissionMiddleware {
    permissionFlagRequired(requiredPermissionFlag) {
        return (req, res, next) => {
            try {
                const userPermissionFlags = res.locals.jwt.permissionFlags;
                if (userPermissionFlags & requiredPermissionFlag) {
                    next();
                }
                else {
                    res.status(403).send(`Permission too low ${userPermissionFlags}`);
                }
            }
            catch (err) {
                log(err);
            }
        };
    }
    async onlySameUserOrAdminCanDoThisAction(req, res, next) {
        const userPermissionFlags = res.locals.jwt.permissionFlags;
        if (req.params && req.params.userId && req.params.userId === res.locals.jwt.userId) {
            return next();
        }
        else {
            if (userPermissionFlags & shared_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION) {
                return next();
            }
            else {
                return res.status(403).send("Only same user or admin can do this action");
            }
        }
    }
    async onlyMessageOwnerOrAdminCanDoThisAction(req, res, next) {
        const userPermissionFlags = res.locals.jwt.permissionFlags;
        if (res.locals.jwt.userId === res.locals.message.ownerId) {
            return next();
        }
        else if (userPermissionFlags & shared_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION) {
            return next();
        }
        else {
            res.status(403).send({ error: 'Requester does not own resource.' });
        }
        ;
    }
}
exports.default = new SharedPermissionMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnBlcm1pc3Npb24ubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaGFyZWQvbWlkZGxld2FyZS9zaGFyZWQucGVybWlzc2lvbi5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNkVBQThEO0FBQzlELGtEQUEwQjtBQUcxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUV2RSxNQUFNLDBCQUEwQjtJQUM5QixzQkFBc0IsQ0FBQyxzQkFBc0M7UUFDM0QsT0FBTyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQixFQUFFLEVBQUU7WUFDakYsSUFBSSxDQUFDO2dCQUNILE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2dCQUMzRCxJQUFHLG1CQUFtQixHQUFHLHNCQUFzQixFQUFDLENBQUM7b0JBQy9DLElBQUksRUFBRSxDQUFDO2dCQUNULENBQUM7cUJBQU0sQ0FBQztvQkFDTixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRSxDQUFDO1lBQ0gsQ0FBQztZQUFDLE9BQU0sR0FBRyxFQUFFLENBQUM7Z0JBQ1osR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsQ0FBQztRQUNILENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsa0NBQWtDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO1FBQzlHLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBQzNELElBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQztZQUNqRixPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBRyxtQkFBbUIsR0FBRywyQ0FBYyxDQUFDLGdCQUFnQixFQUFDLENBQUM7Z0JBQ3hELE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDaEIsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQztZQUM1RSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsc0NBQXNDLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCO1FBQ2xILE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBQzNELElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQyxDQUFDO1lBQ3hELE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQzthQUFNLElBQUksbUJBQW1CLEdBQUcsMkNBQWMsQ0FBQyxnQkFBZ0IsRUFBQyxDQUFDO1lBQ2hFLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQzthQUFNLENBQUM7WUFDTixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxrQ0FBa0MsRUFBQyxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUFBLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLDBCQUEwQixFQUFFLENBQUMifQ==