import swaggerJSDoc from 'swagger-jsdoc'
import BaseClass from '../system/base/base.class'

export default class SwaggerDefinition extends BaseClass {
	public options: object = {}
	private _routes: any = {}
	private _schemas: any = {}

	constructor(routes: any) {
		super()
		routes.forEach((item: any) => {
			Object.assign(this._routes, item.swRoutes())
			Object.assign(this._schemas, item.swSchemas())
		})
	}

	setSwaggerJSDoc() {
		this.options = {
			definition: {
				openapi: '3.0.1',
				info: {
					title: this.config.APP_NAME,
					version: this.config.APP_VERSION,
					description: this.config.APP_DESCRIPTION,
					license: {
						name: 'ISC'
					}
				},
				paths: {
					...this._routes
				},
				components: {
					schemas: {
						...this._schemas
					},
					securitySchemes: {
						bearerAuth: {
							type: 'http',
							scheme: 'bearer',
							bearerFormat: 'JWT'
						},
						apiKeyAuth: {
							type: 'apiKey',
							in: 'header',
							name: 'X-API-Key'
						}
					}
				},
				security: {
					apiKey: []
				}
			},
			apis: ['dist/api/**/*.js', 'src/api/**/*.ts']
		}
		return swaggerJSDoc(this.options)
	}
}
