import { User } from "src/user/entities/user.entity";
import { Entity, Column, OneToMany, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Chat {
        @PrimaryColumn()
        chatId: string;

        @OneToMany(() => User, (user) => user.id)
        user: User;

        @Column()
        message: string;

        @CreateDateColumn()
        createDate: Date;
}
