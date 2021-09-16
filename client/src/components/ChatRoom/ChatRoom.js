import { MessageForm } from "./MessageForm/MessageForm"
import { MessageList } from "./MessageList/MessageList"
import { useChat } from '../../hooks/useChat'
import { UserList } from './UserList/UserList'
import { useLocalStorage } from "../../hooks/useLocalStorage"

export function ChatRoom() {
  const { users, messages, sendMessage, removeMessage } = useChat(window.location.pathname)
  const [username] = useLocalStorage('username')

  const path = window.location.pathname.slice(1)

  return (
    <>
      <h1>Room: {path}</h1>
      <UserList users={users} />
      <MessageList messages={messages} removeMessage={removeMessage} />
      <MessageForm username={username}  sendMessage={sendMessage} />
    </>
  )
}
