import Client from '#models/client'
import { clientValidator } from '#validators/client'
import { uuidValidator } from '#validators/uuid'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientController {
  async index() {
    return await Client.all()
  }

  async show({ params }: HttpContext) {
    const { id } = await uuidValidator.validate(params)
    const client = await Client.query()
      .where('id', id)
      .preload('transactions', (transactionQuery) => {
        transactionQuery.preload('products', (productQuery) => {
          productQuery.pivotColumns(['quantity'])
        })
      })
      .firstOrFail()

    return client
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(clientValidator)
    const client = await Client.create(data)
    return response.created(client)
  }
}
