export { onRenderHtml }

import ReactDOMServer from 'react-dom/server'
import type { PageContextServer } from './types'

import { App } from './App'
import { getDocumentMetaInfo } from './utils'
import favicon from './favicon.svg'

import artTemplate from 'art-template'

function getRenderData(pageContext: any, mergeData: any) {
  return Object.assign(getDocumentMetaInfo(pageContext), mergeData)
}

async function onRenderHtml(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined')

  const pageHtml = ReactDOMServer.renderToString(
    <App pageContext={pageContext}>
      <Page {...pageProps} />
    </App>
  )

  // See https://vike.dev/head
  const renderData = getRenderData(pageContext, { pageHtml, favicon })

  pageContext.title = renderData.title
  pageContext.description = renderData.description

  const documentHtml = artTemplate.render(
    `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" href="{{favicon}}" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="{{description}}" />
      <title>{{title}}</title>
      <link rel="stylesheet" href="/antd.min.css">
      <link rel="stylesheet" href="/nprogress.css">
    </head>
    <body>
      <script src="/nprogress.js"></script>
      <div id="react-root">{{@pageHtml}}</div>
    </body>
  </html>`,
    renderData
  )

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    }
  }
}
