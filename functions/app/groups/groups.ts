// import { query } from "convex/_generated/server";
// import { v } from "convex/values";

// export const getGroups = query({
//     args: {ownerId: v.string()},
//     handler: async(ctx, args)=> {
//         return await ctx.db.query("groups").filter(q => q.eq(q.field("owner_id"), args.ownerId)).collect()
//     }
// })