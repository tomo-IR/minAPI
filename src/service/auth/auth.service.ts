import { User } from "../user/mold/user";
import { UserRepository } from "../user/repository/user.repository";
import { injectable } from "inversify";
require("reflect-metadata");
import { DAOConnectionManager } from "../common/dao-connection-manager";
import { BodyParser } from "body-parser";
import { jwt } from 'jsonwebtoken';
import { resolve } from "path";
import { rejects } from "assert";


@injectable()
export class AuthService {
	private repository: UserRepository;

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

	async login(userName: string, password: string): Promise<User> {
		//　とりあえず、リクエストパラメータ受け取って、ユーザがみつかれば、とりあえずUser返す
		const repo = await this.getRepository();

		// パラメータから受け取ったユーザを探す
		const result = await repo.findOne({ userName: userName })
		// いなければnullを返す
		if (!result) {
			console.log("ユーザがみつかりません。")
			return null;
		}
		console.log(result)

		// パスワードの照合
		if (password !== result.password) {
			console.log('パスワードが違います。')
			return null;
		} else {
			console.log("認証OK")
			return result;
		}

	}

}



