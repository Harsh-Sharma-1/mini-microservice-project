import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';

const commentsByPostId = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    res.status(200).json(commentsByPostId[id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    const { content } = req.body;
    const comment = {
        id: randomBytes(4).toString('hex'),
        content,
    };

    const comments = commentsByPostId[id] || [];
    comments.push(comment);
    commentsByPostId[id] = comments;
    res.status(201).json(comments);
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});
