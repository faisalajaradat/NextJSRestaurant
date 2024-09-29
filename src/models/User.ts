import { Model, DataTypes, Sequelize, Optional } from 'sequelize';

// Define the attributes for User
export interface UserAttributes {
  uuid: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// When creating a user, 'uuid' and 'id' should be optional
export interface UserCreationAttributes extends Optional<UserAttributes, 'uuid'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public uuid!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,  // Automatically generate UUID
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,  // Ensure valid email format
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
      }
    );
    return User;
  }
}

export default User;
