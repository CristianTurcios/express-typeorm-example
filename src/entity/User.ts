import bcrypt from 'bcryptjs';
import { IsNotEmpty, Length  } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @Length(4, 60)
    public username: string;

    @Column()
    @Length(4, 100)
    public password: string;

    @Column()
    @IsNotEmpty()
    public role: string;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt: Date;

    public hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
