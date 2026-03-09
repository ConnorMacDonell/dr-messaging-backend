import express from "express";
import messageService from "../services/messages.service";
import argon2 from "argon2";
import debug from "debug";
import twilioService from "../services/twilio.service";

const log: debug.IDebugger = debug('app:messages-controller');

class MessagesController {
  async listMessages(req: express.Request, res: express.Response) {
    const messages = await messageService.list(10, req.body.page - 1);
    res.status(200).send(messages);
  }

  async listMessagesByOwnerId(req: express.Request, res: express.Response) {
    const messages = await messageService.listByOwnerId(res.locals.jwt.userId);
    res.status(200).send(messages);
  }

  async getMessageById(req: express.Request, res: express.Response) {
    const message = await messageService.readById(req.body.id);
    res.status(200).send(message);
  }

  async getMessageByCategory(req: express.Request, res: express.Response) {
    const message = await messageService.readMessageByCategory(req.body.category);
    res.status(200).send(message);
  }

  async createMessage(req: express.Request, res: express.Response) {
    const messageId = await messageService.create(req.body);
    res.status(200).send(messageId);
  }

  async patch(req: express.Request, res: express.Response) {
    log(await messageService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await messageService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeMessage(req: express.Request, res: express.Response) {
    log(await messageService.deleteById(req.body.id));
    res.status(204).send();
  }

  async sendMessage(req: express.Request, res: express.Response) {
    const message = await messageService.readById(req.body.id);
    const messageBody = message?.messageBody as string;
    const result = await twilioService.sendMessage(req.body.recipients, messageBody);
    res.status(204).send(result);
  }

  async sendTestMessage(req: express.Request, res: express.Response) {
    const messageBody = "This message sent automatically, courtesy of Connor MacDonell";
    const result = await twilioService.sendTestMessage('+14083355926', messageBody);
    res.status(204).send(result);
  }
}

export default new MessagesController();