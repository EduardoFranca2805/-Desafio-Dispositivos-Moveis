// Cada carona guarda o id de quem publicou (motoristaId).
// "Ida" sai do bairro e chega na Fatec; "volta" faz o caminho contrário.
export const FATEC = 'Fatec Mogi das Cruzes';

// Valor de referência da passagem de ônibus, usado para responder
// "compensa mais que o ônibus?". Número mockado, não é tarifa oficial.
export const tarifaOnibus = 5.5;

const caronas = [
  { id: 1, motoristaId: 1, origem: 'Braz Cubas', destino: FATEC, ponto: 'Estação Braz Cubas, saída da rua de baixo', dia: 'Segunda', saida: '06:50', chegada: '07:15', vagas: 3, valor: 4, turno: 'manha' },
  { id: 2, motoristaId: 1, origem: 'Braz Cubas', destino: FATEC, ponto: 'Estação Braz Cubas, saída da rua de baixo', dia: 'Quarta', saida: '06:50', chegada: '07:15', vagas: 2, valor: 4, turno: 'manha' },
  { id: 3, motoristaId: 1, origem: FATEC, destino: 'Braz Cubas', ponto: 'Portão principal da Fatec', dia: 'Segunda', saida: '12:10', chegada: '12:35', vagas: 3, valor: 4, turno: 'manha' },
  { id: 4, motoristaId: 2, origem: 'Suzano', destino: FATEC, ponto: 'Estação Suzano, lado do terminal', dia: 'Terça', saida: '18:10', chegada: '18:55', vagas: 3, valor: 6, turno: 'noite' },
  { id: 5, motoristaId: 2, origem: 'Suzano', destino: FATEC, ponto: 'Estação Suzano, lado do terminal', dia: 'Quinta', saida: '18:10', chegada: '18:55', vagas: 1, valor: 6, turno: 'noite' },
  { id: 6, motoristaId: 2, origem: FATEC, destino: 'Suzano', ponto: 'Estacionamento da Fatec', dia: 'Terça', saida: '22:45', chegada: '23:25', vagas: 3, valor: 6, turno: 'noite' },
  { id: 7, motoristaId: 3, origem: 'Jundiapeba', destino: FATEC, ponto: 'Praça de Jundiapeba, em frente à padaria', dia: 'Segunda', saida: '12:20', chegada: '12:55', vagas: 2, valor: 3.5, turno: 'tarde' },
  { id: 8, motoristaId: 3, origem: 'Jundiapeba', destino: FATEC, ponto: 'Praça de Jundiapeba, em frente à padaria', dia: 'Sexta', saida: '18:20', chegada: '18:55', vagas: 4, valor: 3.5, turno: 'noite' },
  { id: 9, motoristaId: 3, origem: FATEC, destino: 'Jundiapeba', ponto: 'Portão principal da Fatec', dia: 'Segunda', saida: '18:00', chegada: '18:35', vagas: 2, valor: 3.5, turno: 'tarde' },
  { id: 10, motoristaId: 4, origem: 'Biritiba Mirim', destino: FATEC, ponto: 'Praça da Matriz de Biritiba Mirim', dia: 'Terça', saida: '06:20', chegada: '07:10', vagas: 5, valor: 7, turno: 'manha' },
  { id: 11, motoristaId: 4, origem: 'Biritiba Mirim', destino: FATEC, ponto: 'Praça da Matriz de Biritiba Mirim', dia: 'Quinta', saida: '06:20', chegada: '07:10', vagas: 2, valor: 7, turno: 'manha' },
  { id: 12, motoristaId: 4, origem: FATEC, destino: 'Biritiba Mirim', ponto: 'Estacionamento da Fatec', dia: 'Terça', saida: '12:15', chegada: '13:05', vagas: 5, valor: 7, turno: 'manha' },
  { id: 13, motoristaId: 1, origem: 'César de Souza', destino: FATEC, ponto: 'Ponto de ônibus da avenida principal', dia: 'Sexta', saida: '06:40', chegada: '07:05', vagas: 1, valor: 3, turno: 'manha' },
  { id: 14, motoristaId: 2, origem: 'Centro de Mogi', destino: FATEC, ponto: 'Terminal central de ônibus', dia: 'Quarta', saida: '18:30', chegada: '18:50', vagas: 2, valor: 3, turno: 'noite' },
];

export default caronas;
