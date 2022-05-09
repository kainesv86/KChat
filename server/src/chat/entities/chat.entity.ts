import { User } from "src/user/entities/user.entity";
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Chat {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        chatId: string;

        @ManyToOne(() => User, (user) => user.chat)
        user: User;

        @Column()
        message: string;

        @CreateDateColumn()
        createDate: Date;
}
