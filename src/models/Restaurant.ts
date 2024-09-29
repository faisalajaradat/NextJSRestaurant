import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import User from './User';  // Import the User model
import { CUISINE_OPTIONS } from '@/lib/constants';

// Define Cuisine and Mealtype as types
export type Mealtype = "Breakfast" | "Brunch" | "Lunch" | "Dinner" | null;
export type Cuisine = typeof CUISINE_OPTIONS[number];

// Restaurant attributes interface
export interface RestaurantAttributes {
  id: number;
  name: string;
  address: string;
  cuisine: Cuisine[];
  meal: Mealtype;
  rating_service: number;
  rating_foodquality: number;
  rating_ambiance: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;  // Foreign key to link the restaurant to a user
}

// Restaurant creation attributes interface (id is optional for creation)
export interface RestaurantCreationAttributes extends Optional<RestaurantAttributes, 'id'> {}

class Restaurant extends Model<RestaurantAttributes, RestaurantCreationAttributes> implements RestaurantAttributes {
  public id!: number;
  public name!: string;
  public address!: string;
  public cuisine!: Cuisine[];
  public meal!: Mealtype;
  public rating_service!: number;
  public rating_foodquality!: number;
  public rating_ambiance!: number;
  public notes!: string | undefined;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public userId!: string;  // Foreign key to link the restaurant to a user

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
        type: DataTypes.JSON,  // Storing array of Cuisine as JSON
        allowNull: false,
      },
      meal: {
        type: DataTypes.ENUM("Breakfast", "Brunch", "Lunch", "Dinner"),  // Define enum
        allowNull: false,
      },
      rating_service: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,  // Set default to 0
        validate: {
          min: 0,
          max: 10,
        },
      },
      rating_foodquality: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,  // Set default to 0
        validate: {
          min: 0,
          max: 10,
        },
      },
      rating_ambiance: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,  // Set default to 0
        validate: {
          min: 0,
          max: 10,
        },
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',  // Links to the User model
          key: 'uuid',
        },
        onDelete: 'CASCADE',  // Delete restaurant if user is deleted
      },
    }, {
      sequelize,
      modelName: 'Restaurant',
      tableName: 'Restaurants',
    });

    return Restaurant;
  }
  static associate() {
    Restaurant.belongsTo(User, { foreignKey: 'userId' });
  }
}

export default Restaurant;
