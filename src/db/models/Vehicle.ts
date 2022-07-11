import { DataTypes, Model, Optional } from "sequelize";
import dbConfig from "../config";

export interface IVehicle {
    id: number;
    brand: string;
    name: string;
    description: string;
    plate: string;
    isFavorite: boolean;
    year: number;
    color: string;
    price: number;
    createdAt: Date;
}

export interface IVehicleInput extends Optional<IVehicle, "id"> { }
export interface IVehicleOutput extends Required<IVehicle> { }

class Vehicle extends Model implements IVehicle {
    public id!: number;
    public brand!: string;
    public name!: string;
    public description!: string;
    public plate!: string;
    public isFavorite!: boolean;
    public year!: number;
    public color!: string;
    public price!: number;

    public readonly createdAt!: Date;
}

Vehicle.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        plate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isFavorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    { sequelize: dbConfig, modelName: "vehicles" }
);

Vehicle.sync()
export default Vehicle;
