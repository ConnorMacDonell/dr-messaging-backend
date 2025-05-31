"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const log = (0, debug_1.default)('app:auth-controller');
//@ts-expect-error
const jwtSecret = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 360000;
class AuthController {
    async createJWT(req, res) {
        try {
            const refreshId = req.body.userId + jwtSecret;
            const salt = crypto_1.default.createSecretKey(crypto_1.default.randomBytes(16));
            const hash = crypto_1.default
                .createHmac('sha512', salt)
                .update(refreshId)
                .digest('base64');
            req.body.refreshKey = salt.export();
            const token = jsonwebtoken_1.default.sign(req.body, jwtSecret, {
                expiresIn: tokenExpirationInSeconds,
            });
            return res.status(201).send({ accessToken: token, refreshToken: hash });
        }
        catch (err) {
            log('createJWT error: %O', err);
            return res.status(500).send();
        }
    }
}
exports.default = new AuthController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2F1dGgvY29udHJvbGxlcnMvYXV0aC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esa0RBQTBCO0FBQzFCLGdFQUErQjtBQUMvQixvREFBNEI7QUFFNUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFMUQsa0JBQWtCO0FBQ2xCLE1BQU0sU0FBUyxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQ2pELE1BQU0sd0JBQXdCLEdBQUcsTUFBTSxDQUFDO0FBRXhDLE1BQU0sY0FBYztJQUNsQixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7UUFDekQsSUFBSSxDQUFDO1lBQ0gsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO1lBQzlDLE1BQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsZUFBZSxDQUFDLGdCQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUQsTUFBTSxJQUFJLEdBQUcsZ0JBQU07aUJBQ2hCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO2lCQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDO2lCQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BDLE1BQU0sS0FBSyxHQUFHLHNCQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO2dCQUMxQyxTQUFTLEVBQUMsd0JBQXdCO2FBQ25DLENBQUMsQ0FBQztZQUNILE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLENBQUM7UUFBQyxPQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osR0FBRyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBRUQsa0JBQWUsSUFBSSxjQUFjLEVBQUUsQ0FBQyJ9