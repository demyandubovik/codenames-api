import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, OneToMany } from 'typeorm'
import { Word } from 'entities/Word'
import { Room } from 'entities/Room'
import { Team } from 'entities/Team'
import { Move } from 'entities/Move'

@Entity()
export class Game {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { array: true })
  schema: string[]

  @Column('text', { array: true })
  answered: string[]

  @Column('text', { nullable: false })
  startTeamId: string

  @Column('boolean', { default: false })
  finished: boolean

  @Column('integer', { default: 0 })
  redScore: number

  @Column('integer', { default: 0 })
  blueScore: number

  @ManyToMany(type => Word)
  @JoinTable()
  redWords: Word[]

  @ManyToMany(type => Word)
  @JoinTable()
  blueWords: Word[]

  @ManyToMany(type => Word)
  @JoinTable()
  neutralWords: Word[]

  @ManyToOne(type => Word)
  blackWord: Word

  @ManyToOne(type => Team)
  activeTeam: Team

  @ManyToOne(type => Team)
  winner: Team

  @ManyToOne(type => Room, room => room.games)
  room: Room

  @Column('text', { nullable: true })
  roomId: string

  @OneToMany(type => Move, move => move.game)
  moves: Move[]
}