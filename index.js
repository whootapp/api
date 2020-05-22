const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const port = process.env.PORT || 3000;

/* Routes */

const userRoutes = require('./api/routes/users');
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})