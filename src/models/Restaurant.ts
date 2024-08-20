import { Model, DataTypes, Sequelize, Optional, EnumDataType } from 'sequelize';

export type Mealtype =  "Breakfast" |"Brunch" | "Lunch " | "Dinner" | null;
import { CUISINE_OPTIONS } from '@/lib/constants';
import { UUID } from 'crypto';


export type Cuisine = typeof CUISINE_OPTIONS[number];

export interface RestaurantAttributes {
  uuid: UUID;
  id: number;
  name: string;
  address: string;
  cuisine: Cuisine[];
  meal:Mealtype;
  rating_service: 0;
  rating_foodquality:0;
  rating_ambiance: 0;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, 'id'> {}

class Restaurant extends Model<RestaurantAttributes, RestaurantCreationAttributes> implements RestaurantAttributes {
  public uuid!: UUID;
  public id!: number;
  public name!: string;
  public address!: string;
  public cuisine!: Cuisine[];
  public meal!: Mealtype;
  public rating_service!: 0;
  public rating_foodquality!:0;
  public rating_ambiance!: 0;
  public notes!: string | undefined;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Restaurant {
    Restaurant.init({
      uuid:{
        type:DataTypes.UUID,
        allowNull:false
      },
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
      },meal:{
        type:DataTypes.ENUM,
        values: ["Breakfast", "Lunch", "Brunch", "Dinner"],
        allowNull: false
      },
      rating_service: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 10
        }
      },
      rating_foodquality: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 10
        }
      },
      rating_ambiance: {
        type: DataTypes.INTEGER,
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