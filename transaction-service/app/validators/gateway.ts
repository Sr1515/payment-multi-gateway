import vine from '@vinejs/vine'

export const gatewayValidator = vine.create({
  name: vine.string().trim().maxLength(255),
  is_activate: vine.boolean(),
  priority: vine.number().min(1),
})
