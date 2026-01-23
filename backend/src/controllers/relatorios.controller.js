import Atendimento from '../models/Atendimento.js'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { enviarEmail } from '../services/email.service.js'

/**
 * 📊 LISTAR RELATÓRIOS (GET /api/relatorios)
 */
async function listarRelatorios(req, res) {
  try {
    const { inicio, fim, status } = req.query
    
    const filtro = {}

    if (inicio && fim) {
      filtro.createdAt = {
        $gte: new Date(inicio),
        $lte: new Date(fim)
      }
    }

    if (status) {
      filtro.status = status
    }

    const atendimentos = await Atendimento
      .find(filtro)
      .sort({ createdAt: -1 })

    return res.json(atendimentos)
  } catch (error) {
    console.error('Erro relatório:', error)
    return res.status(500).json({ error: 'Erro ao gerar relatório' })
  }
}

/**
 * 📧 ENVIAR RELATÓRIO PDF POR E-MAIL (POST /api/relatorios/email)
 */
async function enviarRelatorioPorEmail(req, res) {
  try {
    const dados = req.body

    if (!dados || dados.length === 0) {
      return res.status(400).json({ error: 'Sem dados para enviar' })
    }

    // 🧾 GERAR PDF
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text('Relatório de Atendimentos - DC NET', 14, 15)

    doc.setFontSize(10)
    doc.text(`Gerado em: ${new Date().toLocaleString()}`, 14, 22)

    autoTable(doc, {
      startY: 28,
      head: [['Cliente', 'Status', 'Data']],
      body: dados.map(item => [
        item.cliente || '',
        item.status || '',
        new Date(item.createdAt).toLocaleDateString()
      ])
    })

    const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

    // 📤 ENVIAR E-MAIL
    await enviarEmail({
      assunto: 'Relatório de Atendimentos - DC NET',
      texto: 'Segue em anexo o relatório solicitado.',
      anexos: [
        {
          filename: 'relatorio.pdf',
          content: pdfBuffer
        }
      ]
    })

    return res.json({ success: true })
  } catch (error) {
    console.error('Erro ao enviar relatório por e-mail:', error)
    return res.status(500).json({ error: 'Erro ao enviar relatório por e-mail' })
  }
}

/**
 * 🔑 EXPORTS (OBRIGATÓRIO SER ASSIM)
 */
export {
  listarRelatorios,
  enviarRelatorioPorEmail
}
