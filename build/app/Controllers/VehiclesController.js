"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VehiclesController {
    async index() {
        const vehicles = [
            {
                id: 1,
                name: 'First Vehicle',
                description: 'This is a description of first vehicle',
                plate: 'DDT-0012',
                isFavorite: false,
                year: 2018,
                color: '#ff00ff',
                price: 22000,
                createdAt: new Date(),
            },
        ];
        return vehicles;
    }
}
exports.default = VehiclesController;
//# sourceMappingURL=VehiclesController.js.map