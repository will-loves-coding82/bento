// import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
// import Header from '../components/Header'
// import appCss from '../styles.css?url'
// import { Auth0Provider } from '@auth0/auth0-react'

// export const Route = createRootRoute({
//   head: () => ({
//     meta: [
//       {
//         charSet: 'utf-8',
//       },
//       {
//         name: 'viewport',
//         content: 'width=device-width, initial-scale=1',
//       },
//       {
//         title: 'Bento Task App',
//       },
//     ],
//     links: [
//       {
//         rel: 'stylesheet',
//         href: appCss,
//       },
//     ],
//   }),
//   shellComponent: RootDocument,
// })

// function RootDocument({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <HeadContent />
//       </head>

//        <Auth0Provider
//         domain={import.meta.env.VITE_AUTH0_DOMAIN}
//         clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
//         authorizationParams={{
//           redirect_uri: window.location.origin
//         }}
//       >
//         <body className="flex flex-col">
//           <Header />
//           <section className=" overflow-scroll">{children}</section>
//           <Scripts />
//         </body>
//       </Auth0Provider>
//     </html>
//   )
// }

/// <reference types="vite/client" />
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouteContext,
} from '@tanstack/react-router'
import * as React from 'react'
import { createServerFn } from '@tanstack/react-start'
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react'
import type { ConvexQueryClient } from '@convex-dev/react-query'
import type { QueryClient } from '@tanstack/react-query'
import appCss from '@/styles.css?url'
import { getToken } from '@/lib/auth-server'
import { authClient } from '@/lib/auth-client'
import Header from '@/components/Header'


// Get auth information for SSR using available cookies
const getAuth = createServerFn({ method: 'GET' }).handler(async () => {
  return await getToken()
})

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
  convexQueryClient: ConvexQueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  beforeLoad: async (ctx) => {
    const token = await getAuth()

    // all queries, mutations and actions through TanStack Query will be
    // authenticated during SSR if we have a valid token
    if (token) {
      // During SSR only (the only time serverHttpClient exists),
      // set the auth token to make HTTP queries with.
      ctx.context.convexQueryClient.serverHttpClient?.setAuth(token)
    }

    return {
      isAuthenticated: !!token,
      token,
    }
  },
  component: RootComponent,
})

function RootComponent() {
  const context = useRouteContext({ from: Route.id }) 
  return (
    <ConvexBetterAuthProvider
      client={context.convexQueryClient.convexClient}
      authClient={authClient}
      initialToken={context.token}
    >
      <RootDocument>
        <Header />
        <Outlet />
      </RootDocument>
    </ConvexBetterAuthProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-neutral-950 text-neutral-50">
        {children}
        <Scripts />
      </body>
    </html>
  )
}