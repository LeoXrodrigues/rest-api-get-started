const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let livros = [];
let user = [];
let idLivro = 1;
let idUser = 1;

app.get('/', (req, res) => {
    res.json({ mensagem: 'Hello World' });
});

app.post('/livros', (req, res) => {
    const novoLivro = { id: idLivro++, ...req.body };
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

app.get('/livros', (req, res) => {
    res.json(livros);
});

app.get('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id == req.params.id);
    if (livro) {
        res.json(livro);
    } else {
        res.status(404).json({ mensagem: 'Livro nao encontrado' });
    }
});

app.put('/livros/:id', (req, res) => {
    const index = livros.findIndex(l => l.id == req.params.id);
    if (index !== -1) {
        livros[index] = { id: parseInt(req.params.id), ...req.body };
        res.json(livros[index]);
    } else {
        res.status(404).json({ mensagem: 'Livro nao encontrado' });
    }
});

app.delete('/livros/:id', (req, res) => {
    livros = livros.filter(l => l.id != req.params.id);
    res.status(204).send();
});

app.post('/user', (req, res) => {
    const novoUser = { id: idUser++, ...req.body };
    user.push(novoUser);
    res.status(201).json(novoUser);
});

app.get('/user', (req, res) => {
    res.json(user);
});

app.get('/user/:id', (req, res) => {
    const user = user.find(u => u.id == req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ mensagem: 'Usuario nao encontrado' });
    }
});

app.put('/user/:id', (req, res) => {
    const index = user.findIndex(u => u.id == req.params.id);
    if (index !== -1) {
        user[index] = { id: parseInt(req.params.id), ...req.body };
        res.json(user[index]);
    } else {
        res.status(404).json({ mensagem: 'Usuario nao encontrado' });
    }
});

app.delete('/user/:id', (req, res) => {
    user = user.filter(u => u.id != req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});