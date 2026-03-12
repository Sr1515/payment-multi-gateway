import vine from '@vinejs/vine'

export const uuidValidator = vine.create({
  id: vine.string().uuid(),
})
