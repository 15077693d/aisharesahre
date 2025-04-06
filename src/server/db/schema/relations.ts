import { relations } from "drizzle-orm";
import { accounts, prompts, sessions, users } from "./tables";

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  prompts: many(prompts),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const promptsRelations = relations(prompts, ({ one }) => ({
  user: one(users, { fields: [prompts.userId], references: [users.id] }),
}));
