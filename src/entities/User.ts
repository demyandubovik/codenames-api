import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Room } from 'entities/Room'

@Entity()
export class User {


  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { nullable: false })
  username: string


  @ManyToOne(type => Room, room => room.users)
  room: Room
}