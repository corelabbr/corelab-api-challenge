/* eslint-disable @typescript-eslint/space-before-function-paren */
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddVehicleValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		name: schema.string(),
		brand: schema.string(),
		description: schema.string(),
		plate: schema.string(),
		year: schema.number([
			rules.range(1900, new Date().getFullYear()),
		]),
		color: schema.string(),
		price: schema.number(),
	})

	public messages: CustomMessages = {
		'range': 'O campo {{ field }} deve estar entre {{ options.start }} e {{ options.stop }}',
	}
}
