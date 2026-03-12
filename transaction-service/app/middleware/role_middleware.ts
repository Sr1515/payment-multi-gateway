import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, args: { roles: string[] }) {
    const { auth, response } = ctx
    const user = auth.user

    if (!user) {
      return response.unauthorized({ message: 'Unauthenticated user' })
    }

    if (!args.roles.includes(user.role)) {
      return response.forbidden({ message: 'You are not allowed.' })
    }

    return await next()
  }
}
