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
const log = (0, debug_1.default)("app:mountains-middleware");
class MountainsMiddleware {
    validateNameUniqueness(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const mountain = yield mountains_service_1.default.readMountainByName(req.body.name);
            if (mountain) {
                res.status(400).send('A mountain with the given name already exists.');
            }
            else {
                next();
            }
        });
    }
    validateMountainExistence(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const mountain = yield mountains_service_1.default.readById(req.params.mountainId);
            if (mountain) {
                res.locals.mountain = mountain;
                next();
            }
            else {
                res.status(404).send({ error: `Mountain ${req.params.mountainId} not found` });
            }
        });
    }
    extractMountainId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.userId;
            next();
        });
    }
}
exports.default = new MountainsMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91bnRhaW5zLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW91bnRhaW5zL21pZGRsZXdhcmUvbW91bnRhaW5zLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzRkFBNEQ7QUFDNUQsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQywwQkFBMEIsQ0FBQyxDQUFDO0FBRS9ELE1BQU0sbUJBQW1CO0lBQ2pCLHNCQUFzQixDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjs7WUFDbEcsTUFBTSxRQUFRLEdBQUcsTUFBTSwyQkFBZSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekUsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDYixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1lBQ3pFLENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLEVBQUUsQ0FBQztZQUNULENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFSyx5QkFBeUIsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7O1lBQ3JHLE1BQU0sUUFBUSxHQUFHLE1BQU0sMkJBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2RSxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUNiLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDL0IsSUFBSSxFQUFFLENBQUM7WUFDVCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUNqRixDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRUssaUJBQWlCLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCOztZQUM3RixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxtQkFBbUIsRUFBRSxDQUFDIn0=