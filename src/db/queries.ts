export const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY
  );
`;

export const createNoteTableQuery = `
  CREATE TABLE IF NOT EXISTS notes (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    color VARCHAR(255) NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`;

export const createIndexQuery = `
  CREATE INDEX title_index ON notes(title);
  CREATE INDEX content_index ON notes(content);
  CREATE INDEX color_index ON notes(color);
`;
