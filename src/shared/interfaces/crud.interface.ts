export interface CRUD {
  list: (limit: number, page: number) => Promise<any>;
  listByOwnerId?: (ownerId: string) => Promise<any>;
  create: (resource: any) => Promise<any>;
  putById: (id: string, resource: any) => Promise<any>;
  readById: (id: string) => Promise<any>;
  deleteById: (id: string) => Promise<any>;
  patchById: (id: string, resource: any) => Promise<any>;
}