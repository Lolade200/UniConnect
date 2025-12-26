require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const reactionRoutes = require('./routes/reaction.routes');
const messageRoutes = require('./routes/message.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts', commentRoutes); // nested under posts
app.use('/api/posts', reactionRoutes); // nested under posts
app.use('/api/messages', messageRoutes);

module.exports = app;
