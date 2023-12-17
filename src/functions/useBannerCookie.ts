import { useLocalStorage } from '@vueuse/core'
import { onMounted } from 'vue'

interface BannerCookie {
  dismissed: boolean
  dismissedOn?: Date
}

export const useBannerCookie = () => {
  const banner = useLocalStorage<BannerCookie>('banner', { dismissed: false, dismissedOn: undefined }, { mergeDefaults: true })

  const handleDismiss = () => {
    banner.value.dismissed = true
    banner.value.dismissedOn = new Date()
  }

  const haveSevenDaysPassed = () => {
    const dismissedOn = new Date(banner.value.dismissedOn as Date)
    const now = new Date()
    const diff = Math.abs(now.getTime() - dismissedOn.getTime())
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
    return diffDays >= 7
  }

  onMounted(() => {
    if (banner.value.dismissed && haveSevenDaysPassed())
      banner.value.dismissed = false
  })

  return {
    banner,
    handleDismiss,
  }
}
