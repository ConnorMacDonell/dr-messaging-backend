import express from "express";
import messageService from "../services/messages.service";
import Logger from "../../lib/logger";
import debug from "debug";

const log: debug.IDebugger = debug("app:messages-middleware");

class MessagesMiddleware {
  async validateCategoryUniqueness(req: express.Request, res: express.Response, next: express.NextFunction){
    const message = await messageService.readMessageByCategory(req.body.category);
    if (message) {
      res.status(400).send('A message with the given category already exists.');
    } else {
      next();
    }
  }

  async validateMessageExistence(req: express.Request, res: express.Response, next: express.NextFunction) {
    const message = await messageService.readById(req.params.messageId);
    if (message) {
      res.locals.message = message;
      next();
    } else {
      res.status(404).send({ error: `Message ${req.params.messageId} not found` });
    }
  }

  async extractMessageId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = req.params.messageId;
    next();
  }


}

export default new MessagesMiddleware();