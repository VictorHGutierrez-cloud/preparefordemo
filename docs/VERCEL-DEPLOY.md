# Deploy na Vercel — passo a passo

Sem login na app. Sem GitHub obrigatório (mas a Vercel precisa do código — pode fazer deploy directo da pasta).

---

## 1. Instalar ferramentas (uma vez)

No Terminal:

```bash
npm install -g vercel
```

Na pasta do projeto:

```bash
cd "/Users/victor.gutierrez/Desktop/Prepare for Demo"
npm ci
```

---

## 2. Configurar a chave OpenAI

1. Copie `.env.example` → `.env` na raiz do projeto
2. Cole a sua chave:

```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o
```

3. (Opcional) `TAVILY_API_KEY` — melhora a pesquisa no help Factorial

---

## 3. Testar no computador

**Com API a funcionar** (recomendado):

```bash
npm run dev:full
```

Abra o URL que o terminal mostrar (ex.: `http://localhost:3000`).

- `/preparar` — formulário
- `/guia` — guia de demo

**Só frontend** (`npm run dev`) — o formulário **não** gera demo (API em falta).

---

## 4. Publicar na Vercel

```bash
vercel
```

Siga as perguntas:
- Link to existing project? **N** (primeira vez)
- Project name: ex. `factorial-pre-demo`
- Directory: `.` (Enter)

Depois, na dashboard Vercel → **Settings → Environment Variables**:

| Nome | Valor |
|------|-------|
| `OPENAI_API_KEY` | sua chave `sk-...` |
| `OPENAI_MODEL` | `gpt-4o-mini` (exact spelling — see below) |
| `TAVILY_API_KEY` | (opcional) |

**Redeploy** após adicionar variáveis:

```bash
vercel --prod
```

O seu site fica em: `https://factorial-pre-demo.vercel.app` (ou nome escolhido).

---

## 5. Usar no dia-a-dia

1. Abra o URL da Vercel
2. **Prepare new demo** → preencha formulário → **Generate**
3. Abre automaticamente o **guia** personalizado
4. Durante a call: navegue as 9 secções
5. **Download prep.md** se quiser guardar o roteiro

Os dados ficam no **browser** (sessionStorage) — não há base de dados.

---

## Custos

| Item | Custo |
|------|-------|
| Vercel Hobby | Grátis (limites de uso) |
| OpenAI gpt-4o | ~$0.05–0.20 por preparação |
| Tavily | Grátis até certo limite (opcional) |

---

## Problemas comuns

| Problema | Solução |
|----------|---------|
| "OPENAI_API_KEY is not configured" | Adicionar variável na Vercel + redeploy |
| Formulário falha em localhost com `npm run dev` | Usar `npm run dev:full` |
| Timeout na geração | Plano Vercel Pro (60s) ou reduzir notas |
| Guia vazio / template | Gerar de novo em `/preparar` |
