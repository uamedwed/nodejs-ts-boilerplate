import mongoose from 'mongoose'

export default class Database {
	public host: string
	public port: number
	private readonly _user: string
	private readonly _password: string
	public database: string

	constructor(host: string, port: number, user: string, password: string, database: string) {
		this.host = host
		this.port = port
		this._user = user
		this._password = password
		this.database = database
		this.connect()
	}

	connect() {
		let userData = ''
		if (this._user && this._password) {
			userData = `${this._user}:${this._password}@`
		}
		mongoose.connect(
			`mongodb://${userData}${this.host}:${this.port}/${this.database}?authSource=admin`
		)
	}
}
