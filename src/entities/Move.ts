import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { Team } from 'entities/Team'
import { Game } from 'entities/Game'

@Entity()
export class Move {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { nullable: false })
  word: string

  @CreateDateColumn()
  date: string

  @ManyToOne(type => Team, team => team.moves)
  team: Team

  @Column('text', { nullable: true })
  teamId: string

  @ManyToOne(type => Game, game => game.moves)
  game: Game

  @Column('text', { nullable: true })
  gameId: string
}