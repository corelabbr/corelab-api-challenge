import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    async createVehicle(req, res) {
        try {
            const { name, description, brand, color, year, plate, price, isFavorite } = req.body
        
            const vehicle = await prisma.vehicle.create({
                data: {
                    name,
                    description,
                    brand,
                    color,
                    year,
                    plate,
                    price,
                    isFavorite
                },
            })
    
            return res.json(vehicle);
        } catch (error) {
            return res.json({ error });
        }
    },

    async getAllVehicles(req, res) {
        try {
            const vehicles = await prisma.vehicle.findMany();
            return res.json(vehicles);
        } catch (error) {
            return res.json({ error });
        }
    },

    async getVehicle(req, res) {
        try {
            const { id } = req.params;
            const vehicle = await prisma.vehicle.findUnique({where: {id: Number(id)}});
            return res.json(vehicle);
        } catch (error) {
            return res.json({ error });
        }
    },

    async updateVehicle(req, res) {
        try {
            const { id } = req.params;
            const { name, description, brand, color, year, plate, price, isFavorite } = req.body;

            let vehicle = await prisma.vehicle.findUnique({where: {id: Number(id)}});

            if(!vehicle) return res.json({ error: "Não foi possível encontrar este veículo." })

            vehicle = await prisma.vehicle.update({
                where: { id: Number(id) }, 
                data: { name, description, brand, color, year, plate, price, isFavorite },
            });

            return res.json(vehicle);
        } catch (error) {
            return res.json({ error });
        }
    },

    async deleteVehicle(req, res) {
        try {
            const { id } = req.params;

            const vehicle = await prisma.vehicle.findUnique({where: {id: Number(id)}});

            if (!vehicle) return res.json({ error: "Não foi possível encontrar este veículo." })

            await prisma.vehicle.delete({
                where: { id: Number(id) }, 
            });

            return res.json({ message: "Veículo deletado com sucesso!" });
        } catch (error) {
            return res.json({ error });
        }
    },

    async getFilteredVehicles(req, res) {
        try {
            
        } catch (error) {
            return res.json({ error });
        }
    }
}