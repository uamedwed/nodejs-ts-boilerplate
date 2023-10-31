import { Router } from 'express'
import DocsRoutes from '../docs/docs.routes'
import UsersRoutes from './users/users.routes'

export class ApiRoutes {
	public _route: Router
	public routes: object

	constructor() {
		this._route = Router()
		this.routes = [UsersRoutes]
		this.initRoutes()
	}

	initRoutes() {
		DocsRoutes.init(this._route, this.routes)
		UsersRoutes.init(this._route)
		return this._route
	}
}
