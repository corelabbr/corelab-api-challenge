import Vehicle, { IVehicleInput } from "../../db/models/Vehicle";
import { Op } from "sequelize";

const createV = async (payload: IVehicleInput) => {
    try {
        return await Vehicle.create(payload, { returning: true });
    } catch (error) {
        return false;
    }
};

const readV = async () => {
    try {
        return await Vehicle.findAll();
    } catch (error) {
        return false;
    }
};

const updateV = async (id: number, payload: IVehicleInput) => {
    try {
        const exists = await Vehicle.findByPk(id);
        if (!exists) {
            return false;
        } else {
            return await Vehicle.update(payload, { where: { id } });
        }
    } catch (error) { }
};

const deleteV = async (id: number) => {
    try {
        return await Vehicle.destroy({ where: { id } });
    } catch (error) {
        return false;
    }
};

const searchV = async (query: any) => {
    const fields: any = {}
    const listSearch = []

    if (query.brand) fields.brand = query.brand;
    if (query.color) fields.color = query.color.replace("*", "#");
    if (query.year) fields.year = query.year;
    if (query.min && query.max) fields.price = { [Op.between]: [query.min, query.max] };
    if (query.q) listSearch.push({ brand: { [Op.substring]: query.q } },
        { name: { [Op.substring]: query.q } },
        { description: { [Op.substring]: query.q } },
        { plate: { [Op.substring]: query.q } },
        { year: { [Op.substring]: query.q } },
        { color: { [Op.substring]: query.q } },
        { price: { [Op.substring]: query.q } })
    listSearch.push(fields)
    try {

        console.log(fields)
        return await Vehicle.findAll({
            where: {
                [Op.or]: listSearch

            }
        });
    } catch (error) {
        return false;
    }
};

const filtersV = async () => {
    try {
        const fields = await Vehicle.findAll({ attributes: ['brand', 'color', 'year'] })
        let resp: any = { brands: [], colors: [], years: [] }
        fields.map((item) => {
            resp.brands.push({ name: item.brand, value: item.brand })
            resp.colors.push({ name: item.color, value: item.color })
            resp.years.push({ name: item.year, value: item.year })
        })
        return resp
    } catch (error) {
        return false
    }
}

export { createV, readV, updateV, deleteV, searchV, filtersV };
