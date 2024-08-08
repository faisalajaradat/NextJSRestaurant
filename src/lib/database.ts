import { Sequelize, Options } from 'sequelize';
import Restaurant, { RestaurantAttributes, RestaurantCreationAttributes } from '../models/Restaurant';
import config from '../../config/config.json';

const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = (config as {[key: string]: Options})[env];

let sequelize: Sequelize;

// Initialize the database
const initDatabase = async () => {
  if (!sequelize) {
    sequelize = new Sequelize(sequelizeConfig);

    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  return sequelize;
};

// Initialize the model
const initModel = async () => {
  const sequelize = await initDatabase();
  Restaurant.initModel(sequelize);
  await sequelize.sync({ force: false });
  console.log('Database & tables created!');
};

// CRUD operations

// Create
export const createRestaurant = async (data: RestaurantCreationAttributes): Promise<RestaurantAttributes> => {
  await initModel();
  try {
    const restaurant = await Restaurant.create(data);
    return restaurant.get({ plain: true }) as RestaurantAttributes;
  } catch (error) {
    console.error('Failed to create restaurant:', error);
    throw error;
  }
};

// Read
export const getRestaurantById = async (id: number): Promise<RestaurantAttributes | null> => {
  await initModel();
  try {
    const restaurant = await Restaurant.findByPk(id);
    return restaurant ? restaurant.get({ plain: true }) as RestaurantAttributes : null;
  } catch (error) {
    console.error('Failed to get restaurant:', error);
    throw error;
  }
};

export const getAllRestaurants = async (): Promise<RestaurantAttributes[]> => {
  await initModel();
  try {
    const restaurants = await Restaurant.findAll();
    return restaurants.map(r => r.get({ plain: true }) as RestaurantAttributes);
  } catch (error) {
    console.error('Failed to get restaurants:', error);
    throw error;
  }
};

// Update
export const updateRestaurant = async (id: number, data: Partial<RestaurantCreationAttributes>): Promise<RestaurantAttributes | null> => {
  await initModel();
  try {
    const [updatedRowsCount] = await Restaurant.update(data, {
      where: { id }
    });
    if (updatedRowsCount > 0) {
      const updatedRestaurant = await Restaurant.findByPk(id);
      return updatedRestaurant ? updatedRestaurant.get({ plain: true }) as RestaurantAttributes : null;
    }
    return null;
  } catch (error) {
    console.error('Failed to update restaurant:', error);
    throw error;
  }
};

// Delete
export const deleteRestaurant = async (id: number): Promise<boolean> => {
  await initModel();
  try {
    const deletedRowsCount = await Restaurant.destroy({
      where: { id }
    });
    return deletedRowsCount > 0;
  } catch (error) {
    console.error('Failed to delete restaurant:', error);
    throw error;
  }
};

export { initDatabase, initModel };

export default {
  initDatabase,
  initModel,
  createRestaurant,
  getRestaurantById,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant
};