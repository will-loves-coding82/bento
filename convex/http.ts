import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./auth";

/**
 * HTTP router instance for handling Convex HTTP endpoints.
 * @type {ReturnType<typeof httpRouter>}
 */
const http = httpRouter();

authComponent.registerRoutes(http, createAuth);

export default http;