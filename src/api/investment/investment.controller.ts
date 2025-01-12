import { Response, Request } from 'express'  // Use Express types instead of Next.js
import axios from 'axios'
import { createInvestment, updateInvestmentStatus } from './investment.crud'
import { PaymentSchema, PaystackWebhookSchema } from './investment.schema'
import { sendEPDownloadEmail, sendPaymentConfirmationEmail } from '../../lib/email'  // Update path

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_URL = 'https://api.paystack.co'

export async function initiatePayment(req: Request, res: Response) {  // Add Express Response
  try {
    const body = req.body  // Express body parsing
    const payment = PaymentSchema.parse(body)

    const response = await axios.post(
      `${PAYSTACK_URL}/transaction/initialize`,
      {
        email: payment.email,
        amount: payment.amount * 100,
        currency: payment.currency,
        callback_url: `${process.env.APP_URL}/payment/callback`,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    )

    await createInvestment({
      ...payment,
      reference: response.data.data.reference,
      paymentLink: response.data.data.authorization_url 
    })

     res.json(response.data)  // Express response

  } catch (error) {
    console.error('Payment initiation failed:', error)
    return res.status(500).json({ error: 'Payment initiation failed' })
  }
}

export async function handleWebhook(req: Request, res: Response) {
    try {
      const body = req.body
      const webhook = PaystackWebhookSchema.parse(body)
  
      if (webhook.event === 'charge.success') {
        const investment = await updateInvestmentStatus(webhook.data.reference, 'success')
        
        if (!investment) {
          throw new Error('Investment not found')
        }
        
        // Send payment confirmation
        await sendPaymentConfirmationEmail(investment.email, {
          name: investment.email.split('@')[0],
          amount: `${investment.currency} ${investment.amount}`,
          reference: investment.reference
        })
  
        // Send EP download link
        await sendEPDownloadEmail(investment.email, {
          name: investment.email.split('@')[0],
          downloadLink: process.env.EP_DOWNLOAD_LINK!
        })
      }
  
       res.json({ received: true })
    } catch (error) {
      console.error('Webhook processing failed:', error)
      return res.status(500).json({ error: 'Webhook processing failed' })
    }
}