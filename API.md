# Descricao da API REST

Esta aplicacao usa uma API REST simulada com JSON Server. Os dados ficam no arquivo `api/db.json` e o recurso principal e `clientes`.

## Base URL

```text
http://127.0.0.1:3333
```

## Recurso: clientes

### Listar clientes

```http
GET /clientes
```

Resposta `200 OK`:

```json
[
  {
    "id": "1",
    "nome": "Mariana Lopes",
    "email": "mariana.lopes@example.com",
    "telefone": "(11) 98888-1200",
    "cidade": "Sao Paulo",
    "interesse": "Plano Profissional",
    "status": "Ativo",
    "observacoes": "Cliente interessada em migrar a equipe no proximo mes.",
    "criadoEm": "2026-05-01T09:30:00.000Z"
  }
]
```

### Cadastrar cliente

```http
POST /clientes
Content-Type: application/json
```

Corpo da requisicao:

```json
{
  "id": "uuid-gerado-no-frontend",
  "nome": "Joao Silva",
  "email": "joao.silva@example.com",
  "telefone": "(41) 95555-1000",
  "cidade": "Curitiba",
  "interesse": "Plano Premium",
  "status": "Ativo",
  "observacoes": "Primeiro contato realizado por telefone.",
  "criadoEm": "2026-05-13T20:00:00.000Z"
}
```

Resposta `201 Created`: retorna o cliente criado.

### Atualizar cliente

```http
PATCH /clientes/:id
Content-Type: application/json
```

Exemplo:

```json
{
  "status": "Em negociacao",
  "observacoes": "Aguardando aprovacao da proposta."
}
```

Resposta `200 OK`: retorna o cliente atualizado.

### Remover cliente

```http
DELETE /clientes/:id
```

Resposta `200 OK`: remove o cliente informado.

## Modelo de dados

| Campo | Tipo | Obrigatorio | Descricao |
| --- | --- | --- | --- |
| `id` | string | sim | Identificador unico do cliente |
| `nome` | string | sim | Nome completo |
| `email` | string | sim | E-mail de contato |
| `telefone` | string | sim | Telefone com DDD |
| `cidade` | string | sim | Cidade ou cidade/UF |
| `interesse` | string | sim | Produto, servico ou plano de interesse |
| `status` | string | sim | `Ativo`, `Em negociacao` ou `Inativo` |
| `observacoes` | string | nao | Informacoes adicionais sobre o cliente |
| `criadoEm` | string | sim | Data de criacao no formato ISO 8601 |
