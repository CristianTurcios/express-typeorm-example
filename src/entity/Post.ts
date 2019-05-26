import { IsNotEmpty } from 'class-validator';
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Category} from './Category';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @IsNotEmpty()
    public title: string;

    @Column('text')
    @IsNotEmpty()
    public text: string;

    @ManyToMany((type) => Category, (category) => category.posts)
    @JoinTable()
    public categories: Category[];
}
