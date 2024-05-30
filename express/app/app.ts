import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

import { fileURLToPath } from 'node:url';
import container from '../infra/inversify/container.config';
import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const invServer = new InversifyExpressServer(container);

invServer.setConfig((app) => {
  app.use(express.json());
  app.use(cookieParser());

  app.use(express.static(path.resolve(__dirname, '..', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
});

const app = invServer.build();

export default app;
