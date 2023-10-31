import BaseRestinterface from './base.restinterface'

export default class BaseController {
	static resStatuses(status?: string) {
		const statuses: any = {
			SuccessCreated: 201,
			Success: 200,
			BadRequestError: 400
		}
		return status ? statuses[status] : statuses
	}

	static resSuccess(data: any, res: any, status: number = BaseController.resStatuses().Success) {
		res.status(status).send(new BaseRestinterface(status, 'success', data).formatObject())
	}

	static resError(e: any, res: any, status?: number) {
		const code = status ?? e?.code ?? BaseController.resStatuses().BadRequestError
		const message = e.message ? e.message : e
		res.status(code).send(new BaseRestinterface(code, 'error', message).formatObject())
	}
}
