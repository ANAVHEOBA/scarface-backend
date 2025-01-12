export interface Investment {
  id: string;
  email: string;
  amount: number;
  currency: 'NGN' | 'USD' | 'EUR';
  reference: string;
  status: 'pending' | 'success' | 'failed';
  paymentLink: string;
  epSent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentInitiation {
  email: string;
  amount: number;
  currency: 'NGN' | 'USD' | 'EUR';
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}