# Glosario

Términos clave del mapa de estudio, organizados por dominio.

## Fundamentos y contexto

- **Agente** — Un modelo llamando herramientas en un loop hasta completar una tarea. `Agente = Modelo + Harness`.
- **Harness** — Todo lo que no es el modelo: system prompt, herramientas, skills, MCP, hooks, orquestación, sandbox. Existe el *inner harness* (el que trae el agente, p. ej. Claude Code) y el *outer harness* (el que construís para tu repo).
- **Ventana de contexto** — El conjunto finito de tokens que el modelo puede ver en cada inferencia. Todo lo que no está ahí, para el agente no existe.
- **Context engineering** — El arte de curar y mantener el conjunto óptimo de tokens durante la inferencia: el menor conjunto de alta señal que maximice el resultado.
- **Compaction** — Resumir la conversación en el lugar para seguir trabajando con el mismo agente y un historial más corto.
- **Context reset** — Empezar una sesión nueva con un agente fresco + un artefacto de handoff que trae el estado necesario. Soluciona la "ansiedad de contexto".
- **Handoff** — Documento compacto que permite a otro agente (o sesión) continuar el trabajo.
- **Subagente** — Agente hijo que trabaja con contexto propio y devuelve un resultado (resumen), usado para aislar trabajo pesado de la ventana principal.
- **Progressive disclosure** — Cargar detalle solo cuando se necesita: metadata (~100 tokens) → instrucciones → archivos de referencia a demanda.
- **Prompt caching** — Cachear el prefijo del prompt (system prompt, historial) para que cada turno del loop no repague el contexto completo.

## Spec-Driven Development

- **Spec** — Artefacto estructurado, orientado a comportamiento y escrito en lenguaje natural, que expresa funcionalidad y guía a agentes de código.
- **Spec-first** — La spec se escribe antes y se usa para la tarea actual (el nivel mínimo de SDD).
- **Spec-anchored** — La spec se mantiene viva tras la tarea y guía la evolución de la feature.
- **Spec-as-source** — El humano solo edita la spec; el código se regenera (`GENERATED FROM SPEC — DO NOT EDIT`).
- **Memory bank / steering** — Contexto que aplica a todas las sesiones del repo (AGENTS.md, constitution, GLOSSARY.md), distinto de la spec que es por feature.
- **Constitution** — Principios "inmutables" del proyecto en Spec Kit; evalúan cada fase posterior.
- **EARS** — Easy Approach to Requirements Syntax: `WHEN [condición] THE SYSTEM SHALL [comportamiento]`. Usado por Kiro.
- **Given/When/Then** — Escenarios de aceptación (dado/cuando/entonces) que se traducen a tests.
- **Delta spec** — En OpenSpec: el cambio expresado como `ADDED / MODIFIED / REMOVED` requisitos respecto a la spec actual. Clave para brownfield.
- **NEEDS CLARIFICATION** — Marcador de ambigüedad en specs que obliga a resolver o investigar antes de planificar.
- **Tracer bullet** — Ticket que corta una slice vertical completa (schema→API→UI→tests), demoable por sí solo. Enfoque de Matt Pocock.
- **Grilling** — Sesión donde el agente *te entrevista* con preguntas detalladas hasta resolver cada rama del árbol de diseño (skills de Pocock).
- **Lenguaje ubicuo / GLOSSARY.md** — Vocabulario de dominio compartido que comprime prompts y respuestas (1 palabra en vez de 20).

## Harness Engineering

- **Guía (feedforward)** — Control que anticipa y orienta al agente antes de actuar: AGENTS.md, skills, scripts de bootstrap.
- **Sensor (feedback)** — Control que observa después y permite autocorrección: tests, linters, type checkers, revisión por IA.
- **Computacional vs. inferencial** — Controles deterministas/rápidos/baratos (CPU) vs. semánticos/caros/no deterministas (LLM como juez).
- **Steering loop** — El trabajo del humano: iterar sobre el harness cuando un problema se repite.
- **Keep quality left** — Correr los chequeos lo antes posible en el ciclo del cambio (antes del commit < CI < runtime).
- **Fitness function** — Test automático de una característica arquitectónica (performance, observabilidad, límites de módulos).
- **Harnessability** — Qué tan fácil es "arnezar" un codebase: tipado fuerte, tests rápidos, límites claros ayudan.
- **Agent Skills** — Estándar abierto: `SKILL.md` con frontmatter `name`/`description` + `scripts/`/`references/`/`assets/`; se cargan por progressive disclosure.
- **MCP (Model Context Protocol)** — Protocolo abierto para exponer herramientas y datos a agentes.
- **Hooks** — Ejecuciones deterministas en puntos del ciclo del agente (pre/post tool use, on save, etc.).
- **Hook-based linting** — Correr chequeos computacionales automáticamente tras cada acción del agente.
- **ACU** — Agent Compute Unit; unidad de costo/computación por sesión de agente.
- **Doc-gardening** — Agente o lint que mantiene la base de conocimiento del repo (docs frescas, links válidos).

## Prácticas y métodos

- **Vibe coding** — Programar con prompts sin estructura: rápido para prototipos, no escala.
- **Ralph Wiggum loop** — `while :; do cat PROMPT.md | agent; done` — una tarea por iteración en loop continuo (Geoffrey Huntley).
- **Initializer agent** — Primer agente que arma el entorno: `init.sh`, archivo de progreso, lista de features (Anthropic).
- **Planner / Generator / Evaluator** — Arquitectura multi-agente para builds largas: uno descompone, otro implementa, otro juzga.
- **Orchestrator-worker** — El orquestador decide y delega; workers baratos ejecutan en contextos propios.
- **Decisions-only orchestration** — Disciplina de orquestación donde el orquestador solo toma decisiones y delega todo el trabajo.
- **Retro** — Post-sesión que sugiere mejoras al entorno del agente (navegación, checks, estándares, tooling).
- **TDD / red-green-refactor** — Test que falla → código mínimo que pasa → refactor. Feedback loop por excelencia.
- **Wayfinding** — Planificar trabajo mayor que una sesión como mapa de tickets de decisión en el issue tracker.
- **Worktree** — Directorio de trabajo git aislado por tarea/rama; permite paralelismo entre subagentes.
- **Brownfield / greenfield** — Proyecto existente vs. proyecto nuevo; exige enfoques SDD distintos (delta specs vs. spec completa).
