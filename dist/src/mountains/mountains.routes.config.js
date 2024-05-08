"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MountainRoutesConfig = void 0;
const shared_routes_config_1 = require("../shared/shared.routes.config");
const mountains_controller_1 = __importDefault(require("./controllers/mountains.controller"));
const mountains_middleware_1 = __importDefault(require("./middleware/mountains.middleware"));
const body_validation_middleware_1 = __importDefault(require("../shared/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const shared_permission_middleware_1 = __importDefault(require("../shared/middleware/shared.permission.middleware"));
const shared_permissionflag_enum_1 = require("../shared/middleware/shared.permissionflag.enum");
class MountainRoutesConfig extends shared_routes_config_1.SharedRoutesConfig {
    constructor(app) {
        super(app, 'MountainRoutes');
    }
    configureRoutes() {
        this.app.route('/mountains')
            .get(mountains_controller_1.default.listMountains)
            .post((0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('description').isString(), (0, express_validator_1.body)('lat').isInt(), (0, express_validator_1.body)('long').isInt(), (0, express_validator_1.body)('rating').isInt(), (0, express_validator_1.body)('photos').isArray(), body_validation_middleware_1.default.verifyBodyFieldsErrors, jwt_middleware_1.default.validJWTNeeded, shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION), mountains_controller_1.default.createMountain);
        this.app.param(`mountainId`, mountains_middleware_1.default.extractMountainId);
        this.app.route('/mountains/:mountainId')
            .all(mountains_middleware_1.default.validateMountainExistence)
            .get(mountains_controller_1.default.getMountainById)
            .delete(shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION), mountains_controller_1.default.removeMountain);
        this.app.put('/mountains/:mountainId', [
            (0, express_validator_1.body)('name').isString(),
            (0, express_validator_1.body)('description').isString(),
            (0, express_validator_1.body)('lat').isInt(),
            (0, express_validator_1.body)('long').isInt(),
            (0, express_validator_1.body)('rating').isInt(),
            (0, express_validator_1.body)('photos').isArray(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            jwt_middleware_1.default.validJWTNeeded,
            shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION),
            mountains_controller_1.default.put
        ]);
        this.app.patch('/mountains/:mountainId', [
            (0, express_validator_1.body)('name').isString().optional(),
            (0, express_validator_1.body)('description').isString().optional(),
            (0, express_validator_1.body)('lat').isInt().optional(),
            (0, express_validator_1.body)('long').isInt().optional(),
            (0, express_validator_1.body)('rating').isInt().optional(),
            (0, express_validator_1.body)('photos').isArray().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            jwt_middleware_1.default.validJWTNeeded,
            shared_permission_middleware_1.default.permissionFlagRequired(shared_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION),
            mountains_controller_1.default.patch
        ]);
        return this.app;
    }
}
exports.MountainRoutesConfig = MountainRoutesConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91bnRhaW5zLnJvdXRlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW91bnRhaW5zL21vdW50YWlucy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlFQUFvRTtBQUNwRSw4RkFBcUU7QUFDckUsNkZBQW9FO0FBQ3BFLGlIQUF1RjtBQUN2Rix5REFBeUM7QUFDekMsdUZBQThEO0FBQzlELHFIQUFxRjtBQUNyRixnR0FBaUY7QUFFakYsTUFBYSxvQkFBcUIsU0FBUSx5Q0FBa0I7SUFDMUQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7YUFDekIsR0FBRyxDQUFDLDhCQUFtQixDQUFDLGFBQWEsQ0FBQzthQUN0QyxJQUFJLENBQ0gsSUFBQSx3QkFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUN2QixJQUFBLHdCQUFJLEVBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQzlCLElBQUEsd0JBQUksRUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFDbkIsSUFBQSx3QkFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUNwQixJQUFBLHdCQUFJLEVBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQ3RCLElBQUEsd0JBQUksRUFBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDeEIsb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLHdCQUFhLENBQUMsY0FBYyxFQUM1QixzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FBQywyQ0FBYyxDQUFDLGdCQUFnQixDQUFDLEVBQzVFLDhCQUFtQixDQUFDLGNBQWMsQ0FDbkMsQ0FBQztRQUVKLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSw4QkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDO2FBQ3JDLEdBQUcsQ0FBQyw4QkFBbUIsQ0FBQyx5QkFBeUIsQ0FBQzthQUNsRCxHQUFHLENBQUMsOEJBQW1CLENBQUMsZUFBZSxDQUFDO2FBQ3hDLE1BQU0sQ0FDTCxzQ0FBb0IsQ0FBQyxzQkFBc0IsQ0FBQywyQ0FBYyxDQUFDLGdCQUFnQixDQUFDLEVBQzVFLDhCQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFO1lBQ3JDLElBQUEsd0JBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDdkIsSUFBQSx3QkFBSSxFQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUM5QixJQUFBLHdCQUFJLEVBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ25CLElBQUEsd0JBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDcEIsSUFBQSx3QkFBSSxFQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUN0QixJQUFBLHdCQUFJLEVBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ3hCLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQyx3QkFBYSxDQUFDLGNBQWM7WUFDNUIsc0NBQW9CLENBQUMsc0JBQXNCLENBQUMsMkNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM1RSw4QkFBbUIsQ0FBQyxHQUFHO1NBQ3hCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFO1lBQ3ZDLElBQUEsd0JBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBQSx3QkFBSSxFQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN6QyxJQUFBLHdCQUFJLEVBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQzlCLElBQUEsd0JBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDL0IsSUFBQSx3QkFBSSxFQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNqQyxJQUFBLHdCQUFJLEVBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ25DLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQyx3QkFBYSxDQUFDLGNBQWM7WUFDNUIsc0NBQW9CLENBQUMsc0JBQXNCLENBQUMsMkNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM1RSw4QkFBbUIsQ0FBQyxLQUFLO1NBQzFCLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUF6REQsb0RBeURDIn0=