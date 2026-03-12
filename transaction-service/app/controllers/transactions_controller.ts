import type { HttpContext } from '@adonisjs/core/http'
import { GatewayFactory } from '../utils/gateways_factory.ts'
import Product from '#models/product'
import Transaction from '#models/transaction'
import Client from '#models/client'
export default class TransactionController {
  async index() {
    return await Transaction.all()
  }

  async show({ params }: HttpContext) {
    return await Transaction.findOrFail(params.id)
  }

  async store({ request, response }: HttpContext) {
    const { clientId, products, cardNumber, cvv } = request.only([
      'clientId',
      'products',
      'cardNumber',
      'cvv',
    ])

    const client = await Client.findOrFail(clientId)
    const cardLastNumbers = cardNumber.slice(-4)

    let total = 0
    const pivotData: Record<string, { quantity: number }> = {}

    for (const item of products) {
      const product = await Product.findOrFail(item.id)
      total += Number(product.amount) * item.quantity

      pivotData[item.id] = { quantity: item.quantity }
    }

    const gateways = await GatewayFactory.getGateways()

    for (const gatewayItem of gateways) {
      const { instance: gateway, config } = gatewayItem

      try {
        const result = await gateway.processPayment({
          amount: total,
          name: client.name,
          email: client.email,
          cardNumber,
          cvv,
        })

        const transaction = await Transaction.create({
          clientId: client.id,
          gatewayId: config.id,
          externalId: String(result.id),
          amount: total,
          status: 'approved',
          cardLastNumbers: cardLastNumbers,
        })

        await transaction.related('products').attach(pivotData)
        return response.created(transaction)
      } catch (error) {
        console.error(`Gateway ${config.name} falhou:`, error.message)
      }
    }

    const failedTransaction = await Transaction.create({
      clientId: client.id,
      amount: total,
      status: 'refunded',
      cardLastNumbers: cardLastNumbers,
    })

    await failedTransaction.related('products').attach(pivotData)

    return response.badRequest({ message: 'Todos os gateways falharam' })
  }
}
