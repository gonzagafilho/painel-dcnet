import ChatState from '../../models/ChatState.js';
import { getMenuInicial, getPlanos } from './flow.service.js';

export async function processarMensagem(telefone, mensagem) {
  let state = await ChatState.findOne({ telefone });

  if (!state) {
    state = await ChatState.create({ telefone });
    return getMenuInicial();
  }

  state.ultimaMensagem = mensagem;
  state.updatedAt = new Date();

  // MENU PRINCIPAL
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
      return '👨‍💼 Encaminhando para um atendente (horário comercial).';
    }

    return getMenuInicial();
  }

  await state.save();
  return '✅ Mensagem registrada.';
}
