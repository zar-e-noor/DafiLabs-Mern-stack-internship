'use server'

import { prisma } from './prisma'
import { Resend } from 'resend' 

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(state: any, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string || null
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required.' }
  }
  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please provide a valid email address.' }
  }

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
        status: 'Pending',
      },
    })

    try {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: 'noorfatimasohail55@gmail.com', 
        subject: `🚨 New Contact Query: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      })
      console.log("✉️ Resend Email alert sent successfully!")
    } catch (emailError) {
      console.error("⚠️ Resend Email Error (Handled Safely):", emailError)
    }

    return { success: true, error: undefined }
  } catch (error) {
    console.error('Database insertion error:', error)
    return { success: false, error: 'Failed to send message.' }
  }
}