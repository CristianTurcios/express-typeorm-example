import { IsNotEmpty } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';

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
    public categories: Category[];
}
