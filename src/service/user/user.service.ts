import { User } from "./mold/user";
import { UserRepository } from "./repository/user.repository";
import { injectable } from "inversify";
require("reflect-metadata");
import fetch from "node-fetch";
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
    async getList(): Promise<User> {
        try {
            
            const repo = await this.getRepository();
            const userA = await repo.findOne({id: 1})
            // console.log(userA)
            // console.log(repo.find({userName: "ira"}))

            return userA;
            // .catch((error)=>{
            //     console.error(error)
            //     return null
            // })
        }
        catch (error) {
            console.error(error)
            console.error("error")
        }
    }

    getListThen(): Promise<User[]> {
        return this.getRepository().then((repo) => {
            return repo.find();
        })
            .catch((error) => {
                console.error(error)
                return null
            })
    }
}