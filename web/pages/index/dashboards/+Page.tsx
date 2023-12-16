export default Page

import { View } from '~/views'
import { usePageContext } from '~/renderer/usePageContext'

function Page() {
  const pageContext = usePageContext()
  const { view }= pageContext.routeParams as any
  return (
    <>
      <View viewName={view}></View>
    </>
  )
}
