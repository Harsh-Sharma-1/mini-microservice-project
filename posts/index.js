import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json(posts[id]);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id,
        title,
    };
    res.status(201).send(posts[id]);
});

app.listen(3000);
