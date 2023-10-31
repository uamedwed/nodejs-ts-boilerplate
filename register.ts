import { register } from 'ts-node'

register({
	files: true,
	transpileOnly: true,
	project: './tsconfig.json'
})
