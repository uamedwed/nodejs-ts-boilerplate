import { Request, Response } from 'express'
import BaseController from '../../system/base/base.controller'
import UsersService from './users.service'
import { IJsObject } from '../../helpers/helpers.interface'

export default class UsersController {
	static async createUser(req: Request, res: Response) {
		try {
			const data = req.body
			const user = await UsersService.createNewUser(data)
			BaseController.resSuccess(user, res, BaseController.resStatuses().SuccessCreated)
		} catch (error) {
			BaseController.resError(error, res)
		}
	}

	static async getUserByNickname(req: IJsObject, res: Response) {
		try {
			const { nickname } = req.params as { nickname: string }
			const user = await UsersService.getUserByNickname(nickname)

			BaseController.resSuccess(user, res, BaseController.resStatuses().Success)
		} catch (error) {
			BaseController.resError(error, res)
		}
	}

	static async getUsers(req: IJsObject, res: Response) {
		try {
			const query: IJsObject = req.query
			const { page, size, count, users } = await UsersService.getUsers(query)
			res.setHeader('X-Page', page)
			res.setHeader('X-Size', size)
			res.setHeader('X-Total-Size', count)
			BaseController.resSuccess(users, res, BaseController.resStatuses().Success)
		} catch (error) {
			BaseController.resError(error, res)
		}
	}

	static async updateUserByNickname(req: Request, res: Response) {
		try {
			const { nickname } = req.params as { nickname: string }
			const data = req.body
			const updatedUser = await UsersService.updateUserByNickname(data, nickname)
			BaseController.resSuccess(updatedUser, res, BaseController.resStatuses().Success)
		} catch (error) {
			BaseController.resError(error, res)
		}
	}

	static async deleteUserProfile(req: IJsObject, res: Response) {
		try {
			const { nickname } = req.params as { nickname: string }
			const clearedUser = await UsersService.deleteUserByNickname(nickname)
			BaseController.resSuccess(clearedUser, res, BaseController.resStatuses().Success)
		} catch (error) {
			BaseController.resError(error, res)
		}
	}
}
