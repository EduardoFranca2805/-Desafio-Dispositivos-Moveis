import './inicio.css';
import caronas from '../../dadosMockados/caronas.js';
import { turnos } from '../../dadosMockados/calendario.js';

function inicio(app) {
  app.innerHTML = `
    <section class="inicio">
      <p class="inicio__marca">BoraJunto</p>

      <form class="inicio__busca" id="form-busca">
        <h1 class="inicio__pergunta"><label for="busca-origem">De onde você sai para a Fatec?</label></h1>
        <p class="texto-suave">Bairro, cidade ou ponto de encontro. A lista mostra quando você chega e se sai mais barato que o ônibus.</p>
        <div class="inicio__linha">
          <input id="busca-origem" class="inicio__campo" type="text" placeholder="Ex.: Braz Cubas, Suzano" />
          <button class="botao botao--destaque inicio__botao" type="submit">
            <i data-lucide="search"></i> Buscar carona
          </button>
        </div>
      </form>

      <section class="inicio__turnos">
        <h2 class="inicio__subtitulo">Ou escolha o turno da sua aula</h2>
        <ul class="inicio__lista-turnos">
          ${turnos
            .map((turno) => {
              return `<li class="inicio__item-turno">
                        <a class="turno" href="#resultados?turno=${turno.id}">
                          <i class="turno__icone" data-lucide="${turno.icone}"></i>
                          <span class="turno__textos">
                            <span class="turno__nome">${turno.nome}</span>
                            <span class="turno__total">${caronas.filter((carona) => carona.turno === turno.id).length} caronas</span>
                          </span>
                        </a>
                      </li>`;
            })
            .join('')}
        </ul>
      </section>

      <p class="inicio__motorista texto-suave">
        Vai de carro para a Fatec? <a href="#publicar">Ofereça as vagas que sobram</a>.
      </p>
    </section>`;

  adicionarEvento();
}

function adicionarEvento() {
  const formBusca = document.getElementById('form-busca');
  const campoBusca = document.getElementById('busca-origem');

  // o termo digitado vai para a tela de resultados pelo hash
  formBusca.addEventListener('submit', (evento) => {
    evento.preventDefault();
    window.location.hash = `#resultados?q=${campoBusca.value}`;
  });
}

export default {
  url: '#inicio',
  label: 'Início',
  icon: 'house',
  pagina: inicio,
};
