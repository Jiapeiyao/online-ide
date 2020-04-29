import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const router = app.router;

app.use(bodyParser.json({ type: 'application/json' })).use(router);
// app.use(app. static(path.resolve(__dirname, 'website')));

app.post('/', function (req: express.Request, res: express.Response) {
    res.send('GET request to homepage')
})

app.listen(8080);