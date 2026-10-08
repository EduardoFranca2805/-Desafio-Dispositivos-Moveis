import './detalhe.css';
import caronas, { tarifaOnibus } from '../../dadosMockados/caronas.js';
import usuarios from '../../dadosMockados/usuarios.js';
import { turnos } from '../../dadosMockados/calendario.js';

function detalhe(app, parametros) {
  // find pelo id que veio da lista: #carona?id=3
  const id = Number(parametros.get('id'));
  const carona = caronas.find((item) => item.id === id);

  if (!carona) {
    app.innerHTML = `
      <section class="detalhe">
        <h1 class="detalhe__titulo">Essa carona não foi encontrada.</h1>
        <a class="botao" href="#resultados">Ver as caronas disponíveis</a>
      </section>`;
    return;
  }

  const motorista = usuarios.find((usuario) => usuario.id === carona.motoristaId);
  const turno = turnos.find((item) => item.id === carona.turno);
  const diferenca = tarifaOnibus - carona.valor;

  app.innerHTML = `
    <section class="detalhe">
      <a class="detalhe__voltar" href="#resultados"><i data-lucide="arrow-left"></i> Voltar para a lista</a>

      <h1 class="detalhe__titulo">${carona.origem} para ${carona.destino}</h1>

      <div class="viagem">
        <div class="viagem__parada">
          <span class="viagem__hora">${carona.saida}</span>
          <span class="viagem__lugar">
            <span class="viagem__nome">Saída de ${carona.origem}</span>
            <span class="texto-suave">${carona.ponto}</span>
          </span>
        </div>
        <div class="viagem__estrada"></div>
        <div class="viagem__parada">
          <span class="viagem__hora">${carona.chegada}</span>
          <span class="viagem__lugar">
            <span class="viagem__nome">Chegada em ${carona.destino}</span>
            <span class="texto-suave">${turno.descricao}</span>
          </span>
        </div>
      </div>

      <div class="decisao ${diferenca >= 0 ? 'decisao--compensa' : ''}">
        <span>Valor por vaga</span>
        <strong class="decisao__valor">R$ ${carona.valor.toFixed(2)}</strong>
        <span>
          ${
            diferenca >= 0
              ? `R$ ${diferenca.toFixed(2)} a menos que o ônibus`
              : `R$ ${(-diferenca).toFixed(2)} a mais que o ônibus`
          }
          (passagem: R$ ${tarifaOnibus.toFixed(2)})
        </span>
      </div>

      <ul class="fatos">
        <li class="fatos__item"><span class="fatos__rotulo">Dia</span><span class="fatos__valor">${carona.dia}</span></li>
        <li class="fatos__item"><span class="fatos__rotulo">Vagas</span><span class="fatos__valor">${carona.vagas}</span></li>
        <li class="fatos__item"><span class="fatos__rotulo">Turno</span><span class="fatos__valor">${turno.nome}</span></li>
      </ul>

      <div class="motorista">
        <span class="motorista__inicial">${motorista.nome[0]}</span>
        <span class="motorista__dados">
          <strong>${motorista.nome}</strong>
          <span class="texto-suave">${motorista.curso}</span>
          <span class="texto-suave">${motorista.carro}</span>
        </span>
      </div>
    </section>`;
}

export default {
  url: '#carona',
  label: '',
  icon: 'map-pin',
  pagina: detalhe,
};
