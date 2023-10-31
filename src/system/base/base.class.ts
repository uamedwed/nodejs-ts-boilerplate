import Config from '../config'

export default class BaseClass {
	public config: Config
	constructor() {
		this.config = new Config()
	}
}
