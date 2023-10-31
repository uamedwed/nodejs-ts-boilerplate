import BaseService from '../../system/base/base.service'
import UsersModel from './users.model'
import { IJsObject } from '../../helpers/helpers.interface'
import HelpersHttpError from '../../helpers/helpers.http.error'
import Helpers from '../../helpers/helpers'
import UsersInterface from './users.interface'
import Config from '../../system/config'

export default class UsersService {
	private static config = new Config()
	public static Model = new BaseService(new UsersModel())
	public static Interface = new UsersInterface()

	static async createNewUser(data: IJsObject) {
		const validatedData = await UsersService.Model.validate(
			data,
			UsersService.Interface.getInterface()
		)
		const isUserExists = await UsersService.Model.dataExists({
			nickname: validatedData.nickname
		})
		if (isUserExists) throw HelpersHttpError.Conflict('Nickname already exists')

		return await UsersService.Model.insertData(validatedData)
	}

	static async getUserByNickname(reqNickname: string) {
		const { nickname } = await UsersService.Model.validate(
			{ nickname: reqNickname },
			UsersService.Interface.getUserNicknameInterface()
		)
		const user = await UsersService.Model.findOne({ nickname })
		if (!user) throw HelpersHttpError.NotFound('User is not exists')

		return user
	}

	static async getUsers(query: IJsObject) {
		const { page, size, skip } = Helpers.pagination(query)
		const sortRule: IJsObject = Helpers.sortingRule(query.sort ?? 'createdAt,desc')
		const count = await UsersService.Model.dataCount({})
		const users = await UsersService.Model.groupBy(
			[{ $sort: sortRule }, { $skip: skip }, { $limit: size }],
			['_id', '__v', 'updatedAt']
		)
		return { page, size, count: count ?? 0, users }
	}

	static async updateUserByNickname(data: IJsObject, reqNickname: string) {
		const { nickname } = await UsersService.Model.validate(
			{ nickname: reqNickname },
			UsersService.Interface.getUserNicknameInterface()
		)

		const validatedData = await UsersService.Model.validate(
			data,
			UsersService.Interface.getInterface()
		)
		const user = await UsersService.Model.findOne({ nickname })
		if (!user) throw HelpersHttpError.NotFound('User is not exists')

		return await UsersService.Model.updateData(user._id, validatedData, { new: true })
	}

	static async deleteUserByNickname(nickname: string) {
		const validatedData = await UsersService.Model.validate(
			{ nickname },
			UsersService.Interface.getInterface()
		)
		const user = await UsersService.Model.findOne({ nickname: validatedData.nickname })
		if (!user) throw HelpersHttpError.NotFound('User is not exists')

		return await UsersService.Model.deleteData(user._id)
	}
}
