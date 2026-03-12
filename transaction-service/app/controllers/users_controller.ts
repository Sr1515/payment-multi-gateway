import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { signupValidator } from '#validators/user'
import { uuidValidator } from '#validators/uuid'

export default class UserController {
  async index() {
    return await User.all()
  }

  async show({ params }: HttpContext) {
    const { id } = await uuidValidator.validate(params)
    return await User.findOrFail(id)
  }

  async update({ params, request }: HttpContext) {
    const { id } = await uuidValidator.validate(params)
    const user = await User.findOrFail(id)
    const data = await request.validateUsing(signupValidator)

    user.merge(data).save()
    return user
  }

  async destroy({ params, response }: HttpContext) {
    const { id } = await uuidValidator.validate(params)
    const user = await User.findOrFail(id)
    await user.delete()
    return response.noContent()
  }
}
