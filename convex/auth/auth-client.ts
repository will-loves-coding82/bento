import { createAuthClient } from 'better-auth/react'
import { convexClient } from '@convex-dev/better-auth/client/plugins'
import { polarClient } from "@polar-sh/better-auth/client"; 
import { adminClient } from "better-auth/client/plugins"

/**
 * Authentication client instance configured with Convex, Polar, and Admin plugins.
 * 
 * This client is initialized with multiple authentication providers to handle
 * authentication logic across different services.
 * 
 * @remarks
 * - Uses Convex for backend integration
 * - Uses Polar for payment/subscription handling
 * - Uses Admin for administrative operations
 */
export const authClient = createAuthClient({
  plugins: [convexClient(), polarClient(), adminClient()],
})