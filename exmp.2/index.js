'use strict';

import express from 'express';
import userRoutes from './routes/userroute.js';
import postRoutes from './routes/postroute.js';

const app = express();

// Listen on port 3000
const server = app.listen(3000, () => {
  console.log('Express started on port 3000');
});

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

export default server;