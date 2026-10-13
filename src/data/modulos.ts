export type Nivel = 'basico' | 'intermedio' | 'avanzado';
export type Parte = 'fundamentos' | 'sdd' | 'harness' | 'integracion';

export interface Modulo {
	id: string;
	titulo: string;
	nivel: Nivel;
	parte: Parte;
	resumen: string;
	temas: string[];
	deps: string[];
	/** Posición en el canvas 1200x980 (centro del nodo) */
	x: number;
	y: number;
}

export const partes: Record<Parte, { nombre: string; clase: string }> = {
	fundamentos: { nombre: 'Fundamentos', clase: 'parte-fundamentos' },
	sdd: { nombre: 'Spec-Driven Development', clase: 'parte-sdd' },
	harness: { nombre: 'Harness Engineering', clase: 'parte-harness' },
	integracion: { nombre: 'Integración y temas avanzados', clase: 'parte-integracion' },
};

export const modulos: Modulo[] = [
	{
		id: 'M1',
		titulo: 'Fundamentos: LLMs, agentes y contexto',
		nivel: 'basico',
		parte: 'fundamentos',
		resumen:
			'Qué es un agente de código, la ecuación Agente = Modelo + Harness, límites de los LLMs y evolución de prácticas hasta hoy.',
		temas: [
			'LLM vs. chatbot vs. agente (loop de tool calls)',
			'Agente = Modelo + Harness',
			'No determinismo, contexto finito, context rot',
			'Prompt eng → context eng → SDD → harness eng',
			'Vibe coding vs. ingeniería asistida',
		],
		deps: [],
		x: 340,
		y: 70,
	},
	{
		id: 'M2',
		titulo: 'Context Engineering',
		nivel: 'basico',
		parte: 'fundamentos',
		resumen:
			'Curar el conjunto óptimo de tokens: menor conjunto de alta señal. Puente conceptual entre SDD y harness.',
		temas: [
			'Menor conjunto de tokens de alta señal',
			'Progressive disclosure y just-in-time retrieval',
			'Compaction vs. context reset vs. handoffs',
			'12-Factor Agents (own your prompts/context/flow)',
		],
		deps: ['M1'],
		x: 820,
		y: 70,
	},
	{
		id: 'M3',
		titulo: 'Conceptos de SDD',
		nivel: 'basico',
		parte: 'sdd',
		resumen:
			'La spec como fuente de verdad para humano y agente: la inversión de poder, qué es una spec y los tres niveles de SDD.',
		temas: [
			'Spec-first, spec-anchored, spec-as-source',
			'La inversión de poder: el código sirve a la spec',
			'Spec vs. memory bank / reglas',
			'Relación con PRD, BDD, TDD, ADRs',
		],
		deps: ['M1', 'M2'],
		x: 230,
		y: 255,
	},
	{
		id: 'M4',
		titulo: 'Anatomía de una spec',
		nivel: 'intermedio',
		parte: 'sdd',
		resumen:
			'Cómo escribir specs que un agente pueda ejecutar: EARS, Given/When/Then, delta specs y antipatrones.',
		temas: [
			'Qué/por qué vs. cómo vs. pasos',
			'EARS: WHEN…THE SYSTEM SHALL…',
			'Given/When/Then → tests',
			'Delta specs: ADDED/MODIFIED/REMOVED',
			'NEEDS CLARIFICATION, trazabilidad, antipatrones',
		],
		deps: ['M3'],
		x: 230,
		y: 400,
	},
	{
		id: 'M5',
		titulo: 'Herramientas de SDD',
		nivel: 'intermedio',
		parte: 'sdd',
		resumen:
			'Panorama comparativo: Spec Kit, Kiro, OpenSpec, Tessl y BMAD. Cuándo usar cada una y cuándo no usar SDD.',
		temas: [
			'Spec Kit: constitution → specify → plan → tasks',
			'Kiro: requirements/design/tasks + EARS',
			'OpenSpec: delta specs y archive (brownfield)',
			'Tessl: spec-as-source y Spec Registry',
			'BMAD: agentes por rol',
		],
		deps: ['M4'],
		x: 230,
		y: 545,
	},
	{
		id: 'M5b',
		titulo: 'El enfoque Pocock: SDD por skills',
		nivel: 'intermedio',
		parte: 'sdd',
		resumen:
			'La alternativa liviana a los frameworks: skills composables, grilling para alinear, spec → tickets (tracer bullets) → implement-spec.',
		temas: [
			'Skills chicas vs. frameworks que poseen el proceso',
			'Grilling: el agente te entrevista',
			'GLOSSARY.md y lenguaje ubicuo',
			'Tickets = 1 ventana de contexto, DAG de tareas',
			'Retro: mejora continua del harness',
		],
		deps: ['M5'],
		x: 230,
		y: 690,
	},
	{
		id: 'M6',
		titulo: 'Conceptos de Harness',
		nivel: 'basico',
		parte: 'harness',
		resumen:
			'Todo lo que no es el modelo. Inner vs. outer harness, orígenes del término y el caso OpenAI (1M LOC, 0 líneas a mano).',
		temas: [
			'Definición: prompts, tools, skills, MCP, hooks, orquestación',
			'Inner harness vs. outer harness',
			'Hashimoto: “Engineer the Harness”',
			'Caso OpenAI: humans steer, agents execute',
		],
		deps: ['M1', 'M2'],
		x: 950,
		y: 255,
	},
	{
		id: 'M7',
		titulo: 'Guías, sensores y el loop de control',
		nivel: 'intermedio',
		parte: 'harness',
		resumen:
			'El modelo mental de Böckeler: feedforward vs. feedback, computacional vs. inferencial, keep quality left.',
		temas: [
			'Guías (feedforward) y sensores (feedback)',
			'Computacional vs. inferencial',
			'Steering loop: iterar sobre el harness',
			'Keep quality left; mantainability/arch/behaviour harness',
			'Harnessability y ley de Ashby',
		],
		deps: ['M6'],
		x: 950,
		y: 400,
	},
	{
		id: 'M8',
		titulo: 'Componentes del harness',
		nivel: 'intermedio',
		parte: 'harness',
		resumen:
			'Las piezas concretas: AGENTS.md, skills, hooks, subagentes, sandbox, legibilidad de la app y memoria entre sesiones.',
		temas: [
			'AGENTS.md como mapa (~100 líneas)',
			'Repo como sistema de registro (docs/)',
			'Agent Skills + progressive disclosure',
			'Hooks, subagentes, sandbox, worktrees',
			'Legibilidad: logs, métricas, CDP, screenshots',
		],
		deps: ['M7'],
		x: 950,
		y: 545,
	},
	{
		id: 'M9',
		titulo: 'Anatomía interna de un harness',
		nivel: 'avanzado',
		parte: 'harness',
		resumen:
			'Construir el tuyo: el loop agéntico mínimo, subsistemas canónicos de 11 harnesses reales y frameworks.',
		temas: [
			'Loop mínimo: prompt → tool call → switch → contexto',
			'7 subsistemas canónicos (arXiv 2609.00006)',
			'Nadie usa frameworks ni embeddings en runtime',
			'Claude Agent SDK, LangChain, Deep Agents',
			'Evals del harness; meta-harnesses',
		],
		deps: ['M8'],
		x: 975,
		y: 690,
	},
	{
		id: 'M9b',
		titulo: 'Eficiencia de tokens y costo',
		nivel: 'avanzado',
		parte: 'harness',
		resumen:
			'Planificar barato: higiene de tokens, routing por riesgo, orquestación decisions-only, retrieval determinista y compresión de outputs.',
		temas: [
			'Glosario de dominio comprime todo',
			'Punteros de contexto, no duplicar datos',
			'Routing por riesgo (fusion-deck, multi-modelo)',
			'graphify: grafo del repo, ~80% menos tokens',
			'rtk: comprime salidas de bash hasta 90%',
			'Prompt caching y palancas de plataforma',
		],
		deps: ['M8'],
		x: 745,
		y: 690,
	},
	{
		id: 'M10',
		titulo: 'SDD + Harness juntos',
		nivel: 'avanzado',
		parte: 'integracion',
		resumen:
			'La spec como guía feedforward del behaviour harness; escenarios como sensores; trazabilidad spec↔código↔tests.',
		temas: [
			'Spec = guía; Given/When/Then = sensores',
			'Constitution/steering como memoria del harness',
			'Pipeline: spec → plan → tasks → loop → PR',
			'Drift spec↔código; exec-plans versionados',
		],
		deps: ['M5b', 'M9'],
		x: 400,
		y: 855,
	},
	{
		id: 'M11',
		titulo: 'Agentes de larga duración y multi-agente',
		nivel: 'avanzado',
		parte: 'integracion',
		resumen:
			'Trabajo de horas: initializer+coding agent, planner/generator/evaluator, Ralph Wiggum loop y revisión agente-a-agente.',
		temas: [
			'Initializer agent, archivo de progreso, estado limpio',
			'Planner / Generator / Evaluator',
			'Context anxiety: reset vs. compaction',
			'Ralph: una tarea por loop, scheduler de subagentes',
			'Cuándo NO multi-agente',
		],
		deps: ['M9', 'M9b'],
		x: 770,
		y: 855,
	},
	{
		id: 'M12',
		titulo: 'Críticas, riesgos y futuro',
		nivel: 'intermedio',
		parte: 'integracion',
		resumen:
			'¿SDD es waterfall? Lo que ningún sensor detecta, costos, seguridad y el nuevo rol del ingeniero.',
		temas: [
			'El debate waterfall vs. un solo loop',
			'Tech Radar: specs largas, bitter lesson',
			'Fallas sin sensor: misdiagnóstico, over-engineering',
			'El ingeniero como diseñador de entornos',
			'Harness como plataforma, auto-evolución',
		],
		deps: ['M10', 'M11'],
		x: 1030,
		y: 855,
	},
];

export const niveles: Record<Nivel, { nombre: string }> = {
	basico: { nombre: 'Básico' },
	intermedio: { nombre: 'Intermedio' },
	avanzado: { nombre: 'Avanzado' },
};

export interface Semana {
	semana: number;
	modulos: string[];
	entregable: string;
}

export const ruta: Semana[] = [
	{ semana: 1, modulos: ['M1', 'M2'], entregable: 'Glosario propio + resumen de context engineering' },
	{ semana: 2, modulos: ['M3', 'M4'], entregable: 'Escribir 1 spec en EARS + Given/When/Then' },
	{ semana: 3, modulos: ['M5'], entregable: 'Misma feature con Spec Kit y OpenSpec, comparar' },
	{ semana: 4, modulos: ['M6', 'M7'], entregable: 'Diagnosticar el harness de un repo propio (guías vs. sensores)' },
	{ semana: 5, modulos: ['M8', 'M5b'], entregable: 'AGENTS.md “mapa”, 1 skill, 1 hook; flujo Pocock completo' },
	{ semana: 6, modulos: ['M9', 'M9b'], entregable: 'Mini-agente (loop + 3 tools); instalar rtk/graphify' },
	{ semana: 7, modulos: ['M10', 'M11'], entregable: 'Pipeline spec → loop agéntico → tests → PR' },
	{ semana: 8, modulos: ['M12'], entregable: 'Ensayo crítico / decisión de adopción para un equipo' },
];

export interface Fuente {
	titulo: string;
	autor: string;
	url: string;
	tipo: 'artículo' | 'paper' | 'repo' | 'doc' | 'podcast';
	anio: number | string;
	tags: Parte[];
}

export const fuentes: Fuente[] = [
	{ titulo: 'Understanding Spec-Driven Development: Kiro, spec-kit, and Tessl', autor: 'Birgitta Böckeler (martinfowler.com)', url: 'https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html', tipo: 'artículo', anio: 2025, tags: ['sdd'] },
	{ titulo: 'Spec Kit', autor: 'GitHub', url: 'https://github.com/github/spec-kit', tipo: 'repo', anio: 2025, tags: ['sdd'] },
	{ titulo: 'Kiro Specs', autor: 'AWS', url: 'https://kiro.dev/docs/specs/', tipo: 'doc', anio: 2025, tags: ['sdd'] },
	{ titulo: 'OpenSpec', autor: 'Fission AI', url: 'https://github.com/Fission-AI/OpenSpec', tipo: 'repo', anio: 2025, tags: ['sdd'] },
	{ titulo: 'Tessl Spec Registry y Framework', autor: 'Tessl', url: 'https://tessl.io/blog/tessl-launches-spec-driven-framework-and-registry', tipo: 'artículo', anio: 2025, tags: ['sdd'] },
	{ titulo: 'BMAD-METHOD', autor: 'bmad-code-org', url: 'https://github.com/bmad-code-org/BMAD-METHOD', tipo: 'repo', anio: 2025, tags: ['sdd'] },
	{ titulo: 'Tech Radar: Spec-driven development', autor: 'Thoughtworks', url: 'https://www.thoughtworks.com/radar/techniques/spec-driven-development', tipo: 'doc', anio: 2025, tags: ['sdd'] },
	{ titulo: 'What is spec-driven development?', autor: 'Thoughtworks Podcast', url: 'https://www.thoughtworks.com/en-gb/insights/podcasts/technology-podcasts/what-is-spec-driven-development', tipo: 'podcast', anio: 2025, tags: ['sdd'] },
	{ titulo: 'Harness engineering: leveraging Codex in an agent-first world', autor: 'Ryan Lopopolo (OpenAI)', url: 'https://openai.com/index/harness-engineering/', tipo: 'artículo', anio: 2026, tags: ['harness'] },
	{ titulo: 'Harness engineering for coding agent users', autor: 'Birgitta Böckeler (martinfowler.com)', url: 'https://martinfowler.com/articles/harness-engineering.html', tipo: 'artículo', anio: 2026, tags: ['harness'] },
	{ titulo: 'Effective harnesses for long-running agents', autor: 'Anthropic', url: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents', tipo: 'artículo', anio: 2025, tags: ['harness'] },
	{ titulo: 'Harness design for long-running application development', autor: 'Anthropic', url: 'https://www.anthropic.com/engineering/harness-design-long-running-apps', tipo: 'artículo', anio: 2026, tags: ['harness'] },
	{ titulo: 'My AI Adoption Journey', autor: 'Mitchell Hashimoto', url: 'https://mitchellh.com/writing/my-ai-adoption-journey', tipo: 'artículo', anio: 2026, tags: ['harness'] },
	{ titulo: 'The Anatomy of an Agent Harness', autor: 'LangChain', url: 'https://www.langchain.com/blog/the-anatomy-of-an-agent-harness', tipo: 'artículo', anio: 2026, tags: ['harness'] },
	{ titulo: 'The State of AI Harness Engineering 2026', autor: 'marmelab', url: 'https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html', tipo: 'artículo', anio: 2026, tags: ['harness'] },
	{ titulo: 'Harness Engineering: Anatomy of 11 Coding Agents', autor: 'Barbaste et al.', url: 'https://arxiv.org/abs/2609.00006', tipo: 'paper', anio: 2026, tags: ['harness'] },
	{ titulo: 'Agentic Harness Engineering (AHE)', autor: 'arXiv', url: 'https://arxiv.org/abs/2604.25850', tipo: 'paper', anio: 2026, tags: ['harness'] },
	{ titulo: 'Effective context engineering for AI agents', autor: 'Anthropic', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', tipo: 'artículo', anio: 2025, tags: ['fundamentos'] },
	{ titulo: '12-Factor Agents', autor: 'HumanLayer (Dex Horthy)', url: 'https://github.com/humanlayer/12-factor-agents', tipo: 'repo', anio: 2025, tags: ['fundamentos'] },
	{ titulo: 'AGENTS.md', autor: 'agents.md', url: 'https://agents.md', tipo: 'doc', anio: 2025, tags: ['harness'] },
	{ titulo: 'Agent Skills (formato abierto)', autor: 'agentskills.io', url: 'https://agentskills.io', tipo: 'doc', anio: 2025, tags: ['harness'] },
	{ titulo: 'Ralph Wiggum as a software engineer', autor: 'Geoffrey Huntley', url: 'https://ghuntley.com/ralph/', tipo: 'artículo', anio: 2025, tags: ['integracion'] },
	{ titulo: 'Skills for Real Engineers', autor: 'Matt Pocock', url: 'https://github.com/mattpocock/skills', tipo: 'repo', anio: 2026, tags: ['sdd', 'harness'] },
	{ titulo: 'Superpowers', autor: 'obra (Jesse Vincent)', url: 'https://github.com/obra/Superpowers', tipo: 'repo', anio: 2025, tags: ['harness'] },
	{ titulo: 'fusion-deck (panel multi-modelo)', autor: 'raydocs', url: 'https://github.com/raydocs/fusion-deck', tipo: 'repo', anio: 2026, tags: ['harness'] },
	{ titulo: 'token-lean (orquestación decisions-only)', autor: 'hurttlocker', url: 'https://github.com/hurttlocker/token-lean', tipo: 'repo', anio: 2026, tags: ['harness'] },
	{ titulo: 'graphify (knowledge graph del repo)', autor: 'Graphify Labs', url: 'https://github.com/Graphify-Labs/graphify', tipo: 'repo', anio: 2026, tags: ['harness'] },
	{ titulo: 'RTK (compresión de output de comandos)', autor: 'RTK AI', url: 'https://github.com/RTK-AI/rtk', tipo: 'repo', anio: 2026, tags: ['harness'] },
	{ titulo: 'Optimizing for cost and intelligence', autor: 'Anthropic', url: 'https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence', tipo: 'doc', anio: 2026, tags: ['harness'] },
];
