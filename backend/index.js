const { NODE_ENV } = process.env;

const pathEnv = NODE_ENV === 'production' ? '.env' : '.env.development';
require('dotenv').config({ path: pathEnv });

require('./database');

const os = require('os');
const cluster = require('cluster');

const numCPUs = os.cpus().length;

const { PORT = 3000 } = process.env;

require('./app').listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {

//   const { PORT = 3000 } = process.env;

//   require('./app').listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }
