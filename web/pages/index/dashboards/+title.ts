import type { PageContext } from "~/renderer/types"

export default (pageContext: PageContext) => {
  const { routeParams } = pageContext
  if (routeParams?.view === 'sales') {
    return 'Midway Full App - dashboards/sales'
  } else {
    return 'Midway Full App - dashboards/e-commerce'
  }
}