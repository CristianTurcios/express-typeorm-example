import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { User } from '../entity/User';

export class CreateAdminUser1558984478989 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = new User();
        user.username = 'admin';
        user.password = 'admin';
        user.hashPassword();
        user.role = 'Admin';
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }
    public async down(queryRunner: QueryRunner): Promise<any> { }
}