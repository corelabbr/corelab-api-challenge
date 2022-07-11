/* eslint-disable @typescript-eslint/space-before-function-paren */
import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddVehicleValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		is_favorite: schema.boolean(),
	})
}
