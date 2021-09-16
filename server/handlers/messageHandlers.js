const { nanoid } = require('nanoid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db/messages.json')
const db = low(adapter)

db.defaults({
  messages: [
    
  ]
}).write()

module.exports = (io, socket) => {
  // обрабатываем запрос на получение сообщений
  const getMessages = () => {
    const messages = db.get('messages').value()
    // передаем сообщения пользователям, находящимся в комнате
    io.in(socket.roomId).emit('messages', messages)
  }

  // обрабатываем добавление сообщения
  const addMessage = (message) => {
    db.get('messages')
      .push({
        messageId: nanoid(8),
        createdAt: new Date(),
        roomId: socket.roomId,
        ...message
      })
      .write()
    // выполняем запрос на получение сообщений
    getMessages()
  }

  // обрабатываем удаление сообщение
  const removeMessage = (messageId) => {
    db.get('messages').remove({ messageId }).write()
    getMessages()
  }

  // регистрируем обработчики
  socket.on('message/get', getMessages)
  socket.on('message/add', addMessage)
  socket.on('message/remove', removeMessage)
}