---
id: M9b
---

## La tesis

> Todo ahorro de tokens es un problema de **diseño del harness** — qué ve el modelo y cuándo —, no de prompts más largos.

Dos frentes para gastar menos: **menos tokens entrando/saliendo** y **menos tokens desperdiciados en re-trabajo** (re-explorar, re-leer historia, re-hacer decisiones ya tomadas).

## A. Higiene de tokens en prompts y specs

**Specs concisas**: describir decisiones, no código. Regla de Pocock: sin file paths ni snippets en la spec — envejecen mal y queman tokens en cada lectura. El código va solo cuando un prototipo expresa mejor que la prosa.

**Glosario de dominio (GLOSSARY.md)**: un vocabulario ubicuo comprime cada prompt y cada respuesta, sesión tras sesión. "Materialization cascade" en vez de una oración entera, cada vez que aparece, en cada sesión. Es la técnica de ahorro más subestimada del campo.

**Un ticket = una ventana de contexto**: dimensionar la unidad de trabajo para que entre fresca en un contexto minimiza re-exploración y re-lectura de historia. Tracer bullets de Pocock, "una cosa por loop" de Ralph.

**Punteros de contexto**: pasar paths/referencias (spec, tickets, notas, commits) entre subagentes en vez de copiar contenido. Duplicar = tokens duplicados + versiones que divergen.

**AGENTS.md como mapa** (~100 líneas, OpenAI) y **progressive disclosure** en skills: metadata barata visible siempre, cuerpo solo si aplica.

**Cuidar el output**: pedir salidas estructuradas; herramientas que devuelven solo lo relevante. Una tool que devuelve 10KB cuando importan 3 campos quema contexto por llamada.

## B. Arquitectura para gastar menos

**Routing por riesgo**: el modelo caro solo donde el riesgo lo paga.

- Router local/barato para el grueso del trabajo.
- Panel multi-modelo solo para decisiones de alto costo (arquitectura, seguridad, root cause).
- Ejemplo: `raydocs/fusion-deck` — una pregunta difícil se manda a Claude + GPT + Gemini en paralelo a ciegas y un modelo juega; `/fusion-auto` manda el trabajo de bajo riesgo a un solo modelo.

**Orquestación "decisions-only"**: el orquestador decide, workers baratos ejecutan. No quemar la ventana principal en trabajo delegable (`hurttlocker/token-lean`, patrón orchestrator-worker de Anthropic).

**Subagentes de exploración** que devuelven *notas*, no la exploración entera: el contexto principal paga solo el resumen.

**Retrieval determinista en vez de vector/RAG**: el campo corre en grep/AST — ningún harness de producción usa embeddings para código (arXiv 2609.00006).

- `Graphify-Labs/graphify`: skill `/graphify` que mapea el repo a un **knowledge graph** (tree-sitter, sin LLM en el índice) consultable en vez de releer archivos. Reporta ~70x menos tokens por consulta y ~80% menos gasto total de tokens del agente.

**Compresión de salida de comandos**: `rtk` — proxy en Rust que filtra/comprime el output de `ls`, `git`, tests, etc. vía hooks `PreToolUse`. Hasta 90% menos bytes de bash leídos por el modelo. Soporta Claude Code, Codex, Cursor, Copilot, Gemini.

**Palancas de plataforma** (docs Anthropic, *optimizing for cost*):

- **Prompt caching**: la palanca más grande — sin cache, el costo del loop crece ~cuadrático con los turnos; con cache, se amortiza.
- Input trimming, batch processing, límites de presupuesto.
- Elección de modelo y esfuerzo de razonamiento por tarea.

**Medición**: ledger de gasto por corrida, evals del harness, retro post-sesión para detectar tool calls caros. No se optimiza lo que no se mide.

## C. Panorama de colecciones de skills

| Colección | Qué es | Enfoque |
|---|---|---|
| `mattpocock/skills` | ~20 skills composables (grilling, spec→tickets→implement, TDD, review, retro) | Control del usuario, proceso liviano |
| `obra/Superpowers` | Metodología completa: brainstorming, writing-plans, executing-plans, debugging sistemático | Más estructura, plugin oficial |
| `raydocs/fusion-deck` | Panel multi-modelo + workflows plan/context/review/orchestrate | Modelos extra solo si el riesgo lo amerita |
| `Graphify-Labs/graphify` | Knowledge graph del repo consultable | Menos tokens de exploración |
| `hurttlocker/token-lean` | Disciplina decisions-only en un markdown | Orquestador barato |
| `rtk-ai/rtk` | Proxy que comprime salidas de comandos | Menos tokens de bash |

## Regla práctica

El esfuerzo de ahorro no va en escribir prompts más largos ni más reglas: va en **mejor señal por token** — qué ve el modelo, cuándo lo ve, y en qué unidad de trabajo lo ve.

## Fuentes

- `mattpocock/skills`, `fusion-deck`, `token-lean`, `graphify`, `rtk` (repos)
- Anthropic — *Optimizing for cost and intelligence*
- arXiv 2609.00006 — *Harness Engineering*
