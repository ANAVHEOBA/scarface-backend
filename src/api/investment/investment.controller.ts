import { NextResponse } from 'next/server'
import axios from 'axios'
import { createInvestment, updateInvestmentStatus } from './investment.crud'
import { PaymentSchema, PaystackWebhookSchema } from './investment.schema'
import { sendEPDownloadEmail, sendPaymentConfirmationEmail } from '@/lib/email'

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_URL = 'https://api.paystack.co'

export async function initiatePayment(req: Request) {
  try {
    const body = await req.json()
    const payment = PaymentSchema.parse(body)

    // Initialize Paystack payment
    const response = await axios.post(
      `${PAYSTACK_URL}/transaction/initialize`,
      {
        email: payment.email,
        amount: payment.amount * 100, // Paystack expects amount in kobo
        currency: payment.currency,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/payment/callback`,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    )

    // Save investment record
    await createInvestment({
      ...payment,
      reference: response.data.data.reference,
    })

    return NextResponse.json(response.data)

  } catch (error) {
    console.error('Payment initiation failed:', error)
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 })
  }
}

export async function handleWebhook(req: Request) {
    try {
      const body = await req.json()
      const webhook = PaystackWebhookSchema.parse(body)
  
      if (webhook.event === 'charge.success') {
        const investment = await updateInvestmentStatus(webhook.data.reference, 'success')
        
        // Send payment confirmation
        await sendPaymentConfirmationEmail(investment.email, {
          name: investment.email.split('@')[0], // Simple name extraction
          amount: `${investment.currency} ${investment.amount}`,
          reference: investment.reference
        })
  
        // Send EP download link
        await sendEPDownloadEmail(investment.email, {
          name: investment.email.split('@')[0],
          downloadLink: process.env.EP_DOWNLOAD_LINK!
        })
      }
  
      return NextResponse.json({ received: true })
    } catch (error) {
      console.error('Webhook processing failed:', error)
      return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
    }
  }