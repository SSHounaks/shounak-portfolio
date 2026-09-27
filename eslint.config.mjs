import { defineConfig, globalIgnores } from 'eslint/config'
import next from 'eslint-config-next'

export default defineConfig([
  ...next,
  {
    rules: {
      // The terminal aesthetic renders `//` as literal on-screen text by design
      // (e.g. `// SYSLOG v2.0`, `// COLLECTION v1.0`). The rule cannot tell that
      // apart from a misplaced JSX comment, so it is off by design here.
      'react/jsx-no-comment-textnodes': 'off',
    },
  },
  {
    // Vendored shadcn primitives, not currently mounted. `carousel` exposes the
    // embla instance through state and `sidebar` randomises a skeleton width;
    // both are upstream patterns that trip the React 19 compiler rules. Warn
    // rather than error so a real regression in first-party code still fails.
    files: ['components/ui/**'],
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
  globalIgnores([
    '.next/**',
    '.velite/**',
    'node_modules/**',
    'out/**',
    'next-env.d.ts',
  ]),
])
