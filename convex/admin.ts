import { mutation } from "./_generated/server";
import { v } from "convex/values";

// const { data: newUser, error } = await authClient.admin.createUser({
//     email: "user@example.com", // required
//     password: "some-secure-password", // required
//     name: "James Smith", // required
//     role: "user",
//     data: { customField: "customValue" },
// });

export const createUser= mutation({
    args: {
        email: v.string(),
        password: v.string(),
        name: v.string(),
        role: v.string(),

    },
    handler: async(ctx, args) => {
        
    }
})