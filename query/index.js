import express from 'express';
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
    res.status(200).json(posts[req.params.id]);
});

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = {
            id,
            title,
            comments: [],
        };
    }

    if (type === 'CommentCreated') {
        const { id, content, status, postId } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status });
        posts[postId] = post;
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const { comments } = posts[postId];
        const comment = comments.find((comment) => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
};

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

app.listen(3002, async () => {
    console.log('listening on 3002');
    const res = await axios.get('http://localhost:3003/events');
    for (let event of res.data) {
        console.log('Processing event:', event.type);
        handleEvent(event.type, event.data);
    }
});
