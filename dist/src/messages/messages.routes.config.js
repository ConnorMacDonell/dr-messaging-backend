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
            .get(jwt_middleware_1.default.validJWTNeeded, shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION), messages_controller_1.default.listMessagesByOwnerId)
            .post((0, express_validator_1.body)('category').isString(), (0, express_validator_1.body)('messageBody').isString(), (0, express_validator_1.body)('ownerId').isString(), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION), messages_middleware_1.default.validateCategoryUniqueness, messages_controller_1.default.createMessage);
        this.app.param(`messageId`, messages_middleware_1.default.extractMessageId);
        this.app.route('/messages/:messageId')
            .all(messages_middleware_1.default.validateMessageExistence, jwt_middleware_1.default.validJWTNeeded, shared_permission_middleware_1.default.onlyMessageOwnerOrAdminCanDoThisAction)
            .get(messages_controller_1.default.getMessageById)
            .delete(shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION), messages_controller_1.default.removeMessage);
        this.app.put('/messages/:messageId', [
            (0, express_validator_1.body)('category').isString(),
            (0, express_validator_1.body)('body').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION),
            messages_controller_1.default.put
        ]);
        this.app.patch('/messages/:messageId', [
            (0, express_validator_1.body)('category').isString().optional(),
            (0, express_validator_1.body)('body').isString().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION),
            messages_controller_1.default.patch
        ]);
        this.app.post('/messages/:messageId', [
            (0, express_validator_1.body)('recipients').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION),
            messages_controller_1.default.sendMessage
        ]);
        return this.app;
    }
}
exports.MessageRoutes = MessageRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tZXNzYWdlcy9tZXNzYWdlcy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlFQUFvRTtBQUNwRSw0RkFBbUU7QUFDbkUsMkZBQWtFO0FBQ2xFLGlIQUF1RjtBQUN2Rix5REFBeUM7QUFDekMsdUZBQThEO0FBQzlELHFIQUFxRjtBQUNyRixnR0FBaUY7QUFFakYsTUFBYSxhQUFjLFNBQVEseUNBQWtCO0lBQ25ELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQzthQUN4QixHQUFHLENBQ0Ysd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHNCQUFzQixDQUFDLDJDQUFjLENBQUMsZUFBZSxDQUFDLEVBQzNFLDZCQUFrQixDQUFDLHFCQUFxQixDQUFDO2FBQzFDLElBQUksQ0FDSCxJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQzNCLElBQUEsd0JBQUksRUFBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDOUIsSUFBQSx3QkFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUMxQixvQ0FBd0IsQ0FBQyxzQkFBc0IsRUFDL0Msd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHNCQUFzQixDQUFDLDJDQUFjLENBQUMsZUFBZSxDQUFDLEVBQzNFLDZCQUFrQixDQUFDLDBCQUEwQixFQUM3Qyw2QkFBa0IsQ0FBQyxhQUFhLENBQ2pDLENBQUM7UUFFSixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsNkJBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzthQUNuQyxHQUFHLENBQUMsNkJBQWtCLENBQUMsd0JBQXdCLEVBQzlDLHdCQUFhLENBQUMsY0FBYyxFQUM1QixzQ0FBb0IsQ0FBQyxzQ0FBc0MsQ0FDNUQ7YUFDQSxHQUFHLENBQUMsNkJBQWtCLENBQUMsY0FBYyxDQUFDO2FBQ3RDLE1BQU0sQ0FDTCxzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FBQywyQ0FBYyxDQUFDLGVBQWUsQ0FBQyxFQUMzRSw2QkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRTtZQUNuQyxJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUEsd0JBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDdkIsb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLHNDQUFvQixDQUFDLHNCQUFzQixDQUFDLDJDQUFjLENBQUMsZUFBZSxDQUFDO1lBQzNFLDZCQUFrQixDQUFDLEdBQUc7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUU7WUFDckMsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN0QyxJQUFBLHdCQUFJLEVBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ2xDLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQyxzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FBQywyQ0FBYyxDQUFDLGVBQWUsQ0FBQztZQUMzRSw2QkFBa0IsQ0FBQyxLQUFLO1NBQ3pCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ3BDLElBQUEsd0JBQUksRUFBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDN0Isb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLHNDQUFvQixDQUFDLHNCQUFzQixDQUFDLDJDQUFjLENBQUMsZUFBZSxDQUFDO1lBQzNFLDZCQUFrQixDQUFDLFdBQVc7U0FDL0IsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQTFERCxzQ0EwREMifQ==