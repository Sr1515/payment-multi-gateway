import vine from '@vinejs/vine'

export const clientValidator = vine.create({
  name: vine.string(),
  email: vine.string(),
})
