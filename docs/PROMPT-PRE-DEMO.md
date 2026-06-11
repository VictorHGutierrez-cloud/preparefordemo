# Prompt Cursor — Preparação Pré-Demo

Copie **todo o bloco abaixo** no chat Agent (modo Agent).

Anexe: `@transcricao/reuniao.txt` · `@cliente.config.json` · `@demo/TEMPLATE-pre-demo.md`

---

```
TAREFA: Preparar uma demo Factorial para um NOVO CLIENTE.

LER PRIMEIRO (obrigatório):
1. transcricao/reuniao.txt — notas de pesquisa, SDR, LinkedIn, site, ou transcrição
2. cliente.config.json — clientName, clientSlug, language, industry, demoGoal, focusModules
3. demo/TEMPLATE-pre-demo.md — estrutura do output
4. demo/areas-discovery.md — banco de perguntas discovery
5. demo/modulos-demo.md — módulos e vídeos de demo
6. docs/FONTES-DOCUMENTACAO.md — fontes permitidas

REGRAS DE DOCUMENTAÇÃO FACTORIAL (obrigatório):
- Antes de mencionar qualquer funcionalidade Factorial, pesquisar no help center ou API doc (Firecrawl/Tavily)
- Confirmar que o nome exacto aparece na documentação
- Citar o link da fonte em cada afirmação de produto
- NÃO usar docs/factorial-funcionalidades-modulos.md para nomes de botões ou UI
- Se não encontrar: usar fallback "I cannot find information regarding [Topic]..."

PASSOS:
1. Resumir o que aprendeu sobre o cliente (só factos das notas — não inventar)
2. Gerar demo/clientes/{clientSlug}/prep.md a partir do template (9 secções)
3. Destacar 2–3 áreas de discovery mais relevantes
4. Mapear dores → módulos Factorial (com links do help center verificados)
5. Actualizar src/data/demoGuideSteps.ts com contexto do cliente
6. Actualizar src/utils/constants.ts (empresa, demoGoal, industry, focus areas)
7. Ligar vídeos de src/data/factorialDemoVideos.ts aos módulos em foco

NÃO FAZER:
- Criar proposta comercial ou slides de pricing
- Inventar factos sobre o cliente ou funcionalidades Factorial
- Alterar estrutura de componentes em src/components/demo-guide/

IDIOMA: conforme cliente.config.json → language (en, pt, es, etc.)

OUTPUT ESPERADO:
- demo/clientes/{slug}/prep.md criado/atualizado
- demoGuideSteps.ts e constants.ts actualizados
- Lista de artigos do help center citados (com URLs)
```
