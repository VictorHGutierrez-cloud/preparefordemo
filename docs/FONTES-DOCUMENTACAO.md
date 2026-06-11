# Fontes de documentação Factorial

Este repositório usa **busca online em tempo real** (Firecrawl / Tavily no Cursor) restrita às fontes abaixo. Não espelhamos o help center inteiro.

## Fontes permitidas (produto e API)

| Idioma | URL base |
|--------|----------|
| Português | https://help.factorialhr.com/pt_PT/ |
| Espanhol | https://help.factorialhr.com/es_ES/ |
| Alemão | https://help.factorialhr.com/de_DE/ |
| Italiano | https://help.factorialhr.com/it_IT/ |
| Francês | https://help.factorialhr.com/fr_FR/ |
| Segurança | https://factorial.es/informacion-segura |
| API (Getting started) | https://apidoc.factorialhr.com/v2026-01-01/docs/getting-started |

## Cache offline (opcional)

Pasta `docs/cache/` — cópias manuais de artigos críticos para demos sem internet. Atualizar quando a documentação mudar.

## Fonte interna (NÃO é documentação de produto)

| Ficheiro | Uso |
|----------|-----|
| `docs/factorial-funcionalidades-modulos.md` | Bundles, add-ons, preços ROW — **apenas referência comercial interna** |
| `reference/core.txt` | Lista interna de módulos Core |

**Regra:** nomes de botões, fluxos de UI e capacidades do produto só podem ser citados se aparecerem no help center ou na API doc.

## Como pesquisar no Cursor

1. Pergunte ao Agent sobre uma funcionalidade Factorial.
2. O Agent deve usar MCP (Firecrawl `firecrawl_search` / Tavily `tavily_search`) com filtro de domínio.
3. Cada resposta deve incluir o **link exacto** do artigo usado.
4. Se não encontrar: usar o fallback protocol (ver `.cursor/rules/factorial-documentation-assistant.mdc`).

## Idioma das respostas

Responder no idioma da pergunta. Para demos em inglês, preferir help em inglês quando existir; caso contrário usar `pt_PT` ou o idioma do `cliente.config.json`.
