require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Verifica a conexão
db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

// Cria a tabela (caso não exista)
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    color VARCHAR(20) DEFAULT '#FFFFFF',
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;
db.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log('Tabela notes criada ou já existente.');
});

// Rota GET - Retorna todos os notes
app.get('/api/notes', (req, res) => {
    const sql = 'SELECT * FROM notes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao buscar notas.' });
        }
        res.json(results);
    });
});

// Rota POST - Cria um novo note
app.post('/api/notes', (req, res) => {
    const { title, content, color } = req.body;
    const sql = 'INSERT INTO notes (title, content, color) VALUES (?, ?, ?)';
    db.query(sql, [title, content, color], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao criar nota.' });
        }
        res.json({
            id: result.insertId,
            title,
            content,
            color,
            is_favorite: false
        });
    });
});

// Rota PUT - Atualiza um note
app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, color, is_favorite } = req.body;
    const sql = `
    UPDATE notes
    SET title = ?, content = ?, color = ?, is_favorite = ?
    WHERE id = ?
  `;
    db.query(sql, [title, content, color, is_favorite, id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao atualizar nota.' });
        }
        res.json({ message: 'Nota atualizada com sucesso!' });
    });
});

// Rota DELETE - Deleta um note
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.query(sql, [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao deletar nota.' });
        }
        res.json({ message: 'Nota deletada com sucesso!' });
    });
});

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



