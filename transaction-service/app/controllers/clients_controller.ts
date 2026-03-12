import Client from '#models/client'
import { clientValidator } from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientController {
  async index() {
    return await Client.all()
  }

  async show({ params }: HttpContext) {
    const client = await Client.query()
      .where('id', params.id)
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
