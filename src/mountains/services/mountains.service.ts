import mountainsDao from "../dao/mountains.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateMountainDto } from "../dtos/create.mountain.dto";
import { PatchMountainDto } from "../dtos/patch.mountain.dto";
import { PutMountainDto } from "../dtos/put.mountain.dto";

class MountainService implements CRUD {
  async list(limit: number, page: number) {
    return mountainsDao.getMountains(limit, page);
  }

  async create(resource: CreateMountainDto) {
    return mountainsDao.addMountain(resource);
  }

  async readById(id: string) {
    return mountainsDao.removeMountainById(id);
  }

  async readMountainByName(name: string) {
    return mountainsDao.getMountainByName(name);
  }

  async putById(id: string, resource: PutMountainDto) {
    return mountainsDao.updateMountainById(id, resource)
  }

  async patchById(id: string, resource: PatchMountainDto) {
    return mountainsDao.updateMountainById(id, resource)
  }

  async deleteById(id: string) {
    return mountainsDao.removeMountainById(id);
  }
}

export default new MountainService();
