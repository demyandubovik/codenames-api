import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Move {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { nullable: false })
  word: string
}