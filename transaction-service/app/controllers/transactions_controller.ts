import Transaction from '#models/transactions'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionController {
  async index() {
    return await Transaction.all()
  }

  async show({ params }: HttpContext) {
    return await Transaction.findOrFail(params.id)
  }
}
