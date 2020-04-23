import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm'
import { User } from 'entities/User'
import { Game } from 'entities/Game'

@Entity()
export class Team {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { nullable: false })
  name: string

  @OneToMany(type => User, user => user.team)
  users: User[]

  @OneToOne(type => User)
  captain: User

  @Column('text', { nullable: true })
  captainId: string

  @OneToMany(type => Game, game => game.activeTeam)
  activeGames: Game[]
}