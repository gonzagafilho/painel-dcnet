import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function enviarEmail({ assunto, texto, anexos }) {
  await transporter.sendMail({
    from: `"DC NET" <${process.env.EMAIL_USER}>`,
    to: 'dc.net.infinity@gmail.com',
    subject: assunto,
    text: texto,
    attachments: anexos
  })
}
