import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import memfs from 'memfs'; 

type ReadFile = (path: string, callback: (err: Error | undefined | null, contents: Buffer) => void) => void;
type ReadFileSync = (path: string) => Buffer;

const websitePath = path.resolve(__dirname, 'website');
const projectPath = path.resolve(__dirname, 'project');
const codePath = path.resolve(projectPath, 'UserCode.tsx');
const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.static(websitePath));

app.post('/run', run);

function run(req: express.Request, res: express.Response) {
    const codeBuffer: Buffer = Buffer.from(req.body.tsx as string);
    const compiler = webpack(webpackConfig);
    
    // use custom io for webpack
    const readFile: ReadFile = (filePath, callback) => {
        if (filePath === codePath) {
            callback(null, codeBuffer);
        } else {
            fs.readFile(filePath, callback);
        }
    };
    const readFileSync: ReadFileSync = filePath => (filePath === codePath) ? codeBuffer : fs.readFileSync(filePath);

    compiler.inputFileSystem = {
        readFile, readFileSync, readlink: fs.readlink, readlinkSync: fs.readlinkSync,
        stat: fs.stat, statSync: fs.statSync,
    };

    const mfs = memfs.createFsFromVolume(new memfs.Volume());
    compiler.outputFileSystem = {
        join: path.join, mkdir: mfs.mkdir, mkdirp: mfs.mkdirp,
        rmdir: mfs.rmdir, unlink: mfs.unlink, writeFile: mfs.writeFile,
    };

    compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
            const message = err?.message || stats.toJson().errors || 'unknown error';
            res.json({ code: 500, message });
        } else {
            const { hash } = stats;
            const previewPath = path.resolve(websitePath, `preview.${hash}.js`);
            const script = mfs.readFileSync(previewPath, { encoding: 'utf-8' });
            res.json({ code: 200, hash, script });
        } 
    });
}

app.listen(8080);