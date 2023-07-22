// ========== Table Availabilities Model
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
  BelongsToMany,
} from 'sequelize-typescript';
import { Reservation } from '../reservation/reservation.model';
import { BookedTable } from '../reservation/bookedTable.model';

@Table({
  timestamps: false,
  paranoid: true,
  hooks: {
    beforeCreate(attributes) {
      attributes.dataValues.created_at = Date.now();
      attributes.dataValues.updated_at = Date.now();
    },
    beforeUpdate(attributes) {
      attributes.dataValues.updated_at = Date.now();
      attributes.dataValues.deleted_at = Date.now();
    },
    beforeDestroy(attributes) {
      attributes.dataValues.updated_at = Date.now();
      attributes.dataValues.deleted_at = Date.now();
    },
  },
})
export class TableAvailabilities extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.STRING)
  id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  table_code: string;

  @Default(0)
  @Column(DataType.INTEGER)
  capacity: number;

  @Column(DataType.STRING)
  location: string;

  @Default(false)
  @Column(DataType.BOOLEAN)
  is_available: boolean;

  @CreatedAt
  @Column(DataType.BIGINT)
  created_at: number;

  @UpdatedAt
  @Column(DataType.BIGINT)
  updated_at: number;

  @DeletedAt
  @Column(DataType.BIGINT)
  deleted_at: number | null;

  @BelongsToMany(() => Reservation, () => BookedTable)
  reservations: Reservation[];
}
