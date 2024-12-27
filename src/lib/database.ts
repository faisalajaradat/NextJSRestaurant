import { Sequelize, Options } from 'sequelize';
import Restaurant, { RestaurantAttributes, RestaurantCreationAttributes } from '../models/Restaurant';
import config from '../../config/config.js';
import User, { UserAttributes, UserCreationAttributes } from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const env = process.env.NODE_ENV || 'development';
const sequelizeConfig = (config as { [key: string]: Options })[env];

let sequelize: Sequelize;

// JWT secret (store in environment variables)
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

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
  User.initModel(sequelize);
  await sequelize.sync({ force: false });
  console.log('Database & tables created!');
};

// User Functions

// Register User
export const registerUser = async (data: UserCreationAttributes): Promise<UserAttributes> => {
  await initModel();
  try {
    const user = await User.create(data);
    return user.get({ plain: true }) as UserAttributes;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
};

// Login User
export const loginUser = async (email: string, password: string): Promise<string | null> => {
  await initModel();
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found');
      return null;
    }

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password');
      return null;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.uuid, email: user.email }, jwtSecret, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('Failed to login user:', error);
    throw error;
  }
};

// Verify JWT Token (Middleware)
export const authenticateToken = (token: string) => {
  if (!token) {
    return { error: 'Access denied', status: 401 };
  }

  try {
    const verified = jwt.verify(token, jwtSecret);
    return { user: verified }; // Return the decoded user from the token
  } catch (error) {
    return { error: 'Invalid token', status: 400 };
  }
};


// Update user
// Update User by UUID
export const updateUser = async (uuid: string, updatedData: Partial<UserAttributes>): Promise<UserAttributes | null> => {
  await initModel();
  try {
    // Find the user by their UUID
    const user = await User.findOne({ where: { uuid } });

    // If user not found, return null
    if (!user) {
      console.error('User not found');
      return null;
    }

    // Update user with the provided data
    await user.update(updatedData);

    // Return the updated user data (as plain object)
    return user.get({ plain: true }) as UserAttributes;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
};




// Restaurant Functions

// Create Restaurant
export const createRestaurant = async (data: RestaurantCreationAttributes): Promise<RestaurantAttributes> => {
  await initModel();
  try {
    const restaurantData = {
      ...data,
    };

    const restaurant = await Restaurant.create(restaurantData);
    return restaurant.get({ plain: true }) as RestaurantAttributes;
  } catch (error) {
    console.error('Failed to create restaurant:', error);
    throw error;
  }
};

// Read Restaurant by ID
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

// Get all Restaurants
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

// Update Restaurant
export const updateRestaurant = async (id: number, data: Partial<RestaurantCreationAttributes>): Promise<RestaurantAttributes | null> => {
  await initModel();
  try {
    const [updatedRowsCount] = await Restaurant.update(data, { where: { id } });
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

// Delete Restaurant
export const deleteRestaurant = async (id: number): Promise<boolean> => {
  await initModel();
  try {
    const deletedRowsCount = await Restaurant.destroy({ where: { id } });
    return deletedRowsCount > 0;
  } catch (error) {
    console.error('Failed to delete restaurant:', error);
    throw error;
  }
};

// Get Restaurants by UUID
export const getRestaurantsByUUID = async (userId: string) => {
  await initModel();
  
  // Validate if the passed UUID is valid
  // if (!isUUID(uuid)) {
  //   throw new Error('Invalid UUID format');
  // }

  try {
    const restaurants = await Restaurant.findAll({ where: { userId } });
    return restaurants;
  } catch (error) {
    console.error('Error in getRestaurantsByUUID:', error);
    throw error;
  }
};

export { initDatabase, initModel };

export default {
  initDatabase,
  initModel,
  // User operations
  registerUser,
  loginUser,
  authenticateToken,
  updateUser,
  // Restaurant operations
  createRestaurant,
  getRestaurantById,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantsByUUID,
};
