import Schema from 'mongoose'
import BaseInterface from '../../system/base/base.interface'

export default class UsersInterface extends BaseInterface {
	private readonly _schema: any
	private readonly userLinks = this.Rules.object().keys({
		name: this.Rules.string(),
		link: this.Rules.string()
	})

	constructor() {
		super()
		this._schema = this.Rules.object({
			name: this.Rules.string().optional(),
			nickname: this.Rules.string().optional()
		})
		this.init(this._schema)
	}

	getUserInterface() {
		return this.Rules.object({
			name: this.Rules.string().optional(),
			nickname: this.Rules.string().optional()
		})
	}

	getUserNicknameInterface() {
		return this.Rules.object({
			nickname: this.Rules.string().optional()
		})
	}
}
