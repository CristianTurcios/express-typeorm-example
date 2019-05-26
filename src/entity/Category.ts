import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    @IsNotEmpty()
    public name: string;

    @ManyToMany((type) => Post, (post) => post.categories)
    @JoinTable()
    public posts: Post[];
}
