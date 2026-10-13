# Mapa de estudio: SDD (Spec-Driven Development) y Harness Engineering

> Investigación base para la futura app de estudio. Estado del campo a octubre 2026.
> Las dos disciplinas se complementan: **SDD define *qué* construir (la intención)**; **el harness define *cómo* el agente trabaja y se autocorrige (el entorno)**. Ambas son formas especializadas de *context engineering*.

---

## 0. Mapa general (vista de pájaro)

```
                     ┌─────────────────────────────────────────┐
                     │   FUNDAMENTOS: LLMs, agentes, contexto  │  (Módulo 1)
                     └───────────────┬─────────────────────────┘
                                     │
        ┌────────────────────────────┼─────────────────────────────┐
        ▼                            ▼                             ▼
┌───────────────┐          ┌───────────────────┐         ┌───────────────────┐
│ CONTEXT ENG.  │◄────────►│  SDD (la spec)    │◄───────►│ HARNESS (entorno) │
│ (Módulo 2)    │          │  Módulos 3-5      │         │  Módulos 6-9      │
└───────────────┘          └─────────┬─────────┘         └─────────┬─────────┘
                                     └──────────────┬──────────────┘
                                                    ▼
                                  ┌─────────────────────────────────┐
                                  │ INTEGRACIÓN: SDD + Harness       │ (Módulo 10)
                                  │ Agentes de larga duración,       │
                                  │ multi-agente, críticas, futuro   │ (Módulos 11-12)
                                  └─────────────────────────────────┘
```

Niveles sugeridos: 🟢 Básico · 🟡 Intermedio · 🔴 Avanzado

---

## Módulo 1 — Fundamentos 🟢

**Objetivo:** entender qué es un agente de código y por qué necesita estructura.

- 1.1 LLM vs. chatbot vs. agente. Definición operativa: *un agente es un modelo llamando herramientas en un loop hasta completar una tarea* (LangChain).
- 1.2 La ecuación central: **Agente = Modelo + Harness** (LangChain, Fowler, paper arXiv 2609.00006).
- 1.3 Límites de los LLMs: no determinismo, no conocen tu contexto, ventana de contexto finita, "context rot", alucinaciones de APIs.
- 1.4 Evolución de las prácticas: *prompt engineering* (2022-24) → *context engineering* (2025) → *spec-driven development* (2025) → *harness engineering* (2026).
- 1.5 "Vibe coding" vs. ingeniería asistida por IA: por qué el vibe coding no escala.
- 1.6 Herramientas actuales: Claude Code, Codex CLI, Gemini CLI, Cursor, Kiro, OpenCode, Aider, OpenHands, Devin, etc.

**Glosario mínimo:** token, ventana de contexto, tool call, system prompt, loop agéntico, subagente, MCP, compaction.

---

## Módulo 2 — Context Engineering (puente entre ambos temas) 🟢→🟡

**Objetivo:** dominar la idea de que todo es "qué tokens ve el modelo en cada momento".

- 2.1 Definición (Anthropic): *el conjunto de estrategias para curar y mantener el conjunto óptimo de tokens durante la inferencia*. Objetivo: **el menor conjunto de tokens de alta señal** que maximice el resultado.
- 2.2 Presupuesto de atención y "context rot".
- 2.3 Técnicas: system prompts a la "altura correcta", herramientas bien descritas, ejemplos canónicos, recuperación *just-in-time*, **progressive disclosure**.
- 2.4 Tareas largas: **compaction** (resumir en el lugar) vs. **context reset** (agente nuevo + artefacto de handoff), notas estructuradas / memoria, subagentes para aislar contexto.
- 2.5 *12-Factor Agents* (Dex Horthy / HumanLayer): "own your prompts", "own your context window", "own your control flow", agentes pequeños y enfocados, el agente como *stateless reducer*.
- 2.6 Workflow Research → Plan → Implement (HumanLayer) como precursor práctico de SDD.

**Fuentes clave:** Anthropic "Effective context engineering for AI agents" (sep 2025); humanlayer/12-factor-agents.

---

## PARTE A — SPEC-DRIVEN DEVELOPMENT (SDD)

## Módulo 3 — Conceptos de SDD 🟢

- 3.1 **Definición:** escribir una *spec* antes del código con IA ("documentation first"); la spec es la fuente de verdad para el humano y el agente.
- 3.2 **La "inversión de poder"** (manifiesto de GitHub spec-kit): *el código sirve a la spec, no al revés*; "el código es la última milla".
- 3.3 **¿Qué es una spec?** (Böckeler): artefacto estructurado, orientado a comportamiento, en lenguaje natural, que expresa funcionalidad y guía a agentes.
- 3.4 **Spec vs. memory bank / reglas:** la spec es por tarea/feature; el memory bank (AGENTS.md, constitution, steering) aplica a todas las sesiones.
- 3.5 **Los 3 niveles de SDD** (Böckeler, martinfowler.com):
  1. *Spec-first*: la spec se escribe antes y se usa para esa tarea.
  2. *Spec-anchored*: la spec se mantiene y evoluciona con la feature.
  3. *Spec-as-source*: el humano solo edita la spec; el código se regenera (`// GENERATED FROM SPEC - DO NOT EDIT`).
- 3.6 Principios (spec-kit): specs como *lingua franca*, specs ejecutables, refinamiento continuo, contexto guiado por investigación, feedback bidireccional (producción → spec), branching para explorar implementaciones alternativas.
- 3.7 Relación con prácticas clásicas: PRD, BDD/Gherkin, TDD, ADRs, Design Docs, Model-Driven Development (y por qué esta vez podría ser distinto).

## Módulo 4 — Anatomía de una spec y escritura de requisitos 🟡

- 4.1 Separar **qué/por qué** (spec) de **cómo** (plan/diseño) de **pasos** (tasks).
- 4.2 **User stories + criterios de aceptación** ("Como… quiero… para…").
- 4.3 **EARS** (Easy Approach to Requirements Syntax), usado por Kiro: `WHEN [condición] THE SYSTEM SHALL [comportamiento]`. Variantes: ubicuos, por evento, por estado, opcionales, no deseados.
- 4.4 **Escenarios GIVEN/WHEN/THEN** (OpenSpec, Kiro) → se traducen a tests.
- 4.5 Palabras normativas (MUST/SHALL/SHOULD — RFC 2119).
- 4.6 Marcar ambigüedad: `[NEEDS CLARIFICATION]` (spec-kit) y fases de clarificación.
- 4.7 Requisitos no funcionales, edge cases, manejo de errores, trazabilidad requisito → tarea → test.
- 4.8 **Delta specs** (OpenSpec): `ADDED / MODIFIED / REMOVED Requirements` para describir el cambio, no el sistema completo → clave para brownfield.
- 4.9 Antipatrones: specs larguísimas imposibles de revisar, mezclar stack técnico en la spec funcional, specs que nadie mantiene ("spec drift").

**Ejercicio sugerido para la app:** reescribir requisitos vagos en EARS y en Given/When/Then.

## Módulo 5 — Herramientas y frameworks de SDD 🟡

| Herramienta | Nivel SDD | Workflow / artefactos | Idea distintiva |
|---|---|---|---|
| **GitHub Spec Kit** | spec-first → anchored | `/speckit.constitution → specify → clarify → plan → checklist → tasks → analyze → implement` ; `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `tasks.md` | **Constitution** (principios inmutables), checklists como "definition of done" por fase, agnóstico de agente |
| **Kiro** (AWS) | spec-first | `requirements.md` (EARS) → `design.md` → `tasks.md` en `.kiro/specs/`; modo Quick Spec y Vibe | IDE propio, **steering** (product.md, structure.md, tech.md), gates de aprobación por fase |
| **OpenSpec** (Fission AI) | spec-anchored | `openspec/specs/` (verdad) + `openspec/changes/<cambio>/` (proposal, delta specs, design, tasks) → **archive** fusiona el delta | Liviano, ideal para brownfield, ciclo propose → apply → archive |
| **Tessl** | anchored → spec-as-source | Specs por archivo con `@generate`/`@test`; **Spec Registry** (usage specs de librerías) | Explora spec-as-source; specs como dependencias instalables |
| **BMAD Method** | spec-first multi-agente | Brainstorm → PRD → Arquitectura/ADR → Epics → Stories → Readiness check → Implementación → Code review | Agentes por rol (analyst, PM, architect, dev, QA, UX) |
| Otros | — | SpecD, spec-driver, skills de SDD para Claude Code, Superpowers | Verificación determinista, grafos spec↔código |

- 5.1 Comparativa práctica: tamaño de tarea vs. herramienta (bug chico ≠ feature grande).
- 5.2 Greenfield vs. brownfield.
- 5.3 Cómo elegir y cuándo **no** usar SDD.

**Laboratorio:** implementar la misma feature con Spec Kit, Kiro y OpenSpec y comparar artefactos.

---

## Módulo 5b — El enfoque de Matt Pocock: SDD liviano por skills 🟡

**Objetivo:** entender la alternativa "de abajo hacia arriba" a los frameworks pesados. Repo: `mattpocock/skills` (~245k stars, MIT). Contraste directo con Spec Kit/BMAD/GSD: en vez de que el framework **posea el proceso**, las skills son **pequeñas, composables y editables** — el humano conserva el control y los bugs del proceso son fáciles de arreglar.

- 5b.1 **Filosofía:** corregir los modos de fallo reales de los agentes (mala alineación, verbosidad, código que no funciona, entropía de diseño). Compatible con Claude Code, Codex, Copilot, Gemini, Cursor, Devin, etc. (plugin oficial de Claude Code o `npx skills add`).
- 5b.2 **Grilling (alineación):** `/grill-me`, `/grill-with-docs`, `grilling` — el agente *te entrevista* hasta resolver cada rama del árbol de diseño. La solución al fallo #1 (el agente construye otra cosa) es una sesión de preguntas, no una spec larga.
- 5b.3 **Lenguaje compartido (reduce tokens y verbosidad):** `/grill-with-docs` + `domain-modeling` construyen `GLOSSARY.md` y ADRs. Con vocabulario de dominio, el agente usa 1 palabra en vez de 20 y **gasta menos tokens razonando**. Ejemplo: "materialization cascade" vs. una oración entera.
- 5b.4 **Pipeline spec-first:** `/to-spec` (sintetiza la conversación en una spec — problem/solution/user stories/decisiones de implementación y de testing — y la publica al issue tracker con label `ready-for-agent`) → `/to-tickets` (**tracer bullets**: slices verticales completas y demoables, cada una cabe en *una ventana de contexto fresca*, con aristas `blocked-by`) → `/implement-spec` (los tickets son un **grafo de tareas**, no una lista: subagentes implementadores atacan la *frontera* disponible en worktrees paralelos, subagente merger, `/code-review` al final).
- 5b.5 **Bucle de calidad:** `/tdd` (red-green-refactor, tests en *seams* pre-acordados), `/diagnosing-bugs` (diagnóstico disciplinado por fases), `/code-review` (dos ejes: estándares + fidelidad a la spec).
- 5b.6 **Diseño:** `codebase-design` e `improve-codebase-architecture` — módulos *deep* (Ousterhout), lucha contra la bola de barro que los agentes aceleran.
- 5b.7 **Gestión de contexto como diseño deliberado:**
  - *Implementación vs. review:* el implementador sufre presión de contexto; el revisor recibe solo el diff → los estándares viven en `CODING_STANDARDS.md` (leído en review), no en AGENTS.md.
  - AGENTS.md solo para *punteros de navegación*.
  - `handoff` (compactar sesión para otro agente), `wayfinder` (trabajo >1 sesión: mapa de tickets de *decisión* en el tracker), `retro` (post-sesión: sugiere mejoras de entorno — navegación, checks, estándares, economía de herramientas — es harness engineering puro).
  - Comunicación por **punteros de contexto** (spec, tickets, notas, commits), nunca duplicar información entre subagentes.
- 5b.8 Por qué importa para SDD: es spec-anchored sin ser waterfall; la spec vive en el issue tracker, los tickets son el DAG, y cada ticket es una unidad de una ventana de contexto.

**Ejercicio:** instalar `npx skills add mattpocock/skills` en un repo y correr grill → to-spec → to-tickets → implement-spec en una feature real.

---

## PARTE B — HARNESS ENGINEERING

## Módulo 6 — Conceptos de Harness 🟢

- 6.1 **Definición amplia:** *todo lo que no es el modelo* — system prompts, herramientas/skills/MCP, infraestructura (filesystem, sandbox, browser), orquestación (subagentes, handoffs, routing de modelos), hooks/middleware deterministas (LangChain).
- 6.2 **Inner harness vs. outer harness** (Böckeler): el que trae el agente (Claude Code, Codex) vs. el que construís vos como usuario para tu repo.
- 6.3 Origen del término: Mitchell Hashimoto ("Engineer the Harness": *cada vez que el agente comete un error, diseñás una solución para que nunca lo repita*), OpenAI "Harness engineering" (feb 2026), Anthropic "Effective harnesses for long-running agents" (nov 2025).
- 6.4 El caso OpenAI: ~1M líneas, ~1.500 PRs, 0 líneas escritas a mano, 3→7 ingenieros. *"Humans steer. Agents execute."* Cuando algo falla, la pregunta no es "esforzate más" sino **"¿qué capacidad falta y cómo la hago legible y verificable para el agente?"**
- 6.5 Evidencia: mismo modelo en 8 harnesses distintos sobre 25 tareas → éxito de 68% a 88% (marmelab, State of Harness Engineering 2026).

## Módulo 7 — Modelo mental: guías, sensores y el loop de control 🟡

Basado en Böckeler, "Harness engineering for coding agent users" (abr 2026).

- 7.1 **Guías (feedforward):** anticipan y orientan antes de actuar (AGENTS.md, skills, scripts de bootstrap, codemods).
- 7.2 **Sensores (feedback):** observan después y permiten autocorrección (tests, linters, type checkers, revisión por IA). Tip: mensajes de linter escritos *para el LLM*, con instrucciones de corrección.
- 7.3 **Computacional vs. inferencial:** determinista/rápido/barato (CPU) vs. semántico/lento/caro/no determinista (LLM-as-judge).
- 7.4 **El steering loop:** el trabajo del humano es iterar sobre el harness; si un problema se repite, mejorar guías/sensores.
- 7.5 **Timing — "keep quality left":** qué corre antes del commit, qué en CI, qué de forma continua (drift, dead code, dependencias), qué en runtime (SLOs, logs).
- 7.6 **Categorías de regulación:**
  - *Maintainability harness* (calidad interna — lo más maduro hoy).
  - *Architecture fitness harness* (fitness functions: performance, observabilidad, límites de módulos).
  - *Behaviour harness* (¿hace lo que tiene que hacer? — el problema abierto; acá entra SDD).
- 7.7 **Harnessability:** hay codebases más "harnesseables" que otras (tipado fuerte, tests rápidos, límites claros). Ley de Ashby (variedad requisita).
- 7.8 Harness templates y el rol del humano.

## Módulo 8 — Componentes concretos del harness 🟡

- 8.1 **Archivos de instrucciones:** `AGENTS.md` (estándar abierto, +60k repos; jerárquico, el más cercano gana), `CLAUDE.md`, reglas de Cursor, steering de Kiro. Regla de OpenAI: **"un mapa, no un manual de 1.000 páginas"** (~100 líneas apuntando a `docs/`).
- 8.2 **Repo como sistema de registro:** `ARCHITECTURE.md`, `docs/design-docs/`, `docs/exec-plans/{active,completed}/`, `product-specs/`, `references/*-llms.txt`, `QUALITY_SCORE.md`. *Lo que el agente no ve en contexto, no existe.*
- 8.3 **Agent Skills** (estándar abierto, `SKILL.md` con frontmatter `name`/`description`; `scripts/`, `references/`, `assets/`) y **progressive disclosure** (metadata ~100 tokens → instrucciones → archivos bajo demanda).
- 8.4 **Herramientas y MCP** (Model Context Protocol): diseño de herramientas, descripciones, cuántas dar.
- 8.5 **Hooks / middleware:** chequeos deterministas pre/post acción (lint al guardar, bloquear comandos peligrosos, continuar el loop).
- 8.6 **Subagentes y orquestación:** aislar contexto, revisores, planner/generator/evaluator.
- 8.7 **Sandbox y seguridad:** permisos, aprobaciones, aislamiento por worktree, prompt injection.
- 8.8 **Legibilidad de la app para el agente:** app levantable por worktree, Chrome DevTools Protocol, logs/métricas/trazas consultables (LogQL/PromQL), screenshots.
- 8.9 **Memoria y estado entre sesiones:** progress files, `init.sh`, git como log, execution plans.
- 8.10 **Mantenimiento:** agentes de "doc-gardening", linters que validan la base de conocimiento, evitar que el harness se pudra.

## Módulo 9 — Anatomía interna de un harness (construir el tuyo) 🔴

- 9.1 El loop agéntico mínimo: prompt → tool call → switch → contexto acumulado → repetir (12-Factor Agents).
- 9.2 Los subsistemas canónicos (paper arXiv 2609.00006, 11 harnesses analizados: Claude Code, Codex CLI, Gemini CLI, OpenHands, Aider, Mini-SWE-Agent, OpenCode, etc.): loop, herramientas, gestión de contexto, controles de seguridad, orquestación, superficies de extensión (skills, MCP, ACP).
- 9.3 Hallazgos: nadie usa frameworks agénticos generales en runtime; nadie recupera código con embeddings (retrieval determinista: grep/ripgrep); skills superan a MCP en adopción; la política migra de prompt a configuración.
- 9.4 Frameworks para construir: Claude Agent SDK, LangChain `create_agent` + middleware, Deep Agents, OpenAI Agents SDK.
- 9.5 Evaluar tu harness: evals, medir cómo se usa realmente, reducir al mínimo, reemplazar reglas por scripts (marmelab).
- 9.6 Harness engineering automático (paper "Agentic Harness Engineering", arXiv 2604.25850).

## Módulo 9b — Prompting y eficiencia de tokens (reducir costo de planificación) 🟡→🔴

**Objetivo:** convertir la planificación con agentes en algo barato por diseño. Dos frentes: **menos tokens entrando/saliendo** y **menos tokens desperdiciados en re-trabajo**.

### A. Higiene de tokens en prompts y specs

- 9b.1 Specs concisas: describir decisiones, no código. Regla de Pocock: **sin file paths ni snippets** en la spec (envejecen mal y gastan tokens); el código va solo cuando un prototipo lo expresa mejor que la prosa.
- 9b.2 **Glosario de dominio** (`GLOSSARY.md`): un lenguaje ubicuo comprime cada prompt y cada respuesta, sesión tras sesión. Es la técnica de ahorro más subestimada.
- 9b.3 Un ticket = una ventana de contexto: tamaño de unidad que minimiza re-exploración y re-lectura de historia (tracer bullets; también "una cosa por loop" en Ralph).
- 9b.4 **Punteros de contexto** en vez de copiar contenido: pasar paths/refs a spec, tickets, notas y commits entre subagentes.
- 9b.5 AGENTS.md como mapa de ~100 líneas (OpenAI); progressive disclosure en skills (metadata ~100 tokens → cuerpo → archivos a demanda).
- 9b.6 Cuidar el output: pedir diffs firmados/salidas estructuradas; herramientas que devuelven solo lo relevante.

### B. Arquitectura para gastar menos

- 9b.7 **Routing por riesgo:** modelo caro solo donde el riesgo lo paga — router local/barato para el grueso, panel multi-modelo para decisiones de alto costo (arquitectura, seguridad, root cause). Ejemplo: `raydocs/fusion-deck` (skill: una pregunta difícil → Claude+GPT+Gemini en paralelo a ciegas → Claude juzga; `/fusion-auto` manda trabajo de bajo riesgo a un solo modelo).
- 9b.8 **Orquestación "decisions-only"**: el orquestador decide, los workers baratos ejecutan — no quemar la ventana principal en trabajo delegable (`hurttlocker/token-lean`, archivo único de markdown; patrón orchestrator-worker de Anthropic).
- 9b.9 **Subagentes de exploración** que devuelven notas (resumen), no la exploración entera.
- 9b.10 **Retrieval determinista en vez de vector/RAG:** el campo corre en grep/AST — ningún harness de producción usa embeddings para código (arXiv 2609.00006). `Graphify-Labs/graphify`: skill `/graphify` que mapea el repo a un grafo de conocimiento (tree-sitter, sin LLM en el índice) consultable en vez de releer archivos — reporta ~70x menos tokens por consulta y ~80% menos gasto de tokens de agente.
- 9b.11 **Compresión de salida de comandos:** `rtk` (proxy Rust que filtra/comprime output de `ls`, `git`, tests, etc. vía hooks `PreToolUse` — hasta 90% menos bytes de bash leídos por el modelo, soporta Claude Code, Codex, Cursor, Copilot, Gemini...).
- 9b.12 **Palancas de plataforma** (docs Anthropic "optimizing for cost"): prompt caching (el mayor lever — el costo del loop crece ~con el cuadrado de los turnos si no hay cache), input trimming, batch processing, límites de presupuesto, elección de modelo y esfuerzo de razonamiento.
- 9b.13 Medición: ledger de gasto por corrida, evals del harness, retro post-sesión para detectar tool calls caros.

### C. Frameworks de skills para SDD/Harness (panorama)

| Colección | Qué es | Enfoque |
|---|---|---|
| `mattpocock/skills` | ~20 skills composables (grilling, spec→tickets→implement, TDD, review, retro) | Control del usuario, proceso liviano |
| `obra/Superpowers` | Metodología completa: brainstorming, writing-plans, executing-plans, subagent development + code review, systematic debugging | Más estructura, plugin oficial |
| `raydocs/fusion-deck` | Panel multi-modelo + workflows de plan/context/review/orchestrate | Gastar modelos extra solo si el riesgo lo amerita |
| `Graphify-Labs/graphify` | Knowledge graph del repo consultable por el agente | Menos tokens de exploración |
| `hurttlocker/token-lean` | Disciplina de orquestación decisions-only en un markdown | Orquestador barato |
| `rtk-ai/rtk` | Proxy de comandos que comprime salidas | Menos tokens de bash |
| Spec Kit / OpenSpec / Kiro | SDD clásico (ver módulo 5) | Proceso por fases |

- 9b.14 Regla práctica para la app: **todo ahorro de tokens es un problema de diseño del harness** (qué ve el modelo y cuándo), no de prompts más largos. El esfuerzo va a: mejor señal, no más texto.

---

## PARTE C — INTEGRACIÓN Y TEMAS AVANZADOS

## Módulo 10 — SDD + Harness juntos 🟡→🔴

- 10.1 La spec como **guía feedforward** del *behaviour harness*; los escenarios Given/When/Then como **sensores** (tests de aceptación).
- 10.2 Constitution/steering = memory bank = parte del harness.
- 10.3 Pipeline integrado: spec → plan → tasks → implementación en loop → sensores (tests, lint, revisión IA) → PR → archivar spec.
- 10.4 Trazabilidad spec ↔ código ↔ tests y detección de drift.
- 10.5 Plans como artefactos versionados (exec-plans de OpenAI ≈ tasks.md de SDD).

## Módulo 11 — Agentes de larga duración y multi-agente 🔴

- 11.1 **Initializer agent + coding agent** (Anthropic): `init.sh`, archivo de progreso, lista de features, una feature por sesión, dejar el entorno "limpio".
- 11.2 **Planner / Generator / Evaluator** (Anthropic, mar 2026), "context anxiety", resets vs. compaction.
- 11.3 **Ralph Wiggum loop** (Geoffrey Huntley): `while :; do cat PROMPT.md | claude ; done` — una tarea por iteración, specs en carpeta, contexto principal como scheduler de subagentes.
- 11.4 Revisión agente-a-agente hasta que todos los revisores aprueben (OpenAI).
- 11.5 Tareas de 6+ horas, agentes en background ("always have an agent running" — Hashimoto).
- 11.6 Cuándo NO usar multi-agente (complejidad tipo microservicios no deterministas).

## Módulo 12 — Críticas, riesgos y futuro 🟡

- 12.1 **"¿SDD es waterfall?"** — gates secuenciales, artefactos de handoff; contraargumento: un solo loop, la spec nunca va a un backlog (Thoughtworks podcast).
- 12.2 Thoughtworks Tech Radar: workflows elaborados y opinados, specs largas difíciles de revisar, posible "bitter lesson" de reglas artesanales.
- 12.3 Ningún sensor detecta: diagnóstico erróneo, sobre-ingeniería, instrucciones malentendidas. La corrección está fuera de alcance si el humano no especificó bien.
- 12.4 Costos (tokens), seguridad, revisión humana como cuello de botella.
- 12.5 Rol cambiante del ingeniero: de escribir código a diseñar entornos, especificar intención y construir loops de feedback.
- 12.6 Tendencias: harness como plataforma, meta-harnesses, harness auto-evolutivo, specs como grafo consultable.

---

## Ruta de aprendizaje sugerida

| Semana | Módulos | Entregable práctico |
|---|---|---|
| 1 | 1, 2 | Glosario propio + resumen de context engineering |
| 2 | 3, 4 | Escribir 1 spec en EARS + Given/When/Then |
| 3 | 5 | Misma feature con Spec Kit y OpenSpec, comparar |
| 4 | 6, 7 | Diagnosticar el harness de un repo propio (guías vs. sensores) |
| 5 | 8, 5b | Crear AGENTS.md "mapa", 1 skill, 1 hook; correr flujo Pocock completo |
| 6 | 9, 9b | Construir un mini-agente (loop + 3 herramientas); instalar rtk/graphify |
| 7 | 10, 11 | Pipeline spec → loop agéntico → tests → PR |
| 8 | 12 | Ensayo crítico / decisión de adopción para un equipo |

---

## Biblioteca de fuentes (núcleo)

**SDD**
- Birgitta Böckeler — *Understanding Spec-Driven Development: Kiro, spec-kit, and Tessl* — https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
- GitHub Spec Kit — https://github.com/github/spec-kit (manifiesto `spec-driven.md`, `docs/reference/agentic-sdd.md`)
- Kiro Specs — https://kiro.dev/docs/specs/
- OpenSpec — https://github.com/Fission-AI/OpenSpec
- Tessl — https://tessl.io/blog/tessl-launches-spec-driven-framework-and-registry
- BMAD Method — https://github.com/bmad-code-org/BMAD-METHOD
- Thoughtworks Radar: Spec-driven development — https://www.thoughtworks.com/radar/techniques/spec-driven-development
- Thoughtworks podcast: What is spec-driven development? — https://www.thoughtworks.com/en-gb/insights/podcasts/technology-podcasts/what-is-spec-driven-development

**Harness**
- OpenAI — *Harness engineering: leveraging Codex in an agent-first world* — https://openai.com/index/harness-engineering/
- Böckeler — *Harness engineering for coding agent users* — https://martinfowler.com/articles/harness-engineering.html
- Anthropic — *Effective harnesses for long-running agents* — https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic — *Harness design for long-running application development* — https://www.anthropic.com/engineering/harness-design-long-running-apps
- Mitchell Hashimoto — *My AI Adoption Journey* — https://mitchellh.com/writing/my-ai-adoption-journey
- LangChain — *The Anatomy of an Agent Harness* — https://www.langchain.com/blog/the-anatomy-of-an-agent-harness
- marmelab — *The State of AI Harness Engineering 2026* — https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html
- Paper — *Harness Engineering: Anatomy, Architecture, and Evolution of Coding Agents* — https://arxiv.org/abs/2609.00006
- Paper — *Agentic Harness Engineering* — https://arxiv.org/abs/2604.25850

**Transversales**
- Anthropic — *Effective context engineering for AI agents* — https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- 12-Factor Agents — https://github.com/humanlayer/12-factor-agents
- AGENTS.md — https://agents.md
- Agent Skills — https://agentskills.io
- Geoffrey Huntley — *Ralph Wiggum as a software engineer* — https://ghuntley.com/ralph/

**Skills, prompting y eficiencia de tokens**
- Matt Pocock — *Skills for Real Engineers* — https://github.com/mattpocock/skills (+ docs en https://aihero.dev/skills)
- Superpowers (obra) — https://github.com/obra/Superpowers
- fusion-deck (panel multi-modelo) — https://github.com/raydocs/fusion-deck
- token-lean (orquestación decisions-only) — https://github.com/hurttlocker/token-lean
- Graphify (knowledge graph del repo) — https://github.com/Graphify-Labs/graphify
- RTK (compresión de output de comandos) — https://github.com/RTK-AI/rtk
- Anthropic — *Optimizing for cost and intelligence* — https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence

---

## Propuesta para la app (solo ideas, nada implementado)

**Secciones**
1. **Mapa interactivo** — grafo de módulos/conceptos con dependencias (prerrequisitos), progreso por nodo.
2. **Lecciones** — una página por subtema (contenido en Markdown/MDX), con nivel, tiempo estimado y fuentes.
3. **Glosario** — términos enlazados desde las lecciones (EARS, delta spec, guía/sensor, compaction, etc.).
4. **Comparador de herramientas** — tabla filtrable (Spec Kit, Kiro, OpenSpec, Tessl, BMAD; Claude Code, Codex, etc.).
5. **Biblioteca** — fuentes etiquetadas por tema, tipo (artículo, paper, repo, video) y fecha.
6. **Laboratorios** — ejercicios guiados (escribir una spec en EARS, armar un AGENTS.md, diseñar guías/sensores).
7. **Quizzes / flashcards** — repaso espaciado por módulo.
8. **Progreso** — checklist personal y ruta de 8 semanas.

**Modelo de contenido (borrador)**
- `Module { id, title, level, order, prerequisites[], topics[] }`
- `Topic { id, moduleId, title, summary, body(md), sources[], glossaryTerms[], exercises[] }`
- `Source { id, title, author, url, date, type, tags[] }`
- `Term { id, term, definition, related[] }`
- `Tool { id, name, category: 'sdd'|'harness', sddLevel?, workflow, artifacts[], url }`

**Decisiones tomadas**
- Stack: **Astro** (todo estático; Content Collections para módulos/lecciones/fuentes, Tailwind si hace falta).

**Decisiones abiertas** (para cuando implementemos)
- ¿Progreso local (localStorage) o con cuentas/back-end?
- ¿Contenido solo en español o bilingüe?
- ¿Mapa como grafo visual (React Flow / D3) o como árbol/lista?
