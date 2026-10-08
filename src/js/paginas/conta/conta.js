import './conta.css';
import caronas from '../../dadosMockados/caronas.js';
import { entrar, sair, usuarioAtual } from '../../sessao/sessao.js';

function conta(app) {
  if (usuarioAtual()) {
    mostrarConta(app);
  } else {
    mostrarLogin(app, '');
  }
}

function mostrarLogin(app, erro) {
  app.innerHTML = `
    <section class="conta">
      <h1 class="conta__titulo">Entrar na sua conta</h1>
      <p class="texto-suave">A conta serve para publicar caronas. Para procurar, não precisa entrar.</p>

      <form class="conta__form" id="form-login">
        ${erro ? `<p class="aviso aviso--erro">${erro}</p>` : ''}
        <label class="campo">
          <span class="campo__rotulo">E-mail</span>
          <input class="campo__entrada" name="email" type="email" required />
        </label>
        <label class="campo">
          <span class="campo__rotulo">Senha</span>
          <input class="campo__entrada" name="senha" type="password" required />
        </label>
        <button class="botao botao--destaque" type="submit">Entrar</button>
      </form>
    </section>`;

  const form = document.getElementById('form-login');
  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const dados = new FormData(form);

    // find no login (sessao.js): procura o usuário com esse e-mail e essa senha
    if (entrar(dados.get('email'), dados.get('senha'))) {
      mostrarConta(app);
    } else {
      mostrarLogin(app, 'E-mail ou senha não conferem. Confira os dois e tente de novo.');
    }
  });
}

function mostrarConta(app) {
  const usuario = usuarioAtual();
  // filter pelo id de quem entrou: só as caronas publicadas por essa pessoa
  const minhasCaronas = caronas.filter((carona) => carona.motoristaId === usuario.id);

  app.innerHTML = `
    <section class="conta">
      <div class="perfil">
        <span class="perfil__inicial">${usuario.nome[0]}</span>
        <div class="perfil__dados">
          <h1 class="perfil__nome">${usuario.nome}</h1>
          <span class="texto-suave">${usuario.curso}</span>
          <span class="texto-suave">${usuario.motorista ? usuario.carro : 'Passageiro'}</span>
        </div>
      </div>

      <div class="conta__acoes">
        ${usuario.motorista ? '<a class="botao botao--destaque" href="#publicar">Publicar nova carona</a>' : ''}
        <button class="botao" type="button" id="botao-sair">Sair</button>
      </div>

      <section class="conta__secao">
        <h2 class="conta__subtitulo">Caronas publicadas (${minhasCaronas.length})</h2>
        ${
          minhasCaronas.length === 0
            ? '<p class="texto-suave">Nenhuma carona publicada por esta conta.</p>'
            : `<ul class="minhas">
                ${minhasCaronas
                  .map((carona) => {
                    return `<li>
                              <a class="minha" href="#carona?id=${carona.id}">
                                <span class="minha__trajeto">
                                  <strong>${carona.origem} para ${carona.destino}</strong>
                                  <span class="texto-suave">${carona.dia}, vagas: ${carona.vagas}, R$ ${carona.valor.toFixed(2)}</span>
                                </span>
                                <span class="minha__hora">${carona.saida}</span>
                              </a>
                            </li>`;
                  })
                  .join('')}
              </ul>`
        }
      </section>
    </section>`;

  document.getElementById('botao-sair').addEventListener('click', () => {
    sair();
    mostrarLogin(app, '');
  });
}

export default {
  url: '#conta',
  label: 'Conta',
  icon: 'user',
  pagina: conta,
};
