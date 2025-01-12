import mongoose from 'mongoose'
import type { Investment, PaymentInitiation } from './investment.model'

const InvestmentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { 
    type: String, 
    enum: ['NGN', 'USD', 'EUR'],
    required: true 
  },
  reference: { 
    type: String, 
    unique: true, 
    required: true 
  },
  paymentLink: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'success', 'failed'],
    default: 'pending' 
  },
  epSent: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
})

const InvestmentModel = mongoose.model('Investment', InvestmentSchema)

export async function createInvestment(
  data: PaymentInitiation & { 
    reference: string, 
    paymentLink: string 
  }
): Promise<Investment> {
  const investment = new InvestmentModel({
    ...data,
    status: 'pending',
    epSent: false
  })
  
  const savedInvestment = await investment.save()
  return {
    id: savedInvestment._id.toString(),
    email: savedInvestment.email,
    amount: savedInvestment.amount,
    currency: savedInvestment.currency as 'NGN' | 'USD' | 'EUR',
    reference: savedInvestment.reference,
    status: savedInvestment.status as 'pending' | 'success' | 'failed',
    paymentLink: savedInvestment.paymentLink,
    epSent: savedInvestment.epSent,
    createdAt: savedInvestment.createdAt,
    updatedAt: savedInvestment.updatedAt
  }
}

export async function updateInvestmentStatus(
  reference: string, 
  status: 'success' | 'failed'
): Promise<Investment | null> {
  const updatedInvestment = await InvestmentModel.findOneAndUpdate(
    { reference },
    { 
      status,
      epSent: status === 'success',
      updatedAt: new Date()
    },
    { new: true }
  )

  if (!updatedInvestment) return null

  return {
    id: updatedInvestment._id.toString(),
    email: updatedInvestment.email,
    amount: updatedInvestment.amount,
    currency: updatedInvestment.currency as 'NGN' | 'USD' | 'EUR',
    reference: updatedInvestment.reference,
    status: updatedInvestment.status as 'pending' | 'success' | 'failed',
    paymentLink: updatedInvestment.paymentLink,
    epSent: updatedInvestment.epSent,
    createdAt: updatedInvestment.createdAt,
    updatedAt: updatedInvestment.updatedAt
  }
}

export async function getInvestmentByReference(reference: string): Promise<Investment | null> {
  const investment = await InvestmentModel.findOne({ reference }).lean()
  
  if (!investment) return null

  return {
    id: investment._id.toString(),
    email: investment.email,
    amount: investment.amount,
    currency: investment.currency as 'NGN' | 'USD' | 'EUR',
    reference: investment.reference,
    status: investment.status as 'pending' | 'success' | 'failed',
    paymentLink: investment.paymentLink,
    epSent: investment.epSent,
    createdAt: investment.createdAt,
    updatedAt: investment.updatedAt
  }
}