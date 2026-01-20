import ChatState from '../../models/ChatState.js';
import { getMenuInicial, getPlanos } from './flow.service.js';
import { definirFila } from './queue.service.js';

export async function processarMensagem(telefone, mensagem) {
  let state = await ChatState.findOne({ telefone });

  // PRIMEIRO CONTATO
  if (!state) {
    state = await ChatState.create({
      telefone,
      estado: 'menu'
    });
    return getMenuInicial();
  }

  state.ultimaMensagem = mensagem;
  state.updatedAt = new Date();

  // =========================
  // MENU PRINCIPAL
  // =========================
  if (state.estado === 'menu') {
    if (mensagem === '1') {
      state.estado = 'vendas';
      state.setor = 'vendas';
      await state.save();
      return getPlanos();
    }

    if (mensagem === '2') {
      state.estado = 'suporte';
      state.setor = 'suporte';
      await state.save();
      return '🛠️ Suporte técnico selecionado. Aguarde atendimento.';
    }

    if (mensagem === '3') {
      state.estado = 'financeiro';
      state.setor = 'financeiro';
      await state.save();
      return '💰 Financeiro selecionado. Aguarde atendimento.';
    }

    if (mensagem === '4') {
      // Vai para fila conforme horário
      const fila = definirFila('humano');

      state.statusAtendimento = fila.statusAtendimento;
      state.setor = fila.setor || null;

      await state.save();
      return '👨‍💼 Encaminhando para um atendente.';
    }

    return getMenuInicial();
  }

  // =========================
  // FORA DO MENU (JÁ ESCOLHEU SETOR)
  // =========================
  const fila = definirFila(state.estado);

  state.statusAtendimento = fila.statusAtendimento;
  state.setor = fila.setor || state.setor;

  await state.save();

  return `📌 Atendimento registrado na fila: ${state.setor || 'automático'}`;
}
