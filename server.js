// Fixed npm express & body-parser
const express = require('express');

const app = express();
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
// const io = require('socket.io')(http);
const mongoose = require('mongoose');
const cors = require('cors');


const config = require('./app/config');
const authRouter = require('./app/routes/auth.route');
const tasksRouter = require('./app/routes/tasks.route');
const usersRouter = require('./app/routes/users.route');
const authMiddleware = require('./app/middlewares/auth.middleware');
const errorHandler = require('./app/middlewares/error.middleware');

// p
mongoose.connect(config.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
    console.log('MONGODB HAS BEEN CONNECTED');
});

module.exports = { main: db };

app.use(cors());
app.use(bodyParser.json({
    limit: '50mb',
    extended: true,
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
}));


// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

app.use('/auth', authRouter);
app.use('/api/tasks', authMiddleware.checkAuth, tasksRouter);
app.use('/api/users', authMiddleware.checkAuth, usersRouter);

app.use(errorHandler);

http.listen(config.PORT, () => {
    console.log('Example app listening on port 5000!');
});
