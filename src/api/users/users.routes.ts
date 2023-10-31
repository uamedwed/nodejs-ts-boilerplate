import { Router } from 'express'
import UsersController from './users.controller'
import UsersInterface from './users.interface'

export default class UsersRoutes {
	static swRoutes() {
		return {
			'/api/v1/users': {
				post: {
					tags: ['users'],
					requestBody: {
						content: {
							'application/json': { schema: { $ref: '#/components/schemas/CreateUser' } }
						}
					},
					responses: {
						'201': {
							description: 'Object with new user',
							content: {
								'application/json': { schema: { $ref: '#/components/schemas/CreateUser' } }
							}
						}
					}
				},
				get: {
					tags: ['users'],
					parameters: [
						{
							in: 'query',
							name: 'page',
							description: 'page of users'
						},
						{
							in: 'query',
							name: 'size',
							description: 'count of users'
						},
						{
							in: 'query',
							name: 'sort',
							description: 'sorting rule'
						}
					],
					responses: {
						'200': { description: 'Array with data of users' }
					}
				}
			},
			'/api/v1/users/{nickname}': {
				get: {
					tags: ['users'],
					parameters: [{ in: 'path', name: 'nickname', required: true, type: 'string' }],
					responses: {
						'200': { description: 'Object with user by user nickname' },
						'404': { description: 'User not found' },
						'403': { description: 'User is banned' }
					}
				},
				patch: {
					tags: ['users'],
					parameters: [{ in: 'path', name: 'nickname', required: true, type: 'string' }],
					requestBody: {
						content: {
							'application/json': { schema: { $ref: '#/components/schemas/UpdateUser' } }
						}
					},
					responses: {
						'200': { description: 'Object with user by user nickname' },
						'404': { description: 'User not found' },
						'403': { description: 'User is banned' }
					}
				},
				delete: {
					tags: ['users'],
					parameters: [{ in: 'path', name: 'nickname', required: true, type: 'string' }],
					requestBody: {
						content: {
							'application/json': { schema: { $ref: '#/components/schemas/UpdateUser' } }
						}
					},
					responses: {
						'200': { description: 'Object with user by user nickname' },
						'404': { description: 'User not found' },
						'403': { description: 'User is banned' }
					}
				}
			}
		}
	}

	static swSchemas() {
		const usersInterface = new UsersInterface()
		return {
			CreateUser: new UsersInterface().getSwInterface(usersInterface.getUserInterface()),
			UpdateUser: new UsersInterface().getSwInterface(usersInterface.getUserInterface())
		}
	}

	static init(_route: Router) {
		_route.post('/users', UsersController.createUser)
		_route.get('/users', UsersController.getUsers)
		_route.get('/users/:nickname', UsersController.getUserByNickname)
		_route.patch('/users/:nickname', UsersController.updateUserByNickname)
		_route.delete('/users/:nickname', UsersController.deleteUserProfile)
	}
}
