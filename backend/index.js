const { NODE_ENV } = process.env;

const pathEnv = NODE_ENV === 'production' ? '.env' : '.env.development';
require('dotenv').config({ path: pathEnv });

require('./database');

const { PORT = 3000 } = process.env;

require('./app').listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
