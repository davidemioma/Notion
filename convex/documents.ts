import { v } from "convex/values";
import { Id, Doc } from "./_generated/dataModel";
import { query, mutation } from "./_generated/server";

export const getDocumentsByUserId = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorised");
    }

    const userId = identity.subject;

    const documents = await ctx.db.query("documents");

    return documents;
  },
});

export const createDocument = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorised");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      userId,
      title: args.title,
      parentDocument: args.parentDocument,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});
