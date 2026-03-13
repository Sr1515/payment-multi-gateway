import vine from '@vinejs/vine'

export const createProductValidator = vine.create({
  name: vine.string().trim().maxLength(255),
  amount: vine.number().min(0),
})

export const updateProductValidator = vine.create({
  name: vine.string().trim().maxLength(255).optional(),
  amount: vine.number().min(0).optional(),
})
