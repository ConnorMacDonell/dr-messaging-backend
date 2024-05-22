"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoutes = void 0;
const shared_routes_config_1 = require("../shared/shared.routes.config");
const messages_controller_1 = __importDefault(require("./controllers/messages.controller"));
const messages_middleware_1 = __importDefault(require("./middleware/messages.middleware"));
const body_validation_middleware_1 = __importDefault(require("../shared/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const shared_permission_middleware_1 = __importDefault(require("../shared/middleware/shared.permission.middleware"));
const shared_permissionflag_enum_1 = require("../shared/middleware/shared.permissionflag.enum");
class MessageRoutes extends shared_routes_config_1.SharedRoutesConfig {
    constructor(app) {
        super(app, 'MessageRoutes');
    }
    configureRoutes() {
        this.app.route('/messages')
            .get(messages_controller_1.default.listMessagesByOwnerId)
            .post((0, express_validator_1.body)('category').isString(), (0, express_validator_1.body)('messageBody').isString(), (0, express_validator_1.body)('ownerId').isString(), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION), messages_controller_1.default.createMessage);
        this.app.param(`messageId`, messages_middleware_1.default.extractMessageId);
        this.app.route('/messages/:messageId')
            .all(messages_middleware_1.default.validateMessageExistence)
            .get(messages_controller_1.default.getMessageById)
            .delete(shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION), messages_controller_1.default.removeMessage);
        this.app.put('/messages/:messageId', [
            (0, express_validator_1.body)('category').isString(),
            (0, express_validator_1.body)('body').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            jwt_middleware_1.default.validJWTNeeded,
            shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION),
            messages_controller_1.default.put
        ]);
        this.app.patch('/messages/:messageId', [
            (0, express_validator_1.body)('category').isString().optional(),
            (0, express_validator_1.body)('body').isString().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            jwt_middleware_1.default.validJWTNeeded,
            shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION),
            messages_controller_1.default.patch
        ]);
        return this.app;
    }
}
exports.MessageRoutes = MessageRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tZXNzYWdlcy9tZXNzYWdlcy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlFQUFvRTtBQUNwRSw0RkFBbUU7QUFDbkUsMkZBQWtFO0FBQ2xFLGlIQUF1RjtBQUN2Rix5REFBeUM7QUFDekMsdUZBQThEO0FBQzlELHFIQUFxRjtBQUNyRixnR0FBaUY7QUFFakYsTUFBYSxhQUFjLFNBQVEseUNBQWtCO0lBQ25ELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQzthQUN4QixHQUFHLENBQUMsNkJBQWtCLENBQUMscUJBQXFCLENBQUM7YUFDN0MsSUFBSSxDQUNILElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDM0IsSUFBQSx3QkFBSSxFQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUM5QixJQUFBLHdCQUFJLEVBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQzFCLG9DQUF3QixDQUFDLHNCQUFzQixFQUMvQyx3QkFBYSxDQUFDLGNBQWMsRUFDNUIsc0NBQW9CLENBQUMsc0JBQXNCLENBQUMsMkNBQWMsQ0FBQyxlQUFlLENBQUMsRUFDM0UsNkJBQWtCLENBQUMsYUFBYSxDQUNqQyxDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLDZCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7YUFDbkMsR0FBRyxDQUFDLDZCQUFrQixDQUFDLHdCQUF3QixDQUFDO2FBQ2hELEdBQUcsQ0FBQyw2QkFBa0IsQ0FBQyxjQUFjLENBQUM7YUFDdEMsTUFBTSxDQUNMLHNDQUFvQixDQUFDLHNCQUFzQixDQUFDLDJDQUFjLENBQUMsZUFBZSxDQUFDLEVBQzNFLDZCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFO1lBQ25DLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBQSx3QkFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUN2QixvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0Msd0JBQWEsQ0FBQyxjQUFjO1lBQzVCLHNDQUFvQixDQUFDLHNCQUFzQixDQUFDLDJDQUFjLENBQUMsZUFBZSxDQUFDO1lBQzNFLDZCQUFrQixDQUFDLEdBQUc7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUU7WUFDckMsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN0QyxJQUFBLHdCQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ2xDLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQyx3QkFBYSxDQUFDLGNBQWM7WUFDNUIsc0NBQW9CLENBQUMsc0JBQXNCLENBQUMsMkNBQWMsQ0FBQyxlQUFlLENBQUM7WUFDM0UsNkJBQWtCLENBQUMsS0FBSztTQUN6QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBOUNELHNDQThDQyJ9