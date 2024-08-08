import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

export interface RestaurantAttributes {
  id: number;
  name: string;
  address: string;
  cuisine: string[];
  rating: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, 'id'> {}

class Restaurant extends Model<RestaurantAttributes, RestaurantCreationAttributes> implements RestaurantAttributes {
  public id!: number;
  public name!: string;
  public address!: string;
  public cuisine!: string[];
  public rating!: number;
  public notes!: string | undefined;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Restaurant {
    Restaurant.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    cuisine: {
        type: DataTypes.JSON,
        allowNull: false,
      },rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
          max: 10
        }
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      modelName: 'Restaurant',
      tableName: 'Restaurants',
    });

    return Restaurant;
  }
}

export default Restaurant;