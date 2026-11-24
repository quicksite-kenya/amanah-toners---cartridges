import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT) || 3000;

app.set('trust proxy', 1);

const clientDir = path.resolve(__dirname, 'dist', 'client');
app.use(express.static(clientDir));
app.use(ssrHandler);

app.listen(port, '0.0.0.0', () => {
  console.log(`Amanah server listening on http://0.0.0.0:${port}`);
});
