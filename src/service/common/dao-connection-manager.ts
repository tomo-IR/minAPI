import { Connection, createConnections, getConnection, getCustomRepository, ObjectType } from "typeorm";
import ormconfig from '../../config/orm.config';
import { injectable } from "inversify";
import * as fs from 'fs';

@injectable()
export class DAOConnectionManager {

  public connections: Connection[];
  private rawQueries: any = {};

  constructor() {
  }

  createConnections(): Promise<Connection[]> {
    if (this.connections !== undefined) {
      return Promise.resolve(this.connections);
    }
    return createConnections([ormconfig]).then((connections) => {
      this.connections = connections;
      return this.connections;
    });
  }

//   query(sql: string, params: any[] = []): Promise<any> {
//     return this.createConnections().then(_ => {
//       // TODO: salveのConnection pool 調整について要検討
//       const connection = this.connections[0].createQueryRunner("slave");;
//       return connection.query(sql, params);
//     });
//   }

  async getCustomRepository<T>(customRepository: ObjectType<T>): Promise<T> {
    const connections = await this.createConnections();
    return getCustomRepository(customRepository, connections[0].name);
  }

//   queryLoader(path: string): string {
//     if (!this.rawQueries[path]) {
//       const query = fs.readFileSync(path).toString();
//       this.rawQueries[path] = query;
//     }
//     return this.rawQueries[path];
//   }
}