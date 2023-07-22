// ========== Booked Table Model
// import all packages
import { UUIDV4 } from 'sequelize';
import {
  Table,
  Model,
  IsUUID,
  Column,
  DataType,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
} from 'sequelize-typescript';
import { TableAvailabilities } from '../table-availability/tableAvailabilities.model';
import { Reservation } from './reservation.model';

@Table({
  timestamps: false,
  paranoid: true,
  deletedAt: 'deleted_at',
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
export class BookedTable extends Model {
  @IsUUID('4')
  @PrimaryKey
  @Default(UUIDV4)
  @Column(DataType.STRING)
  id: string;

  @ForeignKey(() => TableAvailabilities)
  @Column(DataType.STRING)
  table_id: string;

  @ForeignKey(() => Reservation)
  @Column(DataType.STRING)
  reservation_id: string;

  @CreatedAt
  @Column(DataType.BIGINT)
  created_at: number;

  @UpdatedAt
  @Column(DataType.BIGINT)
  updated_at: number;

  @DeletedAt
  @Column(DataType.BIGINT)
  deleted_at: number | null;
}
