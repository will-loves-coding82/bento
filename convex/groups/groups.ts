import { mutation, query } from "convex/_generated/server";
import { v } from "convex/values";


export const getGroupById = query({
    args: { groupId: v.string() },
    handler: async (ctx, args) => {
        if (args.groupId == undefined) {
            return null
        }
        return await ctx.db
            .query("groups")
            .filter((q) => q.eq(q.field("_id"), args.groupId))
            .unique()
    },
});


export const getGroups = query({
    args: { ownerId: v.string() },
    handler: async (ctx, args) => {
        if (args.ownerId == undefined) {
            return []
        }
        return await ctx.db
            .query("groups")
            .filter((q) => q.eq(q.field("owner_id"), args.ownerId))
            .collect();
    },
});

export const createGroup = mutation({
    args: {
        ownerId: v.string(),
        name: v.string()
    },
    handler: async(ctx, args) => {
        const groupId =  await ctx.db
            .insert("groups", {
                owner_id: args.ownerId, 
                name: args.name,
                members: []
            })
        return groupId
    }
})