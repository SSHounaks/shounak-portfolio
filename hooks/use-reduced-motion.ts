import * as React from 'react'

const query = '(prefers-reduced-motion: reduce)'

function subscribe(onStoreChange: () => void) {
  const mql = window.matchMedia(query)
  mql.addEventListener('change', onStoreChange)
  return () => mql.removeEventListener('change', onStoreChange)
}

export function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
