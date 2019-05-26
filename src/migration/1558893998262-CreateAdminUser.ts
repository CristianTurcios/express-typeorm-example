import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/User';

export class CreateAdminUser1547919837483 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        const user = new User();
        user.username = 'admin';
        user.password = 'admin';
        user.hashPassword();
        user.role = 'Admin';
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    // tslint:disable-next-line:no-empty
    public async down(queryRunner: QueryRunner): Promise<any> {}
}
