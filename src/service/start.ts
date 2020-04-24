import express from 'express';

const app = express();
app.use(express.json());

app.get('/', function (req: express.Request, res: express.Response) {
    res.send('GET request to homepage')
})

app.listen(8080);