import { Table, Column, Model } from 'sequelize-typescript'

@Table({
  tableName: 'User'
})
export default class User extends Model<User> {
  @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number

  @Column
    name!: string

  @Column
    age!: number
  @Column
    features!: string
}