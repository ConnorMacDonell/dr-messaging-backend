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
const debug_1 = __importDefault(require("debug"));
const shortid_1 = __importDefault(require("shortid"));
const mongoose_service_1 = __importDefault(require("../../shared/services/mongoose.service"));
const log = (0, debug_1.default)('app:in-memory-dao');
class MountainDao {
    constructor() {
        this.mountains = [];
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.mountainSchema = new this.Schema({
            _id: String,
            name: String,
            description: String,
            rating: Number, //rating between 1-10
            lat: Number, //latitude
            long: Number, //longitude
            photos: (Array), //array of src strings for images
        }, { id: false });
        this.Mountain = mongoose_service_1.default.getMongoose().model('Mountains', this.mountainSchema);
        log('Created new instance of MountainDAO');
    }
    addMountain(mountainFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const mountainId = shortid_1.default.generate();
            const mountain = new this.Mountain(Object.assign({ _id: mountainId }, mountainFields));
            yield mountain.save();
            return mountainId;
        });
    }
    getMountains() {
        return __awaiter(this, arguments, void 0, function* (limit = 10, pageNumber = 0) {
            return this.Mountain.find()
                .limit(limit)
                .skip(limit * pageNumber)
                .exec();
        });
    }
    getMountainById(mountainId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Mountain.findOne({ _id: mountainId }).exec();
        });
    }
    getMountainByName(mountainName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Mountain.findOne({ name: mountainName }).exec();
        });
    }
    updateMountainById(mountainId, mountainFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingMountain = yield this.Mountain.findOneAndUpdate({ _id: mountainId }, { $set: mountainFields }, { new: true }).exec();
            return existingMountain;
        });
    }
    removeMountainById(mountainId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Mountain.deleteOne({ _id: mountainId }).exec();
        });
    }
}
exports.default = new MountainDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91bnRhaW5zLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb3VudGFpbnMvZGFvL21vdW50YWlucy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQSxrREFBMEI7QUFDMUIsc0RBQThCO0FBQzlCLDhGQUFxRTtBQUlyRSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUd4RCxNQUFNLFdBQVc7SUFpQmY7UUFoQkEsY0FBUyxHQUE2QixFQUFFLENBQUE7UUFFeEMsV0FBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBRTlDLG1CQUFjLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQy9CLEdBQUcsRUFBRSxNQUFNO1lBQ1gsSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsTUFBTTtZQUNuQixNQUFNLEVBQUUsTUFBTSxFQUFFLHFCQUFxQjtZQUNyQyxHQUFHLEVBQUUsTUFBTSxFQUFFLFVBQVU7WUFDdkIsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXO1lBQ3pCLE1BQU0sRUFBRSxDQUFBLEtBQWEsQ0FBQSxFQUFFLGlDQUFpQztTQUN6RCxFQUFFLEVBQUMsRUFBRSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFFaEIsYUFBUSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFHL0UsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVLLFdBQVcsQ0FBQyxjQUFpQzs7WUFDakQsTUFBTSxVQUFVLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLGlCQUNoQyxHQUFHLEVBQUUsVUFBVSxJQUNaLGNBQWMsRUFDakIsQ0FBQztZQUNILE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RCLE9BQU8sVUFBVSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtJQUVLLFlBQVk7NkRBQUMsS0FBSyxHQUFDLEVBQUUsRUFBRSxVQUFVLEdBQUMsQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2lCQUN4QixLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUNaLElBQUksQ0FBQyxLQUFLLEdBQUMsVUFBVSxDQUFDO2lCQUN0QixJQUFJLEVBQUUsQ0FBQztRQUNaLENBQUM7S0FBQTtJQUVLLGVBQWUsQ0FBQyxVQUFrQjs7WUFDdEMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNELENBQUM7S0FBQTtJQUVLLGlCQUFpQixDQUFDLFlBQW9COztZQUMxQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUQsQ0FBQztLQUFBO0lBRUssa0JBQWtCLENBQUMsVUFBa0IsRUFBRSxjQUFpRDs7WUFDNUYsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQzNELEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUNuQixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUMsRUFDdkIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQ2QsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVULE9BQU8sZ0JBQWdCLENBQUM7UUFDMUIsQ0FBQztLQUFBO0lBRUssa0JBQWtCLENBQUMsVUFBa0I7O1lBQ3pDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3RCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksV0FBVyxFQUFFLENBQUMifQ==