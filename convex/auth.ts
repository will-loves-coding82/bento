import { betterAuth } from 'better-auth/minimal'
import { createClient } from '@convex-dev/better-auth'
import { convex } from '@convex-dev/better-auth/plugins'
import authConfig from './auth.config'
import { components } from './_generated/api'
import { query } from './_generated/server'
import type { GenericCtx } from '@convex-dev/better-auth'
import type { DataModel } from './_generated/dataModel'
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth"; 
import { Polar } from "@polar-sh/sdk"; 
import { admin } from 'better-auth/plugins'
import { ConvexError } from 'convex/values'

const siteUrl = process.env.SITE_URL!

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth)

const polarClient = new Polar({ 
    accessToken: process.env.SANDBOX_POLAR_ACCESS_TOKEN, 
    // Use 'sandbox' if you're using the Polar Sandbox environment
    // Remember that access tokens, products, etc. are completely separated between environments.
    // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
    server: 'sandbox'
}); 

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    // Configure simple, non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    socialProviders: {
        // google: {
        //     prompt: "select_account consent",
        //     accessType: "offline",
        //     clientId: process.env.GOOGLE_OAUTH_KEY!,
        //     clientSecret: process.env.GOOGLE_OAUTH_SECRET!
        // }
    },
    plugins: [
      // The Convex plugin is required for Convex compatibility
      convex({ authConfig }),
      // admin(),
      polar({
        client: polarClient,
        createCustomerOnSignUp: true,
        use:[
            checkout({
                products: [
                    {
                        productId: process.env.POLAR_PRODUCT_ID!,
                        slug: "pro"
                    }
                ],
                successUrl: "https://localhost:3000/subscriptions/success?checkout_id={CHECKOUT_ID}"
            }),
            portal(),
            usage(),
            webhooks({ 
                secret: process.env.POLAR_WEBHOOK_SECRET!,
            }),
        ]
      })
    ],
  })
}


/**
 * Retrieves the currently authenticated user.
 * @returns {Promise<User | null>} A promise that resolves to the current user object if authenticated, or null if no user is authenticated.
 */
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new ConvexError("Unauthenticated call to getCurrentUser");
    }
    
    try {
      return await authComponent.getAuthUser(ctx)
    } catch {
      return null
    }
  },
})

