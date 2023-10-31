import Server from './server'
import BaseClass from './base/base.class'
import Database from './database'

export default class App extends BaseClass {
	public readonly _name: string
	private _server: object
	private _database: object

	constructor() {
		super()
		this._name = this.config.APP_NAME
	}

	async init() {
		this._server = new Server(this._name, this.config.APP_PORT, this.config.API_ENDPOINT)

		this._database = new Database(
			this.config.DATABASE_HOST,
			this.config.DATABASE_PORT,
			this.config.DATABASE_USER,
			this.config.DATABASE_PASSWORD,
			this.config.DATABASE_NAME
		)
		return this._server
	}
}
