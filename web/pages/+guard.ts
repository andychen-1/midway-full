export { guard }

import type { GuardAsync } from 'vike/types'
import { render } from 'vike/abort'

const guard: GuardAsync = async (pageContext): ReturnType<GuardAsync> => {
  if (pageContext.urlPathname !== '/login') {
    if (!pageContext.user) {
      throw render('/login')
    }

    if (pageContext.urlPathname === '/') {
      throw render('/dashboards')
    }
  }
}
