CREATE TABLE table_vehicles (
  `id` VARCHAR(255) PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `brand` varchar(25) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `price` int NOT NULL,
  `year` varchar(5) NOT NULL,
  `license_plate` varchar(10) NOT NULL
)