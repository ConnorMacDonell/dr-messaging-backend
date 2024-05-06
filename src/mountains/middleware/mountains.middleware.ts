import express from "express";
import mountainService from "../services/mountains.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:mountains-middleware");

class MountainsMiddleware {
  async validateNameUniqueness(req: express.Request, res: express.Response, next: express.NextFunction){
    const mountain = await mountainService.readMountainByName(req.body.name);
    if (mountain) {
      res.status(400).send('A mountain with the given name already exists.');
    } else {
      next();
    }
  }

  async validateMountainExistence(req: express.Request, res: express.Response, next: express.NextFunction) {
    const mountain = await mountainService.readById(req.params.mountainId);
    if (mountain) {
      res.locals.mountain = mountain;
      next();
    } else {
      res.status(404).send({ error: `Mountain ${req.params.mountainId} not found` });
    }
  }
}

export default new MountainsMiddleware();