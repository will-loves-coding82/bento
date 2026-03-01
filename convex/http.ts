/**
 * Initializes and configures the HTTP router with authentication routes.
 * 
 * @remarks
 * This module sets up the HTTP router by registering authentication-related routes
 * through the auth component. The router is configured to handle HTTP requests
 * and delegate authentication logic to the auth component.
 *
 */

import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth/auth";

const http = httpRouter();
authComponent.registerRoutes(http, createAuth);

export default http;