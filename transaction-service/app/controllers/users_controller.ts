import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { signupValidator } from '#validators/user'

export default class UserController {
  async index() {
    return await User.all()
  }

  async show({ params }: HttpContext) {
    return await User.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = await request.validateUsing(signupValidator)

    user.merge(data).save()
    return user
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.noContent()
  }
}
