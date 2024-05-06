import express from 'express';
import { CommonRoutesConfig } from "../common/common.routes.config";
import MountainsController from './controllers/mountains.controller';
import MountainsMiddleware from './middleware/mountains.middleware';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';

export class MountainRoutesConfig extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'MountainRoutes');
  }

  configureRoutes() {
    this.app.route('/mountains')
      .get(MountainsController.listMountains)
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
        MountainsController.createMountain
      );

    this.app.param(`mountainId`, MountainsMiddleware.extractMountainId);
    this.app.route('/mountains/:mountainId')
      .all(MountainsMiddleware.validateMountainExistence)
      .get(MountainsController.getMountainById)
      .delete(
        permissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
        MountainsController.removeMountain);

    this.app.put('/mountains/:mountainId', [
      body('name').isString(),
      body('description').isString(),
      body('lat').isInt(),
      body('long').isInt(),
      body('rating').isInt(),
      body('photos').isArray(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      jwtMiddleware.validJWTNeeded,
      permissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
      MountainsController.put
    ]);

    this.app.patch('/mountains/:mountainId', [
      body('name').isString().optional(),
      body('description').isString().optional(),
      body('lat').isInt().optional(),
      body('long').isInt().optional(),
      body('rating').isInt().optional(),
      body('photos').isArray().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      jwtMiddleware.validJWTNeeded,
      permissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
      MountainsController.patch
    ]);

    return this.app;
  }
}