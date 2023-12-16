export default {
  // passToClient: ['pageProps', 'urlPathname', 'csrfToken', 'routeParams'],
  passToClient: ['pageProps', 'title', 'description', 'csrfToken', 'routeParams'],
  meta: {
    // Create new config 'Layout'
    Layout: {
      env: { server: true, client: true }
    },
    title: {
      env: { server: true, client: true }
    },
    description: {
      env: { server: true, client: true }
    }
  },
  clientRouting: true,
  hydrationCanBeAborted: true,
  title: 'Midway Full App',
  description: 'App using Midway + Vite + Vike + React + Antd',
}
