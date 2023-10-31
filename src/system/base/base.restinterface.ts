export default class BaseRestinterface {
	private readonly _code: number
	private readonly _message: string | null
	private readonly _data: any

	constructor(code: number, message: string | null, data: any) {
		this._code = code
		this._message = message
		this._data = data
	}

	formatObject() {
		return {
			code: this._code,
			message: this._message,
			data: this._data
		}
	}

	formatBasic() {
		return this._data
	}
}
