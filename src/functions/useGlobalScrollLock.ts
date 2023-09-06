import { useScrollLock } from '@vueuse/core'

const scrollLock = useScrollLock(document.documentElement)

export const useGlobalScrollLock = () => {
  return scrollLock
}
