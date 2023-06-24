import type { ComputedRef, SetupContext } from 'vue'
import { computed, unref } from 'vue'
import type { MaybeRef } from '@vueuse/core'

type Component = 'a' | 'button' | 'router-link'

interface CtaComponent {
  component: ComputedRef<Component>
  bindings: ComputedRef<SetupContext['attrs']>
}

export const useCtaComponent = (attrs: MaybeRef<SetupContext['attrs']>): CtaComponent => {
  const attributes = unref(attrs)

  const component = computed(() => {
    switch (true) {
      case 'to' in attributes:
        return 'router-link'
      case 'href' in attributes:
        return 'a'
      default:
        return 'button'
    }
  })

  const bindings = computed((): SetupContext['attrs'] => ({ ...attributes }))

  return {
    bindings,
    component,
  }
}
