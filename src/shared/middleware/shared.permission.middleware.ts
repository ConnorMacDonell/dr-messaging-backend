import express from "express";
import { PermissionFlag } from "./shared.permissionflag.enum";
import debug from 'debug';
import Logger from "../../lib/logger";

const log: debug.IDebugger = debug('app:shared-permission-middleware');

class SharedPermissionMiddleware {
  permissionFlagRequired(requiredPermissionFlag: PermissionFlag){
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      try {
        const userPermissionFlags = res.locals.jwt.permissionFlags;
        if(userPermissionFlags & requiredPermissionFlag){
          next();
        } else {
          res.status(403).send(`Permission too low ${userPermissionFlags}`);
        }
      } catch(err) {
        log(err);
      }
    };
  }

  async onlySameUserOrAdminCanDoThisAction(req: express.Request, res: express.Response, next: express.NextFunction){
    const userPermissionFlags = res.locals.jwt.permissionFlags;
    if(req.params && req.params.userId && req.params.userId === res.locals.jwt.userId){
      return next();
    } else {
      if(userPermissionFlags & PermissionFlag.ADMIN_PERMISSION){
        return next();
      } else {
        return res.status(403).send("Only same user or admin can do this action");
      }
    }
  }

  async onlyMessageOwnerOrAdminCanDoThisAction(req: express.Request, res: express.Response, next: express.NextFunction) {
    const userPermissionFlags = res.locals.jwt.permissionFlags;
    if (res.locals.jwt.userId === res.locals.message.ownerId){
      return next();
    } else if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION){
      return next();
    } else {
      res.status(403).send({error: 'Requester does not own resource.'});
    };
  }
}

export default new SharedPermissionMiddleware();
