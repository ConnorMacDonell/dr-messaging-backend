import express from 'express';
import { SharedRoutesConfig } from "../shared/shared.routes.config";
import MessagesController from './controllers/messages.controller';
import MessagesMiddleware from './middleware/messages.middleware';
import BodyValidationMiddleware from '../shared/middleware/body.validation.middleware';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import PermissionMiddleware from '../shared/middleware/shared.permission.middleware';
import { PermissionFlag } from '../shared/middleware/shared.permissionflag.enum';

export class MessageRoutes extends SharedRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MessageRoutes');
  }

  configureRoutes() {
    this.app.route('/messages')
      .get(
        jwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(PermissionFlag.PAID_PERMISSION),
        MessagesController.listMessagesByOwnerId)
      .post(
        body('category').isString(),
        body('messageBody').isString(),
        body('ownerId').isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        jwtMiddleware.validJWTNeeded,
        PermissionMiddleware.permissionFlagRequired(PermissionFlag.PAID_PERMISSION),
        MessagesController.createMessage
      );

    this.app.param(`messageId`, MessagesMiddleware.extractMessageId);
    this.app.route('/messages/:messageId')
      .all(MessagesMiddleware.validateMessageExistence,
        jwtMiddleware.validJWTNeeded,
        PermissionMiddleware.onlyMessageOwnerOrAdminCanDoThisAction,
      )
      .get(MessagesController.getMessageById)
      .delete(
        PermissionMiddleware.permissionFlagRequired(PermissionFlag.PAID_PERMISSION),
        MessagesController.removeMessage);

    this.app.put('/messages/:messageId', [
      body('category').isString(),
      body('body').isString(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(PermissionFlag.PAID_PERMISSION),
      MessagesController.put
    ]);

    this.app.patch('/messages/:messageId', [
      body('category').isString().optional(),
      body('body').isString().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(PermissionFlag.PAID_PERMISSION),
      MessagesController.patch
    ]);

    this.app.post('/messages/:messageId', [
      body('recipients').isArray(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      PermissionMiddleware.permissionFlagRequired(PermissionFlag.PAID_PERMISSION),
    ]);

    return this.app;
  }
}