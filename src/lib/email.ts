import nodemailer, { Transporter } from "nodemailer";

const mailTransporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface EPEmailParams {
  name: string;
  downloadLink: string;
}

interface PaymentEmailParams {
  name: string;
  amount: string;
  reference: string;
}

export const sendEPDownloadEmail = async (
  emailTo: string,
  emailParams: EPEmailParams
) => {
  const { name, downloadLink } = emailParams;

  const emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Your EP Download</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          color: #333;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background: #ff0000;
          color: #ffffff;
          text-align: center;
          padding: 20px;
          font-size: 24px;
          font-weight: bold;
        }
        .email-body {
          padding: 20px;
        }
        .download-button {
          display: inline-block;
          padding: 12px 24px;
          background: #ff0000;
          color: #ffffff;
          text-decoration: none;
          border-radius: 4px;
          margin: 20px 0;
        }
        .email-footer {
          background: #f1f1f1;
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          Your EP Download Is Ready
        </div>
        <div class="email-body">
          <p>Hello ${name},</p>
          <p>Thank you for your purchase! Your EP download is now ready.</p>
          <p>Click the button below to download your EP:</p>
          <a href="${downloadLink}" class="download-button">Download EP</a>
          <p>Note: This download link will expire in 24 hours for security purposes.</p>
          <p>Thank you for supporting our music!</p>
          <p>Best regards,<br>Scarface Republic</p>
        </div>
        <div class="email-footer">
          &copy; 2024 Scarface Republic. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const mailDetails = {
    from: process.env.EMAIL_USER,
    to: emailTo,
    subject: "Your EP Download Is Ready - Scarface Republic",
    html: emailContent,
  };

  try {
    const data = await mailTransporter.sendMail(mailDetails);
    return data;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export const sendPaymentConfirmationEmail = async (
  emailTo: string,
  emailParams: PaymentEmailParams
) => {
  const { name, amount, reference } = emailParams;

  const emailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Confirmation</title>
      <style>
        /* Same styles as above */
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          Payment Confirmation
        </div>
        <div class="email-body">
          <p>Hello ${name},</p>
          <p>We've received your payment of ${amount}.</p>
          <p>Transaction Reference: ${reference}</p>
          <p>Your EP download link will be sent in a separate email shortly.</p>
          <p>Thank you for your support!</p>
          <p>Best regards,<br>Scarface Republic</p>
        </div>
        <div class="email-footer">
          &copy; 2024 Scarface Republic. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;

  const mailDetails = {
    from: process.env.EMAIL_USER,
    to: emailTo,
    subject: "Payment Confirmation - Scarface Republic",
    html: emailContent,
  };

  try {
    const data = await mailTransporter.sendMail(mailDetails);
    return data;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};