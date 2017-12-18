import * as http from 'http';
import * as debug from 'debug';

import Server from './server';

debug('flairsheet:server');

/* Setup port the server listens on */
const port = normalizePort(process.env.PORT || 3000);
Server.set('port', port);
console.log(`Server listening on port ${port}`);
console.log('Connected to address: http://localhost:3000/');

/* Creates server and start listening */
const server = http.createServer(Server);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Handles port input.
 * @param val port to be normalized
 */
function normalizePort(val: number|string): number|string|boolean {
  const normalizedPort = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(normalizedPort)) {
    return val;
  } else if (normalizedPort >= 0) {
    return normalizedPort;
  } else {
    return false;
  }
}

/**
 * Boilerplate code to handle errors when server runs.
 * @param error the error to be handled
 */
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Boilerplate code to handle listening to the server.
 */
function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
