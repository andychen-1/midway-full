export { App }

import React from 'react'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'

import './app.css'

function App({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  const Layout = (pageContext.config as any)?.Layout || DefaultLayout
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Layout>{children}</Layout>
      </PageContextProvider>
    </React.StrictMode>
  )
}

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
