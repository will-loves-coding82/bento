import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    roles: defineTable({
        userId: v.id("user"),
        role: v.union(
            v.literal("parent"),
            v.literal("kid"),
        ),
    }).index("by_user", ["userId"]),
    groups: defineTable({
        owner_id: v.string(),
        name: v.union(v.string(), v.null()),
        members: v.array(v.object({
            _id: v.string(),
            displayName: v.string(),
        })),
    }),
    tasks: defineTable({
        title: v.string(),
        description: v.string(),
        due_date: v.number(),
        is_complete: v.boolean(),
        group_id: v.id("groups")
    }),
    goals: defineTable({
        groupId: v.id("groups"),
        memberId: v.id("users"),
        title: v.string(),
        description: v.optional(v.string()),
        targetValue: v.number(),    // e.g. 10
        currentValue: v.number(),   // progress so far
        startDate: v.number(),      // ms since epoch
        endDate: v.number(),        // ms since epoch
    })
        .index("by_group", ["groupId"])
        .index("by_member", ["memberId"])
        .index("by_group_member", ["groupId", "memberId"]),
})