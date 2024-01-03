import * as z from 'zod'

export const emailSubscriptionSchema = z.object({
    email: z.string().email()
})