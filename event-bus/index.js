import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    try {
        axios.post('http://localhost:3000/events', event);
        axios.post('http://localhost:3001/events', event);
        axios.post('http://localhost:3002/events', event);
        axios.post('http://localhost:3004/events', event);
    } catch (e) {
        console.log(e);
    }

    events.push(event);

    res.status(200).send({
        status: 'OK',
    });
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(3003, () => {
    console.log('listening on 3003');
});
