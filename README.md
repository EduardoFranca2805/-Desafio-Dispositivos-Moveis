# BoraJunto · carona universitária

Desafio 1 de Dispositivos Móveis, Fatec Mogi das Cruzes 
**Tema sorteado:** carona universitária.

> **A pergunta que o app responde:** consigo uma carona que me deixe na Fatec antes da aula, pagando no máximo o que eu pagaria de ônibus?

Aplicação de seis telas em JavaScript puro, com dados mockados, construída no mesmo esqueleto do [KiOferta](https://github.com/samuelrodriguesbrito1/ki-oferta): roteador por hash, telas como módulos, menu gerado da lista de rotas, CSS por componente e layout só com Flexbox.

## Integrantes

| Integrante | Responsabilidade |
| --- | --- |
| Eduardo França da Silva Filho | Dados e descoberta (dados mockados, início, resultados) |
| Samuel Rodrigues Brito | Detalhe e publicação (detalhe, formulário, aviso de repetida) |
| Ambos| Conta e fundação (tokens, base, sessão, conta, rota inexistente) |

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) LTS.

```bash
npm install
npm run dev
```

O Vite abre o projeto em `http://localhost:5173`. Para testar em 360px, use o modo de dispositivo do DevTools.

## Contas de teste

Todos os dados são mockados e nada sobrevive a um F5 (caronas publicadas e login ficam só na memória).

| Tipo | E-mail | Senha |
| --- | --- | --- |
| Motorista | larissa@borajunto.dev | carona123 |
| Motorista | diego@borajunto.dev | carona123 |
| Passageiro | bruna@borajunto.dev | carona123 |

## Telas

| Hash | Tela |
| --- | --- |
| `#inicio` | Busca por bairro ou cidade e atalho por turno |
| `#resultados?q=&turno=&ordem=` | Lista filtrada, dois critérios de ordenação, estado vazio |
| `#carona?id=` | Detalhe da carona, com o motorista e a comparação com o ônibus |
| `#publicar` | Formulário de nova carona (exige conta de motorista) |
| `#conta` | Login, dados da conta e caronas publicadas |
| qualquer outro | Rota inexistente |

## Relatório

O relatório está em [`docs/`](docs/).
