import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Room } from 'entities/Room'
import { Team } from 'entities/Team'

@Entity()
export class User {


  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { nullable: false })
  username: string

  @Column('text', { nullable: false })
  avatarColor: string

  @ManyToOne(type => Room, room => room.users)
  room: Room

  @ManyToOne(type => Team, team => team.users)
  team: Team

  @Column('text', { nullable: true })
  teamId: string
}