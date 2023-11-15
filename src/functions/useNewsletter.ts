export const useNewsletter = () => {
  const createScript = () => {
    const $script = document.createElement('script')
    $script.setAttribute('src', 'https://eocampaign1.com/form/e9fb84c2-ebfc-11ed-8424-fbce0ce9d7bc.js')
    $script.setAttribute('async', '')
    $script.setAttribute('data-form', 'e9fb84c2-ebfc-11ed-8424-fbce0ce9d7bc')
    document.head.appendChild($script)
  }

  const init = () => {
    if (!document.cookie.includes('e9fb84c2-ebfc-11ed-8424-fbce0ce9d7bc'))
      createScript()
  }

  return {
    init,
  }
}
