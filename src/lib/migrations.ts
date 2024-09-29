import Restaurant from '../models/Restaurant';

export const initDatabase = async () => {
  try {
    await Restaurant.sync({ force: true }); // Use { force: true } to recreate the tables on each run (useful for development)
    console.log('Database & tables created!');
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
};
