---
id: M5b
---

## La alternativa de abajo hacia arriba

Matt Pocock (`mattpocock/skills`) propone el camino opuesto a los frameworks de SDD: en vez de que el framework **posea el proceso** (Spec Kit, BMAD, GSD te dicen exactamente qué fases seguir), su colección son **skills chicas, composables y editables**. El humano conserva el control y — punto clave — cuando el proceso falla, el bug es arreglable porque el proceso es un conjunto de archivos que vos entendés.

La premisa: los agentes fallan de formas conocidas — mala alineación, verbosidad, código que no corre, entropía de diseño — y cada skill existe para corregir uno de esos modos de fallo. Compatible con Claude Code (plugin oficial), Codex, Copilot, Gemini, Cursor, Devin (`npx skills add`).

## Grilling: la solución a la mala alineación

El fallo #1 del trabajo con agentes es que construyen *otra cosa*. La respuesta de Pocock no es una spec más larga sino una **entrevista**: `/grill-me` hace que el agente te pregunte, una por una, hasta resolver cada rama del árbol de decisión de diseño. `/grill-with-docs` lo combina con `domain-modeling` para producir además el glosario del dominio.

La idea: la spec escrita en frío siempre deja decisiones implícitas. La sesión de preguntas las hace explícitas antes de gastar un token en código.

## Lenguaje compartido (GLOSSARY.md)

`grill-with-docs` + `domain-modeling` producen `GLOSSARY.md` y ADRs: un vocabulario ubicuo del dominio. El beneficio es doble y conecta con eficiencia de tokens (módulo M9b): con un glosario, el agente usa **1 palabra en vez de 20** para referirse a un concepto, y gasta menos tokens razonando sobre qué significa cada término. "Materialization cascade" reemplaza una oración entera, cada vez que aparece, en cada sesión.

## El pipeline: spec → tickets → implementación

```
/grill-me  →  /to-spec  →  /to-tickets  →  /implement-spec
```

- **`/to-spec`**: sintetiza la conversación de grilling en una spec — problema, solución, user stories, decisiones de implementación y de testing — y la publica al issue tracker con label `ready-for-agent`. La spec vive en el tracker, no en una carpeta muerta.
- **`/to-tickets`**: corta la spec en **tracer bullets**: slices verticales completas y demoables (un cambio que atraviesa todas las capas y produce algo visible), cada una dimensionada para caber en *una ventana de contexto fresca*. Los tickets llevan aristas `blocked-by` → forman un **grafo de tareas (DAG)**, no una lista.
- **`/implement-spec`**: recorre el grafo. Los subagentes implementadores atacan la *frontera disponible* (todos los tickets no bloqueados) en worktrees de git en paralelo; un subagente merger integra; `/code-review` cierra con dos ejes — estándares de código + fidelidad a la spec.

El diseño es deliberado sobre contexto: el implementador sufre presión de contexto; el revisor recibe solo el diff. Por eso los estándares viven en `CODING_STANDARDS.md` (que se lee en review) y no en AGENTS.md — cada archivo se carga donde se usa, no donde estorba.

## Gestión de contexto como diseño

Skills que son context engineering aplicado:

- **`handoff`**: compactar la sesión en un artefacto para que otro agente (o vos) continúe.
- **`wayfinder`**: para trabajo de más de una sesión — un mapa de *decisiones* en tickets en el tracker, no de tareas mecánicas.
- **Punteros de contexto**: los subagentes reciben referencias (spec, ticket, nota, commit), nunca copias de información. Duplicar = tokens desperdiciados + versiones divergentes.
- **`retro`**: post-sesión, el agente sugiere mejoras del entorno — navegación, checks, estándares, economía de herramientas. Es harness engineering puro: el propio proceso produce mejoras del proceso.

## Bucle de calidad

- **`/tdd`**: red-green-refactor con tests en *seams* (puntos de prueba pre-acordados en la fase de planificación, no adivinados por el implementador).
- **`/diagnosing-bugs`**: diagnóstico disciplinado por fases — reproducir, aislar, hipótesis, fix — en vez del "prueba cosas hasta que ande".
- **`/code-review`**: dos ejes (estándares + fidelidad a la spec), contexto separado del implementador.
- **`codebase-design` / `improve-codebase-architecture`**: módulos *deep* al estilo Ousterhout — pelear contra la bola de barro que los agentes aceleran.

## Por qué importa para SDD

Es spec-anchored sin waterfall: la spec vive en el tracker, los tickets son el DAG, cada ticket es una unidad de una ventana de contexto, y la implementación corre en paralelo donde el grafo lo permite. Menos ceremonial que Spec Kit, más estructura que "pedile al agente".

## Ejercicio

Instalar `npx skills add mattpocock/skills` en un repo y correr el flujo completo en una feature real: grill → to-spec → to-tickets → implement-spec. Comparar contra una corrida "directa" del agente.

## Fuentes

- `mattpocock/skills` — repo + docs en aihero.dev/skills
