// @ts-ignore
import * as packageJson from '../../package.json'
import dotenv from 'dotenv'
const envFileName =
	process.env.NODE_ENV === 'production' ? '.env.test' : `.env.${process.env.NODE_ENV}`
dotenv.config({ path: envFileName })

export default class Config {
	public APP_NAME: string
	public APP_DESCRIPTION: string
	public APP_VERSION: string
	public APP_PORT: number
	public API_ENDPOINT: string

	public DATABASE_HOST: string
	public DATABASE_PORT: number
	public DATABASE_USER: string
	public DATABASE_PASSWORD: string
	public DATABASE_NAME: string

	constructor() {
		this.APP_NAME = packageJson.name
		this.APP_DESCRIPTION = packageJson.description
		this.APP_VERSION = packageJson.version
		this.APP_PORT = Number(process.env.APP_PORT) || 3000
		this.API_ENDPOINT = process.env.API_ENDPOINT || ''
		this.DATABASE_HOST = process.env.DATABASE_HOST || 'localhost'
		this.DATABASE_PORT = Number(process.env.DATABASE_PORT) || 27017
		this.DATABASE_USER = process.env.DATABASE_USER || ''
		this.DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || ''
		this.DATABASE_NAME = process.env.DATABASE_NAME || '_'
	}
}
