# Cadastro de Clientes com ReactJS e API REST
## Equipe

- Integrante 1: Pedro Buture de Oliveira
- Integrante 2: Arthur Gregorio

  
Aplicacao ReactJS para cadastro, edicao, remocao e listagem de clientes consumindo uma API REST. A API foi implementada com JSON Server para atender ao requisito da atividade usando uma Mock API local.

## Funcionalidades

- Cadastro de clientes com validacao de campos.
- Listagem consumida via API REST.
- Busca por nome, e-mail, cidade ou interesse.
- Filtro por status.
- Edicao e exclusao de registros.
- Indicadores de total, clientes ativos e clientes em negociacao.

## Tecnologias

- ReactJS
- Vite
- JSON Server
- Lucide React

## Como executar

Instale as dependencias:

```bash
npm install
```

Suba a API e o frontend juntos:

```bash
npm run start
```

Acesse:

```text
Frontend: http://127.0.0.1:5173
API REST: http://127.0.0.1:3333/clientes
```

Tambem e possivel executar separadamente:

```bash
npm run api
npm run dev
```

## Descricao da API

A documentacao dos endpoints esta em [`API.md`](API.md). O banco de dados mock fica em [`api/db.json`](api/db.json).

## Scripts

| Comando | Descricao |
| --- | --- |
| `npm run dev` | Inicia apenas o frontend React |
| `npm run api` | Inicia apenas a API REST mock |
| `npm run start` | Inicia frontend e API ao mesmo tempo |
| `npm run build` | Gera a versao de producao em `dist` |
| `npm run preview` | Visualiza a versao gerada pelo build |

## Estrutura

```text
api/
  db.json
src/
  components/
    ClienteForm.jsx
    ClienteTable.jsx
  services/
    clientesApi.js
  App.jsx
  main.jsx
  styles.css
API.md
README.md
```





