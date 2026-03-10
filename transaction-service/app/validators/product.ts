import vine from '@vinejs/vine'

export const createProductValidator = vine.create({
  name: vine.string().trim().maxLength(255),
  amount: vine.number().min(0),
})
