export { onRenderClient }

// import { hydrateRoot } from 'react-dom/client'
// import { App } from './App'
// import type { PageContextClient } from './types'

// This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
// async function render(pageContext: PageContextClient) {
//   const { Page, pageProps } = pageContext
//   if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined')
//   const root = document.getElementById('react-root')
//   if (!root) throw new Error('DOM element #react-root not found')
//   hydrateRoot(
//     root,
//     <App pageContext={pageContext}>
//       <Page {...pageProps} />
//     </App>
//   )
// }

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vike.dev/clientRouting */

import ReactDOM from 'react-dom/client'
import type { OnRenderClientAsync } from 'vike/types'
import { App } from './App'
import { setDocumentMetaInfo } from './utils'

let root: ReactDOM.Root
const onRenderClient: OnRenderClientAsync = async (
  pageContext
): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps } = pageContext
  const page = (
    <App pageContext={pageContext}>
      <Page {...pageProps} />
    </App>
  )
  const container = document.getElementById('react-root')!
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page)
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container)
    }
    root.render(page)
  }
  setDocumentMetaInfo(pageContext)
}
