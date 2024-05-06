import express from "express";
import mountainService from "../services/mountains.service";
import argon2 from "argon2";
import debug from "debug";

const log: debug.IDebugger = debug('app:mountains-controller');

class MountainsController {
  async listMountains(req: express.Request, res: express.Response) {
    const mountains = await mountainService.list(10, req.body.page - 1);
    res.status(200).send(mountains);
  }

  async getMountainById(req: express.Request, res: express.Response) {
    const mountain = await mountainService.readById(req.body.id);
    res.status(200).send(mountain);
  }

  async getMountainByName(req: express.Request, res: express.Response) {
    const mountain = await mountainService.readMountainByName(req.body.name);
    res.status(200).send(mountain);
  }

  async createMountain(req: express.Request, res: express.Response) {
    const mountainId = await mountainService.create(req.body);
    res.status(200).send(mountainId);
  }

  async patch(req: express.Request, res: express.Response) {
    log(await mountainService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await mountainService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeMountain(req: express.Request, res: express.Response) {
    log(await mountainService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new MountainsController();