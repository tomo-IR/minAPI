import { User } from "./mold/user";
import { UserRepository } from "./repository/user.repository";
import { injectable } from "inversify";
require("reflect-metadata");


@injectable()
export class UserService {
    private repository: UserRepository

    constructor(
    ){}

    private getRepository(): Promise<UserRepository> {
        return Promise.resolve(this.repository);
    }
    async getList(): Promise<User[]> {
        const repo = await this.getRepository();
        return await repo.find();
    }
    test() {
        console.log("container Test");
        return;
    }


}