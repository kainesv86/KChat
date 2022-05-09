import { User } from "src/user/entities/user.entity";
import { Entity, Column, OneToMany, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        chatId: string;

        @OneToMany(() => User, (user) => user.id)
        user: User;

        @Column()
        message: string;

        @CreateDateColumn()
        createDate: Date;
}
