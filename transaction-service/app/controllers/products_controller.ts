import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import { createProductValidator } from '#validators/product'
import { uuidValidator } from '#validators/uuid'

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
    const { id } = await uuidValidator.validate(params)
    return await Product.findOrFail(id)
  }

  async update({ params, request }: HttpContext) {
    const { id } = await uuidValidator.validate(params)
    const product = await Product.findOrFail(id)
    const data = await request.validateUsing(createProductValidator)

    product.merge(data).save()
    return product
  }

  async destroy({ params, response }: HttpContext) {
    const { id } = await uuidValidator.validate(params)
    const product = await Product.findOrFail(id)
    await product.delete()
    return response.noContent()
  }
}
