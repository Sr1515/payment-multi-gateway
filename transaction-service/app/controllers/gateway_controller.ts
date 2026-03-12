import type { HttpContext } from '@adonisjs/core/http'
import Gateway from '#models/gateway'
import { gatewayValidator, priorityGatewayValidator } from '#validators/gateway'
import { uuidValidator } from '#validators/uuid'

export default class GatewaysController {
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(gatewayValidator)
    const gateway = await Gateway.create(data)
    return response.created(gateway)
  }

  async activate({ params, response }: HttpContext) {
    const { id } = await uuidValidator.validate(params)
    const gateway = await Gateway.findOrFail(id)
    gateway.is_activate = true
    await gateway.save()

    return response.ok({ message: `Gateway ${gateway.name} activated` })
  }

  async deactivate({ params, response }: HttpContext) {
    const { id } = await uuidValidator.validate(params)
    const gateway = await Gateway.findOrFail(id)
    gateway.is_activate = false
    await gateway.save()

    return response.ok({ message: `Gateway ${gateway.name} deactivated` })
  }

  async changePriority({ params, request, response }: HttpContext) {
    const { priority } = await request.validateUsing(priorityGatewayValidator)
    const { id } = await uuidValidator.validate(params)

    const gateway = await Gateway.findOrFail(id)

    gateway.priority = priority
    await gateway.save()

    return response.ok({ message: `Gateway ${gateway.name} priority changed` })
  }
}
