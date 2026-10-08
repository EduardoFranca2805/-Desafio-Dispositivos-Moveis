import usuarios from '../dadosMockados/usuarios.js';

let usuarioLogado = null;

function entrar(email, senha) {
  usuarioLogado = usuarios.find((usuario) => usuario.email === email && usuario.senha === senha);
  return usuarioLogado;
}

function sair() {
  usuarioLogado = null;
}

function usuarioAtual() {
  return usuarioLogado;
}

export { entrar, sair, usuarioAtual };
