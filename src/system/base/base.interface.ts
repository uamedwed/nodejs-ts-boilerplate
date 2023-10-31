import Joi, { Root, ObjectSchema } from 'joi'
import JoiToSw from 'joi-to-swagger'
import mongoose from 'mongoose'
import joigoose from 'joigoose'
import BaseClass from './base.class'

export default class BaseInterface extends BaseClass {
	public Rules: Root
	public scheme: ObjectSchema<any>
	public Joigoose: any = joigoose(mongoose)
	constructor() {
		super()
		this.Rules = Joi
	}

	init(scheme: ObjectSchema<any>, optionalFieldsConfig: string[] = []) {
		const unsetKeys = this.getUnsetKeys(scheme)
		this.scheme = scheme
			.fork(
				unsetKeys.filter((el) => optionalFieldsConfig.includes(el)),
				(key) => key.optional()
			)
			.fork(
				unsetKeys.filter((el) => !optionalFieldsConfig.includes(el)),
				(key) => key.required()
			)
	}

	private getUnsetKeys(schema: ObjectSchema<any>) {
		const unsetKeys: string[] = []
		const schemaInfo = schema.describe().keys
		Object.keys(schemaInfo).forEach((key) => {
			if (!schemaInfo[key].flags?.presence) unsetKeys.push(key)
		})
		return unsetKeys
	}

	getInterface() {
		return this.scheme
	}

	getSwInterface(scheme?: ObjectSchema<any>) {
		return JoiToSw(scheme ?? this.scheme).swagger
	}

	getMongoDbInterface() {
		return this.Joigoose.convert(this.scheme)
	}
}
