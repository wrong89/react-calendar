import { useEffect } from "react";

export function useDebounce(callback: () => void, delay: number) {
  // Переписать так, чтобы useEffect не использовался, так как переиспользовать такой хук будет сложно
  useEffect(() => {
    const timer = setTimeout(callback, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [callback, delay])
}
