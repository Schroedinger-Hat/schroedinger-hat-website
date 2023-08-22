import type { SetupContext } from 'vue'
import { computed, unref } from 'vue'
import type { MaybeRef } from '@vueuse/core'

type Component = 'a' | 'button' | 'router-link'

type Attributes = SetupContext['attrs'] & {
  to?: { name: string }
  href?: string
}

export const useCtaComponent = (attrs: MaybeRef<Attributes>) => {
  const attributes = unref(attrs)

  const component = computed((): Component => {
    switch (true) {
      case ('to' in attributes && attributes.to?.name !== undefined):
        return 'router-link'
      case ('href' in attributes && attributes.href !== undefined):
        return 'a'
      default:
        return 'button'
    }
  })

  const bindings = computed((): Attributes => ({ ...attributes }))

  return {
    bindings,
    component,
  }
}
