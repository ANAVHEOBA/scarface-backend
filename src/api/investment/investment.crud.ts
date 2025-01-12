import mongoose from 'mongoose'
import type { Investment, PaymentInitiation } from './investment.model'

// Define Schema
const InvestmentSchema = new mongoose.Schema({
  email: String,
  amount: Number,
  currency: String,
  reference: { type: String, unique: true },
  status: { type: String, default: 'pending' },
  epSent: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

// Create Model
const InvestmentModel = mongoose.model('Investment', InvestmentSchema)

export async function createInvestment(data: PaymentInitiation & { reference: string }): Promise<Investment> {
  const investment = new InvestmentModel({
    ...data,
    status: 'pending',
    epSent: false
  })
  
  return investment.save()
}

export async function updateInvestmentStatus(reference: string, status: 'success' | 'failed'): Promise<Investment | null> {
  return InvestmentModel.findOneAndUpdate(
    { reference },
    { 
      status,
      epSent: status === 'success',
      updatedAt: new Date()
    },
    { new: true }
  )
}

export async function getInvestmentByReference(reference: string): Promise<Investment | null> {
  return InvestmentModel.findOne({ reference }).lean()
}