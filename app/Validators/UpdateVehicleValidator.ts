/* eslint-disable @typescript-eslint/space-before-function-paren */
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateVehicleValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		name: schema.string.optional(),
		brand: schema.string.optional(),
		description: schema.string.optional(),
		plate: schema.string.optional(),
		year: schema.number.optional([
			rules.range(1900, new Date().getFullYear()),
		]),
		color: schema.string.optional(),
		price: schema.number.optional(),
	})

	public messages: CustomMessages = {
		'range': 'O campo {{ field }} deve estar entre {{ options.start }} e {{ options.stop }}',
	}
}
