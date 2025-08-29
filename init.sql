-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Adicionando a verificação "IF NOT EXISTS" para o tipo, para evitar erros em reinicializações
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
        CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_status NOT NULL DEFAULT 'pending',
    color VARCHAR(20) NOT NULL DEFAULT 'blue',
    is_favorite BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_is_favorite ON tasks(is_favorite);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Removendo e recriando o trigger para garantir que ele não cause erro se já existir
DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE
    ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (apenas se a tabela estiver vazia)
INSERT INTO tasks (title, description, status, color, is_favorite)
SELECT 'Setup development environment', 'Configure Node.js, PostgreSQL, and Docker', 'completed', 'green', true WHERE NOT EXISTS (SELECT 1 FROM tasks);
INSERT INTO tasks (title, description, status, color, is_favorite)
SELECT 'Design database schema', 'Create entity relationships and migrations', 'completed', 'blue', false WHERE NOT EXISTS (SELECT 1 FROM tasks);
INSERT INTO tasks (title, description, status, color, is_favorite)
SELECT 'Implement authentication', 'Add JWT-based authentication system', 'in_progress', 'yellow', true WHERE NOT EXISTS (SELECT 1 FROM tasks);
INSERT INTO tasks (title, description, status, color, is_favorite)
SELECT 'Create task management API', 'Build CRUD operations for tasks', 'in_progress', 'red', false WHERE NOT EXISTS (SELECT 1 FROM tasks);