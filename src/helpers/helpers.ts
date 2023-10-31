import Config from '../system/config'
import { IJsObject } from './helpers.interface'

export default class Helpers {
	private static config = new Config()
	static pagination = (data: IJsObject): { size: number; skip: number; page: number } => {
		const page: number = +(data.page ?? 0)
		const size: number = Math.abs(+(data.size ?? 15))
		const skip = page * size
		return { size, skip, page }
	}

	static sortingRule = (sort: string) => {
		const sortArray = sort.split(',')
		const sortRule: IJsObject = {}
		for (let i = 0; i < sortArray.length; i += 2) {
			sortRule[sortArray[i]] = sortArray[i + 1] === 'desc' ? -1 : 1
		}
		return sortRule
	}
}
