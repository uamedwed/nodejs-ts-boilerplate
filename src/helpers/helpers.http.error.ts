export default class HelpersHttpError {
	message: string
	code: number

	constructor(code?: number, message?: string) {
		this.code = code ?? 400
		this.message = message ?? 'Bad Request'
	}

	static BadRequest(message?: string) {
		return new HelpersHttpError(400, message ?? 'BadRequest')
	}
	static Unauthorized(message?: string) {
		return new HelpersHttpError(401, message ?? 'Unauthorized')
	}
	static Forbidden(message?: string) {
		return new HelpersHttpError(403, message ?? 'Forbidden')
	}
	static NotFound(message?: string) {
		return new HelpersHttpError(404, message ?? 'NotFound')
	}
	static Conflict(message?: string) {
		return new HelpersHttpError(409, message ?? 'Conflict')
	}
	static InternalServerError(message?: string) {
		return new HelpersHttpError(500, message ?? 'InternalServerError')
	}
}
