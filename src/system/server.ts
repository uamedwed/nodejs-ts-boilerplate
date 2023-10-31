import bodyParser from 'body-parser'
import compression from 'compression'
import express, { NextFunction, Request, Response } from 'express'
import { ApiRoutes } from '../api/api.routes'
import Config from './config'

export default class Server {
	public config: Config = new Config()
	public app: express.Application
	public name: string
	public port: number
	public apiEndpoint: string

	constructor(name: string, port: number, apiEndpoint: string) {
		this.app = express()
		this.name = name
		this.port = port
		this.apiEndpoint = apiEndpoint
		this.setConfig()
		this.setRoutes()
		this.init()
	}

	private setConfig() {
		this.app.use(compression())
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: true }))
		this.app.set('port', this.port)
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.set('Cache-Control', 'public, max-age=0')
			next()
		})
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.setHeader('Access-Control-Allow-Origin', '*')
			res.setHeader('Access-Control-Allow-Credentials', 'true')
			res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
			res.setHeader(
				'Access-Control-Allow-Headers',
				'Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
			)
			res.setHeader('Access-Control-Expose-Headers', 'X-Page,X-Size,X-Total-Size,X-API-Key')
			next()
		})
	}

	private setRoutes() {
		this.app.use(this.apiEndpoint, new ApiRoutes().initRoutes())
		this.app.get('/', (req: Request, res: Response) => {
			res.send(this.name)
		})
	}

	private init() {
		this.app.listen(this.port, () => {
			return console.log(this.name + ' is listening on ' + this.port)
		})
	}
}
