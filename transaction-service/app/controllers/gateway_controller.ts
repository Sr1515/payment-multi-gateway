import type { HttpContext } from '@adonisjs/core/http'
import Gateway from '#models/gateway'
import { gatewayValidator } from '#validators/gateway'
import vine from '@vinejs/vine'

export default class GatewaysController {
  async activate({ params, request, response }: HttpContext) {
    const gateway = await Gateway.findOrFail(params.id)
    const data = await request.validateUsing(gatewayValidator)

    gateway.merge({ ...data, is_activate: true }).save()
    return response.ok(gateway)
  }

  async deactivate({ params, response }: HttpContext) {
    const gateway = await Gateway.findOrFail(params.id)
    gateway.is_activate = false
    await gateway.save()

    return response.ok({ message: `Gateway ${gateway.name} desativado` })
  }

  async changePriority({ params, request, response }: HttpContext) {
    const { priority } = await request.validateUsing(
      vine.create(vine.object({ priority: vine.number().min(1) }))
    )

    const gateway = await Gateway.findOrFail(params.id)
    gateway.priority = priority
    await gateway.save()

    return response.ok(gateway)
  }
}
