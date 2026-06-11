# Comece aqui — Preparação Pré-Demo Factorial

Este repositório é o **modelo reutilizável** para preparar e conduzir demos Factorial com discovery estruturada.

**O que tem dentro:**
- **Formulário AI** (`/preparar`) — gera o guia com OpenAI (sem Cursor)
- **Guia web** (`/guia`) — 9 secções interactivas (agenda → discovery → demo → fecho)
- **Templates MD** — roteiro de demo em `demo/`
- **API Vercel** — `api/preparar.ts` com a sua chave OpenAI

**Deploy recomendado:** Vercel — ver [docs/VERCEL-DEPLOY.md](docs/VERCEL-DEPLOY.md)

---

## Modo rápido (Vercel — sem Cursor)

1. Abra o site na Vercel → **Prepare new demo**
2. Preencha nome, sector, notas de pesquisa
3. Clique **Generate demo guide**
4. Use o guia em `/guia` durante a call
5. Depois da call: **PDF + notes** exporta challenges e perguntas discovery que marcou

### Dois modos de trabalho

| Modo | Quando usar |
|------|-------------|
| **Site Vercel** (`/preparar` → `/guia` → PDF script ou PDF + notes) | Dia-a-dia, sem Cursor |
| **Cursor + repo** (`demo/clientes/`, templates MD, `COMECE-AQUI`) | Prep profundo, customização no código |

---

## Passo a passo — Antes da demo (com Cursor, opcional)

### 1. Duplicar o modelo

No Finder: duplique esta pasta e renomeie (ex.: `demo-jirani`).

Ou crie a pasta do cliente:

```bash
cd "/caminho/para/Prepare for Demo"
./scripts/novo-demo.sh "Jirani" "jirani"
```

### 2. Configurar o cliente

1. Copie `cliente.config.json.example` → `cliente.config.json`
2. Preencha:

| Campo | Exemplo | O que é |
|-------|---------|---------|
| `clientName` | Jirani | Nome na capa |
| `clientSlug` | jirani | Pasta em `demo/clientes/` |
| `repoName` | demo-jirani | Nome do repositório GitHub |
| `language` | en | Idioma da demo |
| `industry` | Retail / Asset financing | Sector |
| `employeeCount` | 500+ | Escala |
| `demoGoal` | Validate recruitment challenges | Objectivo do dia |
| `focusModules` | recruitment, time-tracking | Módulos a mostrar |

### 3. Colar notas de pesquisa

1. Abra `transcricao/reuniao.txt`
2. Apague as linhas de instrução
3. Cole: notas SDR, LinkedIn, site da empresa, pesquisa de mercado

### 4. Preparar com o Cursor

1. **File → Open Folder** → escolha a pasta do cliente
2. Copie o prompt de `docs/PROMPT-PRE-DEMO.md` no chat **Agent**
3. Anexe: `@transcricao/reuniao.txt` e `@cliente.config.json`

O Agent vai:
- Pesquisar documentação Factorial na internet (help center)
- Gerar `demo/clientes/{slug}/prep.md`
- Actualizar o guia web (`demoGuideSteps.ts` + `constants.ts`)

### 5. Testar no computador

```bash
npm ci
npm run dev
```

| URL | O que é |
|-----|---------|
| `http://localhost:8080/REPO/` | Landing |
| `http://localhost:8080/REPO/guia` | Guia de demo (9 secções) |

Substitua `REPO` pelo `repoName` em `vite.config.ts`.

---

## Passo a passo — Durante a demo

1. Abra `/guia` no browser (secção a secção)
2. **Secção 3 (Discovery)** — marque perguntas feitas (checklist guarda no browser)
3. **Secção 4 (Resumo)** — anote desafios ao vivo (notas guardam no browser)
4. **Secção 6 (Demo)** — mostre só módulos em foco + vídeos
5. **Secção 9 (Fecho)** — leia o script adaptado ao cliente

---

## Passo a passo — Depois da demo

1. Copie notas da secção 4 para o CRM / follow-up
2. Use `demo/clientes/{slug}/prep.md` como referência
3. Proposta comercial formal fica **fora** deste repo (se necessário, repo separado)

---

## Publicar no GitHub (opcional)

Para partilhar o guia com colegas:

```bash
git init
git add -A
git commit -m "Add pre-demo guide for [Client Name]"
git branch -M main
git remote add origin https://github.com/VictorHGutierrez-cloud/REPO.git
git push -u origin main
```

Settings → Pages → Source: **GitHub Actions**

Site: `https://victorhgutierrez-cloud.github.io/REPO/guia`

---

## Onde está cada coisa

| Pasta / ficheiro | Para quê |
|------------------|----------|
| `demo/TEMPLATE-pre-demo.md` | Modelo do roteiro (9 secções) |
| `demo/areas-discovery.md` | Banco de perguntas discovery |
| `demo/modulos-demo.md` | Quando mostrar cada módulo |
| `docs/PROMPT-PRE-DEMO.md` | Prompt copy-paste para o Cursor |
| `docs/FONTES-DOCUMENTACAO.md` | URLs permitidas (help center) |
| `.cursor/rules/` | Regras do assistente Factorial |
| `src/data/demoGuideSteps.ts` | Conteúdo do guia web |
| `transcricao/reuniao.txt` | Notas de pesquisa do cliente |

---

## Dúvidas frequentes

**Preciso de internet?**  
Sim, para o Cursor pesquisar documentação Factorial. O guia web funciona offline depois de gerado; notas e checklist guardam no browser.

**Posso inventar funcionalidades?**  
Não. O assistente só confirma o que está no help center ou API doc.

**Onde estão os preços?**  
`docs/factorial-funcionalidades-modulos.md` é referência comercial interna — não usar para nomes de botões na demo.
