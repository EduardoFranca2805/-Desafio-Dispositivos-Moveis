import './publicar.css';
import caronas, { FATEC } from '../../dadosMockados/caronas.js';
import { turnos, dias } from '../../dadosMockados/calendario.js';
import { usuarioAtual } from '../../sessao/sessao.js';

function publicar(app) {
  const usuario = usuarioAtual();

  if (!usuario || !usuario.motorista) {
    app.innerHTML = `
      <section class="publicar">
        <h1 class="publicar__titulo">Ofereça uma carona</h1>
        <div class="publicar__bloqueio">
          <p class="texto-suave">Para publicar, entre com uma conta de motorista. Para procurar carona não precisa de conta.</p>
          <a class="botao botao--destaque" href="#conta">Entrar</a>
        </div>
      </section>`;
    return;
  }

  app.innerHTML = `
    <section class="publicar">
      <h1 class="publicar__titulo">Ofereça uma carona</h1>
      <p class="texto-suave">Publicando como ${usuario.nome}, ${usuario.carro}.</p>

      <div id="aviso"></div>

      <form class="formulario" id="form-carona">
        <fieldset class="formulario__grupo">
          <legend class="formulario__legenda">Trajeto</legend>
          <label class="campo">
            <span class="campo__rotulo">Sentido</span>
            <select class="campo__entrada" name="sentido" required>
              <option value="ida">Do bairro para a Fatec</option>
              <option value="volta">Da Fatec para o bairro</option>
            </select>
          </label>
          <label class="campo">
            <span class="campo__rotulo">Bairro ou cidade</span>
            <input class="campo__entrada" name="bairro" type="text" required minlength="3" placeholder="Ex.: Braz Cubas" />
          </label>
          <label class="campo">
            <span class="campo__rotulo">Ponto de encontro</span>
            <input class="campo__entrada" name="ponto" type="text" required minlength="5" placeholder="Um lugar fácil de achar" />
          </label>
        </fieldset>

        <fieldset class="formulario__grupo">
          <legend class="formulario__legenda">Quando</legend>
          <div class="formulario__par">
            <label class="campo">
              <span class="campo__rotulo">Dia</span>
              <select class="campo__entrada" name="dia" required>
                ${dias.map((dia) => `<option value="${dia}">${dia}</option>`).join('')}
              </select>
            </label>
            <label class="campo">
              <span class="campo__rotulo">Turno da aula</span>
              <select class="campo__entrada" name="turno" required>
                ${turnos.map((turno) => `<option value="${turno.id}">${turno.nome}</option>`).join('')}
              </select>
            </label>
          </div>
          <div class="formulario__par">
            <label class="campo">
              <span class="campo__rotulo">Saída</span>
              <input class="campo__entrada" name="saida" type="time" required />
            </label>
            <label class="campo">
              <span class="campo__rotulo">Chegada prevista</span>
              <input class="campo__entrada" name="chegada" type="time" required />
            </label>
          </div>
        </fieldset>

        <fieldset class="formulario__grupo">
          <legend class="formulario__legenda">Vagas e valor</legend>
          <div class="formulario__par">
            <label class="campo">
              <span class="campo__rotulo">Vagas</span>
              <input class="campo__entrada" name="vagas" type="number" required min="1" max="6" value="3" />
            </label>
            <label class="campo">
              <span class="campo__rotulo">Valor por vaga (R$)</span>
              <input class="campo__entrada" name="valor" type="number" required min="0" step="0.5" />
            </label>
          </div>
        </fieldset>

        <button class="botao botao--destaque formulario__enviar" type="submit">Publicar carona</button>
      </form>
    </section>`;

  adicionarEvento(usuario);
}

function adicionarEvento(usuario) {
  const form = document.getElementById('form-carona');
  const aviso = document.getElementById('aviso');

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const dados = new FormData(form);
    const ida = dados.get('sentido') === 'ida';

    const nova = {
      id: caronas.length + 1,
      motoristaId: usuario.id,
      origem: ida ? dados.get('bairro') : FATEC,
      destino: ida ? FATEC : dados.get('bairro'),
      ponto: dados.get('ponto'),
      dia: dados.get('dia'),
      saida: dados.get('saida'),
      chegada: dados.get('chegada'),
      vagas: Number(dados.get('vagas')),
      valor: Number(dados.get('valor')),
      turno: dados.get('turno'),
    };

    const repetida = caronas.find(
      (carona) =>
        carona.motoristaId === nova.motoristaId && carona.dia === nova.dia && carona.saida === nova.saida,
    );

    if (repetida) {
      aviso.innerHTML = `
        <p class="aviso aviso--erro">
          Você já publicou uma carona para ${repetida.dia} às ${repetida.saida}.
          <a href="#carona?id=${repetida.id}">Ver a carona</a>
        </p>`;
      return;
    }

    caronas.push(nova);
    window.location.hash = `#carona?id=${nova.id}`;
  });
}

export default {
  url: '#publicar',
  label: 'Publicar',
  icon: 'circle-plus',
  pagina: publicar,
};
