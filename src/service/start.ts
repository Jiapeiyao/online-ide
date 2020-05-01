import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import webpackConfig from './webpack.config';

const websitePath = path.resolve(__dirname, 'website');
const projectPath = path.resolve(__dirname, 'project');
const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(websitePath));

app.post('/run', function (req: express.Request, res: express.Response) {
    fs.writeFileSync(path.resolve(projectPath, 'UserCode.tsx'), req.body.tsx, {
        encoding: 'utf-8'
    });
    webpack(webpackConfig, (err, stats) => {
        if (!stats.hasErrors() && stats.hash) {
            const { hash } = stats;
            const previewPath = path.resolve(websitePath, `preview.${hash}.js`);
            const script = fs.readFileSync(previewPath, {
                encoding: 'utf-8'
            });
            // console.log(script);
            res.json({ code: 200, hash, script });
            try {
                fs.unlinkSync(previewPath);
            } catch (error) {
                console.error(error);
            }
        } else {
            const message = err?.message || stats.toJson().errors || 'unknown error';
            res.json({ code: 500, message });
        }

    });
});

app.listen(8080);