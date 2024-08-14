import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp
} from "drizzle-orm/pg-core";

// Definição da tabela 'user'
export const user = pgTable("user", {
	id: text("id").notNull().primaryKey(),
	session_id: text("session_id").notNull(),
	created_at: timestamp("created_at").notNull()
});

// Definição da tabela 'note'
export const note = pgTable("note", {
	id: text("id").notNull().primaryKey(),
	title: text("title").notNull(),
	fav: boolean("fav").notNull(),
	color: integer("color").notNull(),
	file: text("file"),
	created_at: timestamp("created_at").notNull(),
	user_id: text("user_id")
		.references(() => user.id)
		.notNull() // Chave estrangeira referenciando 'user'
});

// Definindo as relações
export const userRelations = relations(user, ({ many }) => ({
	notes: many(note) // Um 'user' tem muitas 'notes'
}));

export const noteRelations = relations(note, ({ one }) => ({
	user: one(user) // Uma 'note' pertence a um 'user'
}));
