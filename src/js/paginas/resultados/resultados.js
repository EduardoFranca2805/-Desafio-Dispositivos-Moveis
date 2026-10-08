import './resultados.css';
import caronas, { tarifaOnibus } from '../../dadosMockados/caronas.js';
import { turnos } from '../../dadosMockados/calendario.js';

function resultados(app, parametros) {
  const termo = parametros.get('q') || '';
  const turno = parametros.get('turno') || '';

  app.innerHTML = `
    <section class="resultados">
      <h1 class="resultados__titulo">Caronas para quem estuda na Fatec</h1>

      <div class="resultados__controles">
        <label class="campo">
          <span class="campo__rotulo">Saindo de ou indo para</span>
          <input class="campo__entrada" id="filtro-texto" type="text" value="${termo}" placeholder="Bairro, cidade ou ponto" />
        </label>

        <div class="resultados__chips">
          <button class="chip ${turno === '' ? 'chip--ativo' : ''}" type="button" data-turno="">Todos os turnos</button>
          ${turnos
            .map((item) => {
              return `<button class="chip ${turno === item.id ? 'chip--ativo' : ''}" type="button" data-turno="${item.id}">${item.nome}</button>`;
            })
            .join('')}
        </div>

        <label class="campo resultados__ordem">
          <span class="campo__rotulo">Ordenar por</span>
          <select class="campo__entrada" id="filtro-ordem">
            <option value="saida">Saída mais cedo</option>
            <option value="valor">Menor valor</option>
          </select>
        </label>
      </div>

      <div class="resultados__lista" id="lista"></div>
    </section>`;

  mostrarLista(termo, turno, 'saida');
  adicionarEvento(turno);
}

function mostrarLista(termo, turno, ordem) {
  const lista = document.getElementById('lista');

  // filter: o texto digitado e o turno escolhido valem juntos
  const encontradas = caronas.filter((carona) => {
    const textoDaCarona = `${carona.origem} ${carona.destino} ${carona.ponto}`.toLowerCase();
    return textoDaCarona.includes(termo.toLowerCase()) && (turno === '' || carona.turno === turno);
  });

  if (ordem === 'valor') {
    encontradas.sort((a, b) => a.valor - b.valor);
  } else {
    encontradas.sort((a, b) => a.saida.localeCompare(b.saida));
  }

  if (encontradas.length === 0) {
    lista.innerHTML = `
      <div class="vazio">
        <h2 class="vazio__titulo">Nenhuma carona encontrada${termo ? ` para "${termo}"` : ''}.</h2>
        <p class="texto-suave">Tente só o nome do bairro ou da cidade, ou troque o turno.</p>
        <div class="vazio__acoes">
          <a class="botao" href="#resultados">Ver todas as caronas</a>
          <a class="botao" href="#publicar">Tenho carro, quero oferecer</a>
        </div>
      </div>`;
    return;
  }

  lista.innerHTML = encontradas
    .map((carona) => {
      return `<a class="cartao" href="#carona?id=${carona.id}">
                <div class="cartao__trajeto">
                  <span class="cartao__hora">${carona.saida}</span>
                  <span class="cartao__estrada"></span>
                  <span class="cartao__hora">${carona.chegada}</span>
                </div>
                <div class="cartao__locais">
                  <span>${carona.origem}</span>
                  <span>${carona.destino}</span>
                </div>
                <div class="cartao__rodape">
                  <span>${carona.dia}, vagas: ${carona.vagas}</span>
                  <span class="cartao__valor">R$ ${carona.valor.toFixed(2)}</span>
                  ${
                    carona.valor <= tarifaOnibus
                      ? '<span class="selo selo--compensa">Mais barato que o ônibus</span>'
                      : '<span class="selo selo--caro">Mais caro que o ônibus</span>'
                  }
                </div>
              </a>`;
    })
    .join('');
}

function adicionarEvento(turnoInicial) {
  const campoTexto = document.getElementById('filtro-texto');
  const campoOrdem = document.getElementById('filtro-ordem');
  const chips = document.querySelectorAll('.chip');
  let turnoEscolhido = turnoInicial;

  // a lista é redesenhada sem recarregar a tela
  campoTexto.addEventListener('input', () => {
    mostrarLista(campoTexto.value, turnoEscolhido, campoOrdem.value);
  });

  campoOrdem.addEventListener('change', () => {
    mostrarLista(campoTexto.value, turnoEscolhido, campoOrdem.value);
  });

  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      turnoEscolhido = chip.dataset.turno;
      chips.forEach((item) => item.classList.remove('chip--ativo'));
      chip.classList.add('chip--ativo');
      mostrarLista(campoTexto.value, turnoEscolhido, campoOrdem.value);
    }),
  );
}

export default {
  url: '#resultados',
  label: 'Caronas',
  icon: 'car',
  pagina: resultados,
};
