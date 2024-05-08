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
const mountains_service_1 = __importDefault(require("../services/mountains.service"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:mountains-controller');
class MountainsController {
    listMountains(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mountains = yield mountains_service_1.default.list(10, req.body.page - 1);
            res.status(200).send(mountains);
        });
    }
    getMountainById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mountain = yield mountains_service_1.default.readById(req.body.id);
            res.status(200).send(mountain);
        });
    }
    getMountainByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mountain = yield mountains_service_1.default.readMountainByName(req.body.name);
            res.status(200).send(mountain);
        });
    }
    createMountain(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mountainId = yield mountains_service_1.default.create(req.body);
            res.status(200).send(mountainId);
        });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield mountains_service_1.default.patchById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield mountains_service_1.default.putById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    removeMountain(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield mountains_service_1.default.deleteById(req.body.id));
            res.status(204).send();
        });
    }
}
exports.default = new MountainsController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91bnRhaW5zLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW91bnRhaW5zL2NvbnRyb2xsZXJzL21vdW50YWlucy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0ZBQTREO0FBRTVELGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUUvRCxNQUFNLG1CQUFtQjtJQUNqQixhQUFhLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDN0QsTUFBTSxTQUFTLEdBQUcsTUFBTSwyQkFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQy9ELE1BQU0sUUFBUSxHQUFHLE1BQU0sMkJBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFFSyxpQkFBaUIsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNqRSxNQUFNLFFBQVEsR0FBRyxNQUFNLDJCQUFlLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDOUQsTUFBTSxVQUFVLEdBQUcsTUFBTSwyQkFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUssS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3JELEdBQUcsQ0FBQyxNQUFNLDJCQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssR0FBRyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ25ELEdBQUcsQ0FBQyxNQUFNLDJCQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzlELEdBQUcsQ0FBQyxNQUFNLDJCQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxtQkFBbUIsRUFBRSxDQUFDIn0=