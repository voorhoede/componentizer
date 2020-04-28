import * as React from 'react'

export default function useLocalStorage<T>(key: string, fallbackInitialState: T): [T, Function] {
  const [internalState, setInternalState] = React.useState<T>(() => {
    try {
      const data = localStorage.getItem(key)
      return JSON.parse(data || '') || fallbackInitialState
    } catch (error) {
      return fallbackInitialState
    }
  })

  function setState(value: T) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value)) 
    }

    setInternalState(value)
  }

  return [internalState, setState]
}
