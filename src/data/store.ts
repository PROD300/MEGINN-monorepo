import { useSyncExternalStore } from 'react'

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
