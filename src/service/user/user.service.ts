import { User } from "./mold/user";
import { UserRepository } from "./repository/user.repository";
import { injectable } from "inversify";


@injectable()
export class UserService {
    private repository: UserRepository

    constructor(
    ){}

    private getRepository(): Promise<UserRepository> {
        return Promise.resolve(this.repository);
    }
    getList(): Promise<User[]> {
        return this.getRepository().then((repo) => {
            return repo.find();
        })
    }


}