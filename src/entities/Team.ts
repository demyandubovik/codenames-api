import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm'
import { User } from 'entities/User'

@Entity()
export class Team {

  @PrimaryGeneratedColumn()
  id: number

  @Column('text', { nullable: false })
  name: string

  @OneToMany(type => User, user => user.team)
  users: User[]

  @OneToOne(type => User)
  captain: User

  @Column('text', { nullable: true })
  captainId: string
}