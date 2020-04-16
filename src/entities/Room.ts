import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { User } from 'entities/User'

@Entity()
export class Room {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { nullable: false })
  name: string

  @OneToMany(type => User, user => user.room)
  users: User[]
}