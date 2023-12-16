export { View }

import { Suspense, lazy } from 'react'

import { Flex, Spin } from 'antd'

const ECommerce = lazy(() => import('./dashboards/ECommerce'))
const Sales = lazy(() => import('./dashboards/Sales'))

const views: Record<string, React.LazyExoticComponent<() => JSX.Element> | null | undefined> = {
  'e-commerce': ECommerce,
  sales: Sales
}

function Loading() {
  return (
    <Flex align="center" gap="middle">
      <Spin size="large" />
    </Flex>
  )
}

function View({ viewName }: { viewName: string }) {
  const Content = views[viewName]
  if (Content) {
    return (
      <Suspense fallback={<Loading />}>
        <Content></Content>
      </Suspense>
    )
  } else {
    return (
      <>
        <h1>View Render Error</h1>
        <h3>{`The view named ${viewName} does not exist`}</h3>
      </>
    )
  }
}
