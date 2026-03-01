import { createAuthClient } from 'better-auth/react'
import { convexClient } from '@convex-dev/better-auth/client/plugins'
import { polarClient } from "@polar-sh/better-auth/client"; 
 
import { adminClient } from "better-auth/client/plugins"

/**
 * Better Auth client instance for interacting with the Better Auth server 
 * from your client, configured with Convex, Polar, and Admin plugins.
 * 
 * @remarks
 * - Uses Convex for backend integration
 * - Uses Polar for payment/subscription handling
 * - Uses Admin for administrative operations
 */
export const authClient = createAuthClient({
  baseURL: process.env.SITE_URL!,
  plugins: [convexClient(), polarClient(), adminClient()],
})