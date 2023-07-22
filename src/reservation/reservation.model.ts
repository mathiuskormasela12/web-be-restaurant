// ========== Reservation Model
// import all packages
import { UUIDV4 } from 'sequelize';
import {
  Table,
  Model,
  IsUUID,
  Column,
  DataType,
  PrimaryKey,
  AllowNull,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  IsEmail,
  BelongsToMany,
} from 'sequelize-typescript';
import { TableAvailabilities } from '../table-availability/tableAvailabilities.model';
import { BookedTable } from './bookedTable.model';

@Table({
  timestamps: true,
  paranoid: true,
  hooks: {
    beforeCreate(attributes) {
      attributes.dataValues.created_at = Date.now();
      attributes.dataValues.updated_at = Date.now();
    },
    beforeUpdate(attributes) {
      attributes.dataValues.updated_at = Date.now();
    },
    beforeDestroy(attributes) {
      attributes.dataValues.deleted_at = Date.now();
    },
  },
})
export class Reservation extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.STRING)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  first_name: string;

  @Column(DataType.STRING)
  last_name: string;

  @AllowNull(false)
  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phone_number: string;

  @CreatedAt
  @Column(DataType.BIGINT)
  created_at: number;

  @UpdatedAt
  @Column(DataType.BIGINT)
  updated_at: number;

  @DeletedAt
  @Column(DataType.BIGINT)
  deleted_at: number | null;

  @BelongsToMany(() => TableAvailabilities, () => BookedTable)
  tableAvailbilities: TableAvailabilities[];
}
