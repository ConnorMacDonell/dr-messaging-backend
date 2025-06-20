import dotenv from 'dotenv';

// Load .env file if it exists (for local development)
// In production (Railway), environment variables are provided directly
const dotenvResult = dotenv.config();
if(dotenvResult.error && process.env.NODE_ENV !== 'production') {
  console.warn('Warning: .env file not found. Make sure environment variables are set.');
  // Only throw in development if you require a .env file
  // throw dotenvResult.error;
}

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
const port = process.env.PORT || 3000; // Use Railway's PORT or fallback to 3000
const routes: Array<SharedRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.post('/webhook/stripe', express.raw({type: 'application/json'}), handleStripeWebhook);

//add middleware to parse all incoming requests as JSON
app.use(express.json());

//add middleware to allow cross-origin requests
const corsOptions = {
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // Alternative dev port
    'https://your-app-name.vercel.app', // Replace with your actual Vercel domain
    // Add your custom domain if you have one
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

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
const runningMessage = `Server running at http://localhost:${port}.`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage);
});

export default server.listen(port, () => {
  routes.forEach((route: SharedRoutesConfig) => {
    debugLog((`Routes configured for ${route.getName()}`))
  });
  console.log(runningMessage);
});