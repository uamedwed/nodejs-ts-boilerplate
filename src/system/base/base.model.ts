import mongoose, { SchemaOptions } from 'mongoose'

export default class BaseModel {
	private readonly _name: string
	private readonly _structure: any
	private readonly _options: SchemaOptions
	private readonly _indexes: any
	private model: any

	constructor(name: string, structure: object, options: SchemaOptions, indexes: any) {
		this._name = name
		this._structure = structure
		this._options = options
		this._indexes = indexes
		this.init()
		return this
	}

	init() {
		this._options.timestamps = true
		try {
			const schema = new mongoose.Schema(this._structure, { ...this._options })
			this._indexes.forEach((indexParam: any) => {
				schema.index(indexParam)
			})
			this.model = mongoose.model(this._name, schema, this._name)
		} catch (e) {
			this.model = mongoose.model(this._name)
		}
	}

	async find(
		query: object = {},
		projection: object = {},
		limit?: number,
		sort?: object,
		skip?: number
	) {
		return await this.model.find(query, projection).skip(skip).limit(limit).sort(sort).lean()
	}

	async findOne(query: object = {}, projection: object = {}) {
		return await this.model.findOne(query, projection).exec()
	}

	async insert(data: object) {
		return await this.model(data).save()
	}

	async insertMany(data: object[]) {
		return await this.model.insertMany(data)
	}

	async update(_id: string, data: object, options: object = {}) {
		return await this.model.findOneAndUpdate({ _id }, { $set: data }, options).exec()
	}

	async findOneAndUpdate(query: object, data: object, options: object = {}) {
		return await this.model.findOneAndUpdate(query, { $set: data }, options).exec()
	}

	async updateMany(query: object, data: object) {
		return await this.model.updateMany(query, { $set: data }).exec()
	}

	async count(query: object) {
		return await this.model.countDocuments(query)
	}

	async removeMany(query: object) {
		return await this.model.deleteMany(query)
	}

	async removeOne(_id: string) {
		return await this.model.deleteOne({ _id })
	}

	async findById(_id: string) {
		return await this.model.findById({ _id })
	}

	async unsetField(_id: string, data: object, options: object = {}) {
		return await this.model.findOneAndUpdate({ _id }, { $unset: data }, options).exec()
	}

	async push(query: object, arrayField: string, value: string) {
		return await this.model.update(query, { $push: { [arrayField]: value } })
	}

	async pull(query: object, arrayField: string, value: string) {
		return await this.model.update(query, { $pull: { [arrayField]: value } })
	}

	async groupBy(query: any) {
		try {
			return await this.model.aggregate(query).exec()
		} catch (error) {
			throw error
		}
	}
}
