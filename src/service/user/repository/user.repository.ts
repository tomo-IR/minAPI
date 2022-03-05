import { EntityRepository, Repository } from "typeorm";
import { User } from "../../../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findById(id: string): Promise<User> {
        return this.findOne({
            where: {id}
        })
    }
}