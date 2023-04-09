import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm"

@Entity()
export class HistoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text", nullable: true})
    profileId?: string

    @Column({type: "text", nullable: true})
    songId?: string
}