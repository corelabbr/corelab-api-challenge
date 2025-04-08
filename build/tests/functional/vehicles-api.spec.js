"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
(0, runner_1.test)('display vehicles', async ({ client }) => {
    const response = await client.get('/vehicles');
    response.assertStatus(200);
    response.assertBodyContains([
        {
            id: 1,
            name: 'First Vehicle',
            description: 'This is a description of first vehicle',
            plate: 'DDT-0012',
            isFavorite: false,
            year: 2018,
            color: '#ff00ff',
            price: 22000,
        },
    ]);
});
//# sourceMappingURL=vehicles-api.spec.js.map