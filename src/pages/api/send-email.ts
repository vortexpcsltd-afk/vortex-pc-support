// For Pages Router (src/pages/api/send-email.ts)
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { to, subject, html } = req.body

    // Mock email service - replace with your actual email service
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const msg = {
      to,
      from: 'noreply@vortexpcs.com',
      subject,
      html,
    }
    
    await sgMail.send(msg)
    */

    console.log('📧 Email would be sent:', { to, subject })
    
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Email sending failed:', error)
    res.status(500).json({ message: 'Failed to send email' })
  }
}
