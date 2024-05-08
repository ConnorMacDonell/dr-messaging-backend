import express from 'express';
import { SharedRoutesConfig } from "../shared/shared.routes.config";
import UsersController from "./controllers/users.controller";
import UsersMiddleware from "./middleware/users.middleware";
import BodyValidationMiddleware from '../shared/middleware/body.validation.middleware';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../shared/middleware/shared.permission.middleware';
import { PermissionFlag } from '../shared/middleware/shared.permissionflag.enum';
import Logger from '../lib/logger';


export class UsersRoutes extends SharedRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes() {
    this.app.route('/users')
      .get(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
        UsersController.listUsers
      )
      .post(
        body('email').isEmail(),
        body('password')
          .isLength({ min: 5 })
          .withMessage('Must include password (5+ characters'),
        body('firstName').isString(),
        body('lastName').isString(),
        body('permissionFlags').isInt(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validateEmailUniqueness,
        UsersController.createUser
      );

    this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app.route('/users/:userId')
      .all(
        UsersMiddleware.validateUserExistence,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction
      )
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this.app.put('/users/:userId', [
      body('email').isEmail(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Must include password (5+ characters)'),
      body('firstName').isString(),
      body('lastName').isString(),
      body('permissionFlags').isInt(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateUserEmailMatchesUserId,
      UsersMiddleware.userCantChangePermission,
      UsersController.put,
    ]);

    this.app.patch('/users/:userId', [
      body('email').isEmail().optional(),
      body('password')
        .isLength({ min: 5 })
        .withMessage('Must include password (5+ characters)')
        .optional(),
      body('firstName').isString().optional(),
      body('lastName').isString().optional(),
      body('permissionFlags').isInt().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validatePatchEmail,
      UsersMiddleware.userCantChangePermission,
      permissionMiddleware.permissionFlagRequired(PermissionFlag.PAID_PERMISSION),
      UsersController.patch,
    ]);

    return this.app;
  }
}