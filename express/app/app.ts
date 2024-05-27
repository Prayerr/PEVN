import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';

import container from '../infra/inversify/container.config';
import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';

const invServer = new InversifyExpressServer(container);

invServer.setConfig((app) => {
  app.use(express.json());
  app.use(cookieParser());

  app.use(express.static(path.resolve(import.meta.dirname, '..', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, '..', 'dist', 'index.html'));
  });
});

const app = invServer.build();

export default app;
