"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mountains_dao_1 = __importDefault(require("../dao/mountains.dao"));
class MountainService {
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return mountains_dao_1.default.getMountains(limit, page);
        });
    }
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return mountains_dao_1.default.addMountain(resource);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mountains_dao_1.default.removeMountainById(id);
        });
    }
    readMountainByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return mountains_dao_1.default.getMountainByName(name);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return mountains_dao_1.default.updateMountainById(id, resource);
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return mountains_dao_1.default.updateMountainById(id, resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mountains_dao_1.default.removeMountainById(id);
        });
    }
}
exports.default = new MountainService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91bnRhaW5zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW91bnRhaW5zL3NlcnZpY2VzL21vdW50YWlucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUVBQWdEO0FBTWhELE1BQU0sZUFBZTtJQUNiLElBQUksQ0FBQyxLQUFhLEVBQUUsSUFBWTs7WUFDcEMsT0FBTyx1QkFBWSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFDLFFBQTJCOztZQUN0QyxPQUFPLHVCQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxFQUFVOztZQUN2QixPQUFPLHVCQUFZLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBO0lBRUssa0JBQWtCLENBQUMsSUFBWTs7WUFDbkMsT0FBTyx1QkFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxFQUFVLEVBQUUsUUFBd0I7O1lBQ2hELE9BQU8sdUJBQVksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDdEQsQ0FBQztLQUFBO0lBRUssU0FBUyxDQUFDLEVBQVUsRUFBRSxRQUEwQjs7WUFDcEQsT0FBTyx1QkFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUN0RCxDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsRUFBVTs7WUFDekIsT0FBTyx1QkFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9