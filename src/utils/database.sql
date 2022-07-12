CREATE DATABASE vehicleAds;

CREATE TABLE IF NOT EXISTS vehicle(
    id serial PRIMARY KEY,
    name text NOT NULL,
    brand text NOT NULL,
    color text NOT NULL,
    year int NOT NULL,
    plate VARCHAR(7) NOT NULL,
    price int,
    favorite boolean default false,
    createdAt timestamptz

)

CREATE TABLE IF NOT EXISTS favorites(
    id serial PRIMARY KEY,
    id_vehicle seria references vehicle(id),
    isFavorite boolean default false

)