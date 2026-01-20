import axios from 'axios'

export async function enviarMensagemWhatsApp(para, texto) {
  const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`

  await axios.post(
    url,
    {
      messaging_product: 'whatsapp',
      to: para,
      type: 'text',
      text: { body: texto }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  )
}
