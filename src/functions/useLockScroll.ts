import { useScrollLock } from '@vueuse/core'

export const useLockScroll = () => {
  const scrollLock = useScrollLock(document.documentElement)

  return {
    scrollLock,
  }
}
