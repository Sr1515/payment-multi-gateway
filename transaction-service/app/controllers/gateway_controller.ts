import type { HttpContext } from '@adonisjs/core/http'
import Gateway from '#models/gateway'
import vine from '@vinejs/vine'
import { gatewayValidator } from '#validators/gateway'

export default class GatewaysController {
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(gatewayValidator)
    const gateway = await Gateway.create(data)
    return response.created(gateway)
  }

  async activate({ params, response }: HttpContext) {
    const gateway = await Gateway.findOrFail(params.id)
    gateway.is_activate = true
    await gateway.save()

    return response.ok({ message: `Gateway ${gateway.name} activated` })
  }

  async deactivate({ params, response }: HttpContext) {
    const gateway = await Gateway.findOrFail(params.id)
    gateway.is_activate = false
    await gateway.save()

    return response.ok({ message: `Gateway ${gateway.name} deactivated` })
  }

  async changePriority({ params, request, response }: HttpContext) {
    const { priority } = await request.validateUsing(
      vine.create(vine.object({ priority: vine.number().min(1) }))
    )

    const gateway = await Gateway.findOrFail(params.id)
    gateway.priority = priority
    await gateway.save()

    return response.ok({ message: `Gateway ${gateway.name} priority changed` })
  }
}
