import { DataTypes, Model } from 'sequelize';
import connection from '../database/index';

interface taskAttributes {
  id?: number;
  title?: string;
  description?: string;
  isYellowStar?: boolean;
  isFavorite?: boolean;
  color?: string;

}

class Task extends Model implements taskAttributes {
  id?: number;
  title?: string;
  description?: string;
  isYellowStar?: boolean;
  isFavorite?: boolean;
  color?: string;

}
Task.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING
  },
  isYellowStar: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  isFavorite: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING
  }
}, {
  sequelize: connection,
  underscored: false
})

module.exports = Task;