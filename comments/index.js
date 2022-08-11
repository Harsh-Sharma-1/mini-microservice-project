import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const commentsByPostId = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    res.status(200).json(commentsByPostId[id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const id = req.params.id;
    const { content } = req.body;
    const comment = {
        id: randomBytes(4).toString('hex'),
        content,
        status: 'pending',
    };
    const comments = commentsByPostId[id] || [];
    comments.push(comment);
    commentsByPostId[id] = comments;

    await axios.post('http://localhost:3003/events', {
        type: 'CommentCreated',
        data: {
            ...comment,
            postId: id,
        },
    });

    res.status(201).json(comments);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find((comment) => {
            return comment.id === id;
        });
        comment.status = status;

        await axios.post('http://localhost:3003/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                content,
                status,
            },
        });
    }

    res.send({});
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});
