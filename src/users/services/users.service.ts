import usersDao from "../dao/users.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateUserDto } from "../dtos/create.user.dto";
import { PutUserDto } from "../dtos/put.user.dto";
import { PatchUserDto } from "../dtos/patch.user.dto";

class UserService implements CRUD {
  async list(limit: number, page: number){
    return usersDao.getUsers(limit, page);
  }

  async create(resource: CreateUserDto){
    return usersDao.addUser(resource);
  }

  async readById(id: string){ 
    return usersDao.getUserById(id);
  }

  async getUserByEmail(email: string){
    return usersDao.getUserByEmail(email);
  }
  async getUserByEmailWithPassword(email: string){
    return usersDao.getUserByEmailWithPassword(email);
  }

  async putById(id: string, resource: PutUserDto){
    return usersDao.updateUserById(id, resource);
  }

  async patchById(id: string, resource: PatchUserDto){
    return usersDao.updateUserById(id, resource);
  }

  async deleteById(id: string){
    return usersDao.removeUserById(id);
  }
}

export default new UserService();