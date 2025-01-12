export const config = {
    mongodb: {
      uri: process.env.MONGODB_URI!
    },
    paystack: {
      secretKey: process.env.PAYSTACK_SECRET_KEY!,
      publicKey: process.env.PAYSTACK_PUBLIC_KEY!
    },
    email: {
      from: process.env.EMAIL_FROM!
    },
    ep: {
      downloadLink: process.env.EP_DOWNLOAD_LINK!
    }
  }