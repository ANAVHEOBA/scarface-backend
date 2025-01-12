import { z } from 'zod'

export const PaymentSchema = z.object({
  email: z.string().email(),
  amount: z.number().positive(),
  currency: z.enum(['NGN', 'USD', 'EUR']),
})

export const PaystackWebhookSchema = z.object({
  event: z.string(),
  data: z.object({
    reference: z.string(),
    status: z.string(),
    amount: z.number(),
    customer: z.object({
      email: z.string().email(),
    }),
  }),
})