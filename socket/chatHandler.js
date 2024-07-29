const User = require('../models/User');
const Message = require('../models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined`);
    });

    socket.on('sendMessage', async ({ senderId, receiverId, content }) => {
      try {
        //console.log('Received sendMessage event:', { senderId, receiverId, content });

        if (!senderId || !receiverId || !content) {
            console.log('Missing senderId, receiverId, or content');
            return;
          }

        //console.log(`Attempting to send message from ${senderId} to ${receiverId}`);
        //console.log(`Message content: "${content}"`);
        
        const sender = await User.findOne({ username: senderId });
        if (!sender) {
          console.log(`Sender ${senderId} not found in database`);
          throw new Error('Sender not found');
        }

        //console.log(`Sender found: ${sender.username}`);

        if (!content || content.trim() === '') {
          throw new Error('Message content cannot be empty');
        }

        const message = new Message({
          sender: sender._id,
          content,
        });
        await message.save();

        //console.log(`Message saved: ${message}`);

        io.to(receiverId).emit('newMessage', {
          sender: senderId,
          content,
          timestamp: message.timestamp,
        });

        //console.log(`Message emitted to ${receiverId}`);
        
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('messageSendError', { error: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};