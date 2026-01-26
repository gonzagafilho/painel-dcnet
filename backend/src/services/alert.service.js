import axios from 'axios'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function enviarAlerta(mensagem) {
  if (!BOT_TOKEN || !CHAT_ID) return

  try {
    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: mensagem,
        parse_mode: 'Markdown'
      }
    )
  } catch {
    // silêncio proposital (não derruba a API)
  }
}
