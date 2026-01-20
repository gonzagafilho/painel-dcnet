export function emHorarioComercial() {
  const agora = new Date()
  const hora = agora.getHours()
  const dia = agora.getDay()

  // Segunda a sexta, 08h–18h
  return dia >= 1 && dia <= 5 && hora >= 8 && hora < 18
}
