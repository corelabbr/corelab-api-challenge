import { DataTypes } from 'sequelize';
import { sequelize } from '..';

const Notes = sequelize.define('Notes', {
    id: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'white'
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'notes',
    timestamps: true,
    underscored: true
});

export { Notes };
