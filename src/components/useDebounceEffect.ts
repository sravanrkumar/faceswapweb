import { useEffect, DependencyList } from 'react'

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: DependencyList | undefined = undefined,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      if (deps) {
        fn.apply(undefined, deps as [])
      } else {
        fn()
      }
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
