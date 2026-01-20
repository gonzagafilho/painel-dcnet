// import { enviarMensagemWhatsApp } from '../services/whatsapp.service.js'
import { emHorarioComercial } from '../utils/horarioComercial.js'
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

      // Salva atendimento
      await db.collection('atendimentos').insertOne({
        cliente: from,
        canal: 'whatsapp',
        status: 'aberto',
        mensagemInicial: text,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      // Define mensagem automática
      const resposta = emHorarioComercial()
        ? `Olá 👋 Bem-vindo à DC NET!

Recebemos sua mensagem e seu atendimento foi registrado com sucesso.
Em breve um de nossos atendentes irá responder.

📡 DC NET — Conectando você ao mundo.`
        : `Olá 👋 Bem-vindo à DC NET!

Recebemos sua mensagem fora do horário comercial.
Nosso atendimento funciona de segunda a sexta, das 8h às 18h.
Retornaremos assim que possível.

📡 DC NET — Conectando você ao mundo.`

      // Envia resposta automática
      await enviarMensagemWhatsApp(from, resposta)

      console.log('📩 Mensagem WhatsApp recebida e respondida:', from)
      return res.sendStatus(200)
    } catch (error) {
      console.error('Erro webhook WhatsApp (native):', error)
      return res.sendStatus(500)
    }
  }
}
