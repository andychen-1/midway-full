export { route }

import type { RouteSync } from 'vike/types'
import { resolveRoute } from 'vike/routing'


const route: RouteSync = (pageContext): ReturnType<RouteSync> => {

  let result = resolveRoute('/dashboards', pageContext.urlPathname)
  if (result.match) {
    result.routeParams.view = 'e-commerce'
    return result
  }

  result =  resolveRoute('/dashboards/@view', pageContext.urlPathname)
  if (result.match) {
    return result;
  }

  return false
}