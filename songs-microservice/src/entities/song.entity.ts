import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class SongEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    author: string
}