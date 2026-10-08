import './naoEncontrada.css';

function naoEncontrada(app) {
  app.innerHTML = `
    <section class="nao-encontrada">
      <span class="nao-encontrada__placa">Sem saída</span>
      <h1 class="nao-encontrada__titulo">Esse endereço não existe.</h1>
      <p class="texto-suave">Volte para o início e procure sua carona por lá.</p>
      <a class="botao botao--destaque" href="#inicio">Voltar para o início</a>
    </section>`;
}

export default {
  url: '#nao-encontrada',
  label: '',
  icon: 'construction',
  pagina: naoEncontrada,
};
