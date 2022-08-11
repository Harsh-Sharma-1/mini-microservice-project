import express from 'express';
import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

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

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id,
        title,
    };

    await axios.post('http://localhost:3003/events', {
        type: 'PostCreated',
        data: {
            id,
            title,
        },
    });

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});

app.listen(3000, () => {
    console.log('listening on 3000');
});
