import { createServer } from 'http';
import { server_secrets } from './config/index.js';
import { logger } from './utils/logger.js';
import { version } from '../package.json';

const express = require('express');
const loaders = require('./loaders');

async function startServer() {
  const app = express();

  // ! ➡️ Create Server
  const httpServer = createServer(app);

  // ! Start Express
  await loaders({ expressApp: app });

  // ! ➡️ Server Secrets Object literal
  const config = server_secrets;

  // ! ➡️ Start Server
  httpServer.listen(config.port, () => {
    logger.info(`🚀 Server version ${version} is running 🛼`);
    logger.info(
      `📶 Service::03 http://${config.host}:${config.port} againt corsOrigin ${config.corsOrigin}`
    );
  });
}

startServer();
