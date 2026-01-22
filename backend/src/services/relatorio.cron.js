import cron from 'node-cron'
import Atendimento from '../models/Atendimento.js'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { enviarEmail } from './email.service.js'

export function iniciarRelatorioAutomatico() {
  // ⏰ TODO DIA ÀS 08:00
  cron.schedule('0 8 * * * *', async () => {
    try {
      console.log('⏰ Gerando relatório automático...')

      const inicio = new Date()
      inicio.setHours(0, 0, 0, 0)

      const fim = new Date()
      fim.setHours(23, 59, 59, 999)

      const dados = await Atendimento.find({
        createdAt: { $gte: inicio, $lte: fim }
      }).sort({ createdAt: -1 })

      if (!dados.length) {
        console.log('📭 Nenhum dado para relatório hoje')
        return
      }

      const doc = new jsPDF()

      doc.setFontSize(16)
      doc.text('Relatório Diário de Atendimentos - DC NET', 14, 15)

      doc.setFontSize(10)
      doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, 22)

      autoTable(doc, {
        startY: 28,
        head: [['Cliente', 'Status', 'Data']],
        body: dados.map(item => [
          item.cliente || '',
          item.status,
          new Date(item.createdAt).toLocaleString()
        ])
      })

      const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

      await enviarEmail({
        assunto: 'Relatório Diário - DC NET',
        texto: 'Segue o relatório automático diário.',
        anexos: [
          {
            filename: 'relatorio-diario.pdf',
            content: pdfBuffer
          }
        ]
      })

      console.log('✅ Relatório diário enviado por e-mail')
    } catch (error) {
      console.error('❌ Erro no relatório automático:', error)
    }
  })
}
