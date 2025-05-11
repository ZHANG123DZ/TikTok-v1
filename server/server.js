require('module-alias/register');
const express = require('express');

const router = require('@/routes');
const cors = require('cors');

const notFoundHandler = require('@/middleware/notFoundHandler');
const errorsHandler = require('@/middleware/errorHandler');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.static('public'));
app.use(express.json());
app.use('/api/v1', router);
app.use(notFoundHandler);
app.use(errorsHandler);

app.listen(3030, () => {
  console.log('hello');
});
