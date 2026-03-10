import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import { createProductValidator } from '#validators/product'

export default class ProductsController {
  async index() {
    return await Product.all()
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createProductValidator)
    const product = await Product.create(data)
    return response.created(product)
  }

  async show({ params }: HttpContext) {
    return await Product.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const data = await request.validateUsing(createProductValidator)

    product.merge(data).save()
    return product
  }

  async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
    return response.noContent()
  }
}
