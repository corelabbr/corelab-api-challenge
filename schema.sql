-- Cria o banco de dados, se não existir
CREATE DATABASE IF NOT EXISTS todo_app 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

-- Seleciona o banco de dados criado
USE todo_app;

-- Cria a tabela "notes" para armazenar as tarefas/itens da lista
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  color VARCHAR(20) DEFAULT '#FFFFFF',
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Dados de exemplo (opcional)
INSERT INTO notes (title, content, color, is_favorite) VALUES
('Tarefa Exemplo 1', 'Conteúdo da tarefa exemplo 1', '#E2FFFA', false),
('Tarefa Exemplo 2', 'Conteúdo da tarefa exemplo 2', '#FFE2C3', true);
