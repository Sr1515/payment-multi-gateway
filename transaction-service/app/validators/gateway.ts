import vine from '@vinejs/vine'

export const gatewayValidator = vine.create({
  name: vine.string().trim().maxLength(255),
  priority: vine.number().min(1),
})

export const priorityGatewayValidator = vine.create({
  priority: vine.number().min(1),
})
