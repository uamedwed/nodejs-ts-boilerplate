import BaseModel from '../../system/base/base.model'
import UsersInterface from './users.interface'

export default class UsersModel extends BaseModel {
	constructor() {
		super('users', { ...new UsersInterface().getMongoDbInterface() }, { timestamps: true }, [
			{ address: -1 }
		])
	}
}
