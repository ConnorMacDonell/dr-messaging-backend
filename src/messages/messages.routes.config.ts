import express from 'express';
import { SharedRoutesConfig } from "../shared/shared.routes.config";
import MessagesController from './controllers/messages.controller';
import MessagesMiddleware from './middleware/messages.middleware';
import BodyValidationMiddleware from '../shared/middleware/body.validation.middleware';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../shared/middleware/shared.permission.middleware';
import { PermissionFlag } from '../shared/middleware/shared.permissionflag.enum';

export class MessageRoutesConfig extends SharedRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MessageRoutes');
  }

  configureRoutes() {
    this.app.route('/messages')
      .get(MessagesController.listMessages)
      .post(
        body('name').isString(),
        body('description').isString(),
        body('lat').isInt(),
        body('long').isInt(),
        body('rating').isInt(),
        body('photos').isArray(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
        MessagesController.createMessage
      );

    this.app.param(`messageId`, MessagesMiddleware.extractMessageId);
    this.app.route('/messages/:messageId')
      .all(MessagesMiddleware.validateMessageExistence)
      .get(MessagesController.getMessageById)
      .delete(
        permissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
        MessagesController.removeMessage);

    this.app.put('/messages/:messageId', [
      body('name').isString(),
      body('description').isString(),
      body('lat').isInt(),
      body('long').isInt(),
      body('rating').isInt(),
      body('photos').isArray(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      jwtMiddleware.validJWTNeeded,
      permissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
      MessagesController.put
    ]);

    this.app.patch('/messages/:messageId', [
      body('name').isString().optional(),
      body('description').isString().optional(),
      body('lat').isInt().optional(),
      body('long').isInt().optional(),
      body('rating').isInt().optional(),
      body('photos').isArray().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      jwtMiddleware.validJWTNeeded,
      permissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
      MessagesController.patch
    ]);

    return this.app;
  }
}