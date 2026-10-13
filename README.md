# SDD & Harness — App de estudio

Aplicación web estática (Astro) para estudiar **Spec-Driven Development (SDD)** y **Harness Engineering**: el arte de diseñar el entorno que hace a los agentes de IA confiables.

## Estado

Repositorio inicial. El mapa de estudio completo (módulos, fuentes, ruta de 8 semanas, propuesta de secciones de la app) está en [`docs/mapa-de-estudio.md`](docs/mapa-de-estudio.md).

## Secciones planeadas

- Mapa interactivo de módulos y conceptos con progreso
- Lecciones por subtema (Markdown/MDX), con nivel y fuentes
- Glosario (EARS, delta spec, guía/sensor, compaction, ...)
- Comparador de herramientas (Spec Kit, Kiro, OpenSpec, Tessl, BMAD, mattpocock/skills, Superpowers, graphify, rtk, ...)
- Biblioteca de fuentes etiquetada
- Laboratorios y quizzes

## Desarrollo

```sh
pnpm install
pnpm dev       # o: astro dev --background
pnpm build     # build de producción a ./dist/
pnpm preview   # preview del build
```

Requiere Node >= 22.12 y pnpm.
