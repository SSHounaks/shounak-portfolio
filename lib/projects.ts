export interface Project {
  name: string;
  description: string;
  technologies: string[] | string;
  image: string;
  video?: string;
  github?: string;
  link?: string;
  joke?: string;
}

export const projects: Project[] = [
  {
    name: 'ThothTech/OnTrack',
    description:
      'Ideated and built an Amazon SNS-based Email Service improving student satisfaction. Migrated legacy Angular 1.x to Angular 15. Championed documentation overhaul using Astro.js, adding onboarding guides and architecture diagrams that reduced dev ramp-up time. Fixed 6 long-standing frontend & backend bugs.',
    technologies: ['Angular 15', 'Ruby on Rails', 'Amazon SNS', 'Astro.js'],
    image: '/static/stacks.png',
    github: 'https://github.com/thoth-tech/ontrack',
  },
  {
    name: 'FasterXML/Jackson-Jr',
    description:
      'Engineered support for int[] deserialization and serialization of Java 17 & Groovy Records. Fixed issues regarding duplicate key detection for simple objects and BigDecimal support for floats. Implemented multi-level testing POC using Maven for different target JREs.',
    technologies: 'Java 17, Groovy, Maven, JUnit',
    image: '/am_blueprint.png',
    github: 'https://github.com/FasterXML/jackson-jr',
  },
  {
    name: 'SSHounaks/wallpapi',
    description:
      'An Omarchy-style wallpaper picker for GNOME Shell 50. Full-screen cinematic carousel with pixel-sheared parallelogram cards, scheme-aware light/dark wallpaper setting, live file watching, scroll navigation, preferences panel with subfolder support, and a disk-backed thumbnail cache for instant reopen. Ships with dependency-free unit tests, export-level coverage, and a custom lint pass.',
    technologies: ['GNOME Shell', 'GJS', 'GdkPixbuf', 'Deno', 'Make'],
    image: '/wallpapi.png',
    video: '/wallpapi.webm',
    github: 'https://github.com/SSHounaks/wallpapi',
    link: 'https://extensions.gnome.org/extension/10991/wallpapi/',
  },
  {
    name: 'SSHounaks/awsome',
    description:
      'Go-based AWS resource enumerator that emits versioned JSON-lines snapshots of (node, edge) records for EC2, VPC, Security Groups and more. Snapshots load idempotently into Neo4j, power a Deno-served React Flow SPA with diagram, findings, scan jobs, and Bitbucket-style snapshot drift diffs with CloudTrail attribution, plus natural-language chat and an MCP server for AI agents.',
    technologies: ['Go', 'AWS SDK v2', 'Neo4j', 'Deno', 'React Flow', 'LocalStack', 'MCP', 'Docker'],
    image: '/awsome.png',
    github: 'https://github.com/SSHounaks/awsome',
  },
  {
    name: 'SSHounaks/s3-viewer',
    description:
      'A VTuber platform built on a file explorer web app with a Deno/Hono backend and Next.js frontend that browses local filesystems or S3 buckets. Browse folders with a lazy-loaded tree, virtualized file list, multi-select clipboard, undoable operations, typed search, and drag-and-drop. Media toolkit covers audio/video redaction with an ffmpeg timeline editor (waveform/filmstrip, segment cut/mask, SSE job progress), GIF making, and exports. Plus 3D model loading with animation, streaming with scene layers, and live stream storage.',
    technologies: ['Deno', 'Hono', 'AWS SDK v3', 'Next.js', 'React 19', 'Tailwind CSS', 'FFmpeg', 'Transcription', 'Model Usage', '3D Animation', 'Streaming'],
    image: '/s3-viewer.jpeg',
    video: '/s3-viewer.mp4',
    github: 'https://github.com/SSHounaks/s3-viewer',
  },
  {
    name: 'KoLlama - Kotlin Local Harness',
    description:
      'A Kotlin harness for running Ollama local models with tool use and memory. Registers callable tools the model can invoke mid-conversation, persists conversation memory across sessions, and orchestrates streaming responses from local models — all offline, no cloud dependency.',
    technologies: ['Kotlin', 'Ollama', 'Tool Use', 'Local LLM', 'Memory'],
    image: '/ollama-harness.png',
    joke: 'Took 8 minutes to write 60 tokens. Not as good as Opus. 😂🤣',
  },
];

export function techList(technologies: string[] | string): string[] {
  if (Array.isArray(technologies)) return technologies;
  return technologies
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}
