export { getDocumentMetaInfo, setDocumentMetaInfo }

import type { PageContext } from './types'

const DEFAULT_TITLE = 'Midway Full App'
const DEFAULT_DESCRIPTION = 'App using Midway + Vite + Vike + React'

function getDocumentMetaInfo(pageContext: PageContext) {
  const { title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION } =
    pageContext.config ?? pageContext

  return {
    title: typeof title === 'function' ? title(pageContext) : title,
    description: typeof description === 'function' ? description(pageContext) : description
  }
}

function setDocumentMetaInfo(pageContext: PageContext):void {
  if (typeof window === 'undefined') return 
  const { title, description } = getDocumentMetaInfo(pageContext)

  document.title = title;
  const nodes = document.getElementsByName("description")
  if (nodes && nodes[0]) {
    (nodes[0] as HTMLMetaElement).content = description;
  }
}
