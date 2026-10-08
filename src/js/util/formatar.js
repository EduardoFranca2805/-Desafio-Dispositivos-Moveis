export function normalizar(texto = '') {
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function escapar(texto = '') {
  const trocas = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(texto).replace(/[&<>"']/g, (c) => trocas[c]);
}

export function formatarValor(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function compararComOnibus(valor, tarifa) {
  const diferenca = tarifa - valor;
  if (diferenca > 0) {
    return { compensa: true, texto: `${formatarValor(diferenca)} a menos que o ônibus` };
  }
  if (diferenca === 0) {
    return { compensa: true, texto: 'Mesmo valor do ônibus' };
  }
  return { compensa: false, texto: `${formatarValor(-diferenca)} a mais que o ônibus` };
}

export function textoVagas(vagas) {
  return vagas === 1 ? '1 vaga' : `${vagas} vagas`;
}
