const NEWSLETTER_ID = 'e9fb84c2-ebfc-11ed-8424-fbce0ce9d7bc'

export const useNewsletter = () => {
  const createScript = () => {
    const $script = document.createElement('script')
    $script.setAttribute('src', `https://eocampaign1.com/form/${NEWSLETTER_ID}.js`)
    $script.setAttribute('async', '')
    $script.setAttribute('data-form', NEWSLETTER_ID)
    document.head.appendChild($script)
  }

  const init = () => {
    if (!document.cookie.includes(NEWSLETTER_ID))
      createScript()
  }

  return {
    init,
  }
}
