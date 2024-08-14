import { z } from "zod";

// Schema for creating a new note
export const CreateNoteSchema = z.object({
	title: z.string().min(1, "Title is required"),
	fav: z.boolean().optional(), // optional, default value false can be set in use-case if necessary
	color: z.number().optional(), // optional, can default in use-case
	file: z.string().nullable().optional(), // optional and nullable
	user_id: z.string().uuid("Invalid user ID format")
});

// Schema for updating an existing note
export const UpdateNoteSchema = z.object({
	id: z.string().uuid("Invalid note ID format"),
	title: z.string().min(1, "Title is required").optional(), // optional for partial updates
	fav: z.boolean().optional(),
	color: z.number().optional(),
	file: z.string().nullable().optional(),
	user_id: z.string().uuid("Invalid user ID format")
});

// Schema for validating note ID in request parameters
export const NoteIdSchema = z.object({
	id: z.string().uuid("Invalid note ID format")
});

// Schema for validating user ID in request parameters
export const UserIdSchema = z.object({
	user_id: z.string().uuid("Invalid user ID format")
});

// Schema for validating file uploads
export const fileUploadSchema = z.object({
	filename: z.string().min(1, "Filename is required"),
	mimetype: z.enum([
		"image/jpeg",
		"image/png",
		"text/plain", // For .txt files
		"application/pdf" // For .pdf files
	])
});

// Schema for validating the retrieval of a file by filename
export const GetFileSchema = z.object({
	filename: z.string().min(1, "Filename is required")
});

// Schema for validating the retrieval of notes by title and user ID in query strings
export const GetNoteByTitleSchema = z.object({
	title: z.string().min(1, "Title is required"),
	user_id: z.string().uuid("Invalid user ID format")
});
