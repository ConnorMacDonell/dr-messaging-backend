import messagesDao from "../dao/messages.dao";
import { CRUD } from "../../shared/interfaces/crud.interface";
import { CreateMessageDto } from "../dtos/create.message.dto";
import { PatchMessageDto } from "../dtos/patch.message.dto";
import { PutMessageDto } from "../dtos/put.message.dto";

class MessageService implements CRUD {
  async list(limit: number, page: number) {
    return messagesDao.getMessages(limit, page);
  }

  async create(resource: CreateMessageDto) {
    return messagesDao.addMessage(resource);
  }

  async readById(id: string) {
    return messagesDao.removeMessageById(id);
  }

  async readMessageByCategory(name: string) {
    return messagesDao.getMessageByCategory(name);
  }

  async putById(id: string, resource: PutMessageDto) {
    return messagesDao.updateMessageById(id, resource)
  }

  async patchById(id: string, resource: PatchMessageDto) {
    return messagesDao.updateMessageById(id, resource)
  }

  async deleteById(id: string) {
    return messagesDao.removeMessageById(id);
  }
}

export default new MessageService();
