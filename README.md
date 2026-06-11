# Prepare for Demo — Factorial

**Modelo reutilizável** para preparar e conduzir demos Factorial com discovery estruturada.

Leia primeiro: **[COMECE-AQUI.md](./COMECE-AQUI.md)**

## Experiências

| Rota | Conteúdo |
|------|----------|
| `/` | Landing |
| `/preparar` | Formulário → OpenAI gera guia personalizado |
| `/guia` | 9 secções: agenda → discovery → demo → fecho |

## Deploy Vercel (recomendado)

Ver **[docs/VERCEL-DEPLOY.md](docs/VERCEL-DEPLOY.md)** — sem login, só chave OpenAI.

## Dev local (com API)

```bash
npm ci
cp .env.example .env   # add OPENAI_API_KEY
npm run dev:full       # vercel dev
# http://localhost:3000/preparar
```

## Documentação Factorial

O Cursor pesquisa online (help center) com regras anti-alucinação. Ver `docs/FONTES-DOCUMENTACAO.md`.
