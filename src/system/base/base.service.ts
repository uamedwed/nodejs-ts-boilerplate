import BaseModel from './base.model'
import BaseClass from './base.class'

export default class BaseService extends BaseClass {
	private readonly model: any

	constructor(model: BaseModel) {
		super()
		this.model = model
	}

	async validate(data: object | string, scheme: any) {
		try {
			return await scheme.validateAsync(data)
		} catch (e) {
			throw new Error((e as Error).message)
		}
	}

	async insertData(data: object, options: object = {}) {
		return await this.model.insert(data, options)
	}

	async getDataByQuery(query: object) {
		const result = await this.model.find(query)
		return result.length ? result : null
	}

	async updateData(_id: string, data: object, options: object = {}) {
		return await this.model.update(_id, data, options)
	}

	async dataExists(query?: object): Promise<boolean> {
		const count = await this.model.count(query)
		return count > 0
	}

	async deleteData(_id: string) {
		return await this.model.removeOne(_id)
	}

	async deleteMany(query: object) {
		return await this.model.removeMany(query)
	}

	async findById(_id: string) {
		return await this.model.findById(_id)
	}

	async groupBy(query: object[], hideFields: any[] = []) {
		return await this.model.groupBy(query)
	}

	async insertMany(data: object[]) {
		return await this.model.insertMany(data)
	}

	async findOne(query: object, projection?: object) {
		return await this.model.findOne(query, projection)
	}

	async find(query: object) {
		return await this.model.find(query)
	}

	async findOneAndUpdate(query: object, data: object, options: object = {}) {
		return await this.model.findOneAndUpdate(query, data, options)
	}

	async dataCount(query?: object): Promise<number> {
		return await this.model.count(query)
	}

	async findAndCount(
		query: object = {},
		projection: object = {},
		limit: number = 15,
		skip: number = 0,
		sort: object = {}
	) {
		const count = await this.model.count(query)
		const documents = await this.model.find(query, projection, limit, sort, skip)

		return { count, documents }
	}

	async unsetField(_id: string, data?: object, options: object = {}) {
		return await this.model.unsetField(_id, data, options)
	}

	async push(query: object, arrayField: string, value: string) {
		return await this.model.push(query, arrayField, value)
	}

	async pull(query: object, arrayField: string, value: string) {
		return await this.model.pull(query, arrayField, value)
	}

	async updateMany(query: object, data: object) {
		return await this.model.updateMany(query, data)
	}

	async getDefault() {
		return await this.model.findOne({ default: true })
	}
}
