import { emHorarioComercial } from '../../utils/horarioComercial.js';

export function definirFila(estado) {
  if (!emHorarioComercial()) {
    return {
      statusAtendimento: 'fila',
      motivo: 'fora_horario'
    };
  }

  if (estado === 'vendas') {
    return { statusAtendimento: 'fila', setor: 'vendas' };
  }

  if (estado === 'suporte') {
    return { statusAtendimento: 'fila', setor: 'suporte' };
  }

  if (estado === 'financeiro') {
    return { statusAtendimento: 'fila', setor: 'financeiro' };
  }

  return { statusAtendimento: 'auto' };
}
