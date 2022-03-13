import { User } from "./mold/user";
import { UserRepository } from "./repository/user.repository";
import { injectable } from "inversify";
require("reflect-metadata");
import { DAOConnectionManager } from "../common/dao-connection-manager"

@injectable()
export class UserService {
	private repository: UserRepository

	constructor(
		private dao: DAOConnectionManager
	) {
	}

	private async getRepository(): Promise<UserRepository> {
		if (this.repository === undefined) {
			this.repository = await this.dao.getCustomRepository(UserRepository)
		}
		return this.repository;
	}

	async getUser(id: number): Promise<User> {
		try {
			const repo = await this.getRepository();
			const user = await repo.findOne({ id: id })
			return user;
		}
		catch (error) {
			console.error(error)
			return null;
		}
	}

}