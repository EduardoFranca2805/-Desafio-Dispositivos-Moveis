import { createIcons, icons } from 'lucide';
import { mapaderotas } from './rotas/rotas.js';
import { navbar } from './navbar/navbar.js';

const app = document.getElementById('app');
navbar(mapaderotas);

function renderizarPagina() {
  const hash = window.location.hash || '#inicio';
  // "#resultados?q=suzano" -> url "#resultados" e parametros "q=suzano"
  const [url, busca] = hash.split('?');
  const parametros = new URLSearchParams(busca);

  const rota = mapaderotas.find((tela) => tela.url === url);

  if (rota) {
    rota.pagina(app, parametros);
  } else {
    // o find devolveu undefined: a rota não existe
    const naoEncontrada = mapaderotas.find((tela) => tela.url === '#nao-encontrada');
    naoEncontrada.pagina(app);
  }

  createIcons({ icons });
}

window.addEventListener('hashchange', () => {
  renderizarPagina();
});
renderizarPagina();
