import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { User } from 'entities/User'
import { Team } from 'entities/Team'
import { Game } from 'entities/Game'

@Entity()
export class Room {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { nullable: false })
  name: string

  @OneToMany(type => User, user => user.room)
  users: User[]

  @OneToOne(type => Team)
  @JoinColumn()
  red: Team

  @OneToOne(type => Team)
  @JoinColumn()
  blue: Team

  @OneToMany(type => Game, game => game.room)
  games: Game[]
}