import dotenv from 'dotenv';
// Load .env file if it exists, ignore if it doesn't
dotenv.config();

// Debug: Log environment variables (remove this in production)
console.log('Environment variables check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
console.log('STRIPE_WEBHOOK_SECRET exists:', !!process.env.STRIPE_WEBHOOK_SECRET);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('MONGODB_URL exists:', !!process.env.MONGODB_URL);

import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import helmet from 'helmet';
import morganMiddleware from './src/shared/middleware/morgan.middleware';
import cors from 'cors';
import { SharedRoutesConfig } from './src/shared/shared.routes.config';
import { UsersRoutes } from './src/users/users.routes.config';
import { AuthRoutes } from './src/auth/auth.routes.config';
import { MessageRoutes } from './src/messages/messages.routes.config'
import debug from 'debug';
import { handleStripeWebhook } from './src/webhooks/stripe.webhook';


const app: express.Application = express();
const server: http.Server = http.createServer(app);

// Railway provides PORT environment variable
const port = process.env.PORT || 3000;
const host = '0.0.0.0'; // Listen on all interfaces for Railway

const routes: Array<SharedRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.post('/webhook/stripe', express.raw({type: 'application/json'}), handleStripeWebhook);

//add middleware to parse all incoming requests as JSON
app.use(express.json());

//add middleware to allow cross-origin requests
app.use(cors());

//add helmet middleware to protect against common security vulnerabilities
app.use(helmet());

//add morgan middleware
app.use(morganMiddleware);

// add the UserRoutes to our array
// after sending the Express.js application object to have the routes added to the app
routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new MessageRoutes(app));

// route to make sure everything is working properly
const runningMessage = `Server running on ${host}:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage);
});

export default server.listen(port, host, () => {
  routes.forEach((route: SharedRoutesConfig) => {
    debugLog((`Routes configured for ${route.getName()}`))
  });
  console.log(runningMessage);
  console.log('Server is ready to accept connections');
});