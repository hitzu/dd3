'use strict';
require('custom-env').env('development');
import { dbCreateConnection } from './src/orm/dbCreateConnection';
const app = require('./app');

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

(async () => {
  await dbCreateConnection();
})();
