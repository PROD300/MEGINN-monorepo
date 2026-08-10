import { useSyncExternalStore } from 'react'

/* [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
   Generic in-memory pub-sub used by every store in data/*.ts. In a real
   product this state would live behind an API/indexer/RPC; here it's just
   a module-level variable that resets on page reload. */
export function createStore<T>(initial: T) {
  let state = initial
  const listeners = new Set<() => void>()

  function getState() {
    return state
  }

  function setState(updater: T | ((prev: T) => T)) {
    state = typeof updater === 'function' ? (updater as (prev: T) => T)(state) : updater
    listeners.forEach(listener => listener())
  }

  function subscribe(listener: () => void) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  function useStore() {
    return useSyncExternalStore(subscribe, getState)
  }

  return { getState, setState, subscribe, useStore }
}
