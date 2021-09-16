const users = {
}

module.exports = (io, socket) => {

  const getUsers = () => {
    io.in(socket.roomId).emit('users', users)
  }

  // обрабатываем добавление пользователя
  const addUser = ({ username, userId }) => {
    // проверяем, имеется ли пользователь в БД
    if (!users[userId]) {
      // если не имеется, добавляем его в БД
      users[userId] = { username, online: true }
    } else {
      // если имеется, меняем его статус на онлайн
      users[userId].online = true
    }
    // выполняем запрос на получение пользователей
    getUsers()
  }

  // обрабатываем удаление пользователя
  const removeUser = (userId) => {
    if (users[userId]) {
      users[userId].online = false
    }
    getUsers()
  }

  // регистрируем обработчики
  socket.on('user/get', getUsers)
  socket.on('user/add', addUser)
  socket.on('user/leave', removeUser)
}