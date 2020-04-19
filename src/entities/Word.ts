import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Word {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { nullable: false })
  word: string
}