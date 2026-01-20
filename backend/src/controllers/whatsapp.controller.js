import { getDb } from '../database/mongoNative.js'

export default {
  // Verificação do webhook (GET)
  verify(req, res) {
    const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN

    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Webhook WhatsApp verificado')
      return res.status(200).send(challenge)
    }

    return res.sendStatus(403)
  },

  // Recebimento de mensagens (POST)
  async receive(req, res) {
    try {
      const db = await getDb()

      const entry = req.body.entry?.[0]
      const change = entry?.changes?.[0]
      const value = change?.value
      const message = value?.messages?.[0]

      if (!message) {
        return res.sendStatus(200)
      }

      const from = message.from
      const text = message.text?.body || ''

      await db.collection('atendimentos').insertOne({
        cliente: from,
        canal: 'whatsapp',
        status: 'aberto',
        mensagemInicial: text,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      console.log('📩 Mensagem WhatsApp recebida:', from, text)
      return res.sendStatus(200)
    } catch (error) {
      console.error('Erro webhook WhatsApp (native):', error)
      return res.sendStatus(500)
    }
  }
}

