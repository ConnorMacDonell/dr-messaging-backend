"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load .env file if it exists (for local development)
// In production (Railway), environment variables are provided directly
const dotenvResult = dotenv_1.default.config();
if (dotenvResult.error && process.env.NODE_ENV !== 'production') {
    console.warn('Warning: .env file not found. Make sure environment variables are set.');
    // Only throw in development if you require a .env file
    // throw dotenvResult.error;
}
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_middleware_1 = __importDefault(require("./src/shared/middleware/morgan.middleware"));
const cors_1 = __importDefault(require("cors"));
const users_routes_config_1 = require("./src/users/users.routes.config");
const auth_routes_config_1 = require("./src/auth/auth.routes.config");
const messages_routes_config_1 = require("./src/messages/messages.routes.config");
const debug_1 = __importDefault(require("debug"));
const stripe_webhook_1 = require("./src/webhooks/stripe.webhook");
const app = (0, express_1.default)();
const server = http.createServer(app);
const port = process.env.PORT || 3000; // Use Railway's PORT or fallback to 3000
const routes = [];
const debugLog = (0, debug_1.default)('app');
app.post('/webhook/stripe', express_1.default.raw({ type: 'application/json' }), stripe_webhook_1.handleStripeWebhook);
//add middleware to parse all incoming requests as JSON
app.use(express_1.default.json());
//add middleware to allow cross-origin requests
app.use((0, cors_1.default)());
//add helmet middleware to protect against common security vulnerabilities
app.use((0, helmet_1.default)());
//add morgan middleware
app.use(morgan_middleware_1.default);
// add the UserRoutes to our array
// after sending the Express.js application object to have the routes added to the app
routes.push(new users_routes_config_1.UsersRoutes(app));
routes.push(new auth_routes_config_1.AuthRoutes(app));
routes.push(new messages_routes_config_1.MessageRoutes(app));
// route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}.`;
app.get('/', (req, res) => {
    res.status(200).send(runningMessage);
});
exports.default = server.listen(port, () => {
    routes.forEach((route) => {
        debugLog((`Routes configured for ${route.getName()}`));
    });
    console.log(runningMessage);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLHNEQUFzRDtBQUN0RCx1RUFBdUU7QUFDdkUsTUFBTSxZQUFZLEdBQUcsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxJQUFHLFlBQVksQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFLENBQUM7SUFDL0QsT0FBTyxDQUFDLElBQUksQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO0lBQ3ZGLHVEQUF1RDtJQUN2RCw0QkFBNEI7QUFDOUIsQ0FBQztBQUVELHNEQUE4QjtBQUM5QiwyQ0FBNkI7QUFHN0Isb0RBQTRCO0FBQzVCLGtHQUF5RTtBQUN6RSxnREFBd0I7QUFFeEIseUVBQThEO0FBQzlELHNFQUEyRDtBQUMzRCxrRkFBcUU7QUFDckUsa0RBQTBCO0FBQzFCLGtFQUFvRTtBQUdwRSxNQUFNLEdBQUcsR0FBd0IsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFDM0MsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMseUNBQXlDO0FBQ2hGLE1BQU0sTUFBTSxHQUE4QixFQUFFLENBQUM7QUFDN0MsTUFBTSxRQUFRLEdBQW9CLElBQUEsZUFBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO0FBRS9DLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsaUJBQU8sQ0FBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxFQUFFLG9DQUFtQixDQUFDLENBQUM7QUFFMUYsdURBQXVEO0FBQ3ZELEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXhCLCtDQUErQztBQUMvQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsY0FBSSxHQUFFLENBQUMsQ0FBQztBQUVoQiwwRUFBMEU7QUFDMUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdCQUFNLEdBQUUsQ0FBQyxDQUFDO0FBRWxCLHVCQUF1QjtBQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLDJCQUFnQixDQUFDLENBQUM7QUFFMUIsa0NBQWtDO0FBQ2xDLHNGQUFzRjtBQUN0RixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUNBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSwrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLHNDQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUVwQyxvREFBb0Q7QUFDcEQsTUFBTSxjQUFjLEdBQUcsc0NBQXNDLElBQUksR0FBRyxDQUFDO0FBQ3JFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLEVBQUU7SUFDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQXlCLEVBQUUsRUFBRTtRQUMzQyxRQUFRLENBQUMsQ0FBQyx5QkFBeUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO0lBQ3hELENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUMsQ0FBQyJ9