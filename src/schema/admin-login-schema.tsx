import * as z from 'zod'

export const adminLoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})