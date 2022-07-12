import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IVehicle } from 'App/Types/Vehicle'
import Vehicle from 'App/Models/Vehicle'


export default class VehiclesController {
    public async config () {
      try {
        const brandConfig = await Vehicle.query().distinct('brand')
        const yearConfig = await Vehicle.query().distinct('year')
        const colorConfig = await Vehicle.query().distinct('color')

        return {
          brands: brandConfig.map(obj => obj.brand),
          years: yearConfig.map(obj => obj.year),
          colors: colorConfig.map(obj => obj.color)
        }
      } catch (err) {
        throw new Error(err?.message)
      }
    }

    public async index(ctx: HttpContextContract) {
      try {
        const { search, maxPrice, minPrice, ...cols } = ctx.request.qs()

        const buildRawColumns = (columns: string[]) => columns.reduce((acc, val) => acc+val+ " || ' ' || ", "' ' || ") + " ' ' "

        const whereRawColumnsSql = buildRawColumns(['name', 'description', 'year', "color", 'plate', 'price', 'brand'])

        const whereRawSql = `to_tsvector('simple', ${whereRawColumnsSql}) @@ to_tsquery(regexp_replace(cast(plainto_tsquery('simple', ?) as text), E'(\\'\\\\w+\\')', E'\\\\1:*', 'g'))`

        const keyArrays: string[] = [];
        const valArrays: string[] = [];

        for (const [key, value] of Object.entries(cols)) {
          keyArrays.push(key)
          valArrays.push(value)
        }

        return await Vehicle.query()
        .where(query => {
          if (search) {
            query = query.whereRaw(whereRawSql, [search])
          }
          if (Object.keys(cols).length) {
            query = query.whereIn(keyArrays, [valArrays])
          }

          if (minPrice) {
            query = query.andWhere('price', '>=', minPrice)
          }

          if (maxPrice) {
            query = query.andWhere('price', '<=', maxPrice)
          }

          return query
        })

      } catch(err) {
        throw new Error(err?.message)
      }
    }

    public async show(ctx: HttpContextContract) {
      try {
        const id = ctx.request.param('id');
        const vehicle = await Vehicle.findBy('id', id) 

        if (!vehicle) { throw new Error('vehicle not exixts') }

        return vehicle
      } catch(err) {
        throw new Error(err?.message)
      }
    }

    public async store(ctx: HttpContextContract) {
      try {
        const { name, description, color, isFavorite, plate, price, year, brand }: Partial<IVehicle> = ctx.request.body();
        
        const vehicle = await Vehicle.create({ name, description, color, isFavorite, plate, price, year, brand })
        
        return vehicle
      } catch (err) {
        throw new Error(err?.message)
      }
    }

    public async update(ctx: HttpContextContract) {
      try {
        const id = ctx.request.param('id');
        const body: Partial<IVehicle> = ctx.request.body();

        const vehicle = await Vehicle.findBy('id', id)

        if (!vehicle) { throw new Error('vehicle not exixts') }

        await vehicle.merge(body).save()
        
        return vehicle
      } catch (err) {
        throw new Error(err?.message)
      }
    }

    public async destroy(ctx: HttpContextContract) {
      try {
        const id = ctx.request.param('id');

        const vehicle = await Vehicle.findOrFail(id)

        if (!vehicle) { throw new Error('vehicle not exixts') }

        await vehicle.delete()
        
        return vehicle
      } catch (err) {
        throw new Error(err?.message)
      }
    }
}

// Example index creation and querying:

// PostgreSQL:
// CREATE INDEX <INDEX NAME> ON <TABLE NAME> USING gin(to_tsvector(<COLUMN NAME>));

// SELECT * FROM <TABLE NAME> WHERE <COLUMN NAME> @@ to_tsquery(<INPUT>);
// MySQL:
// CREATE FULLTEXT INDEX <INDEX NAME> ON <TABLE NAME>;

// SELECT * FROM <TABLE NAME> WHERE MATCH <COLLUMN NAME> AGAINST <INPUT>;
// sqlite:
// CREATE VIRTUAL TABLE <TABLE> USING fts3(<COLUMN NAME> TEXT);

// SELECT * FROM <TABLE NAME> WHERE <COLUMN NAME> MATCH <INPUT>;