import { useRef, useEffect } from 'react'
// стили
import { ListGroup } from 'react-bootstrap'
// компонент
import { MessageListItem } from './MessageListItem'

const listStyles = {
  height: '80vh',
  border: '1px solid rgba(0,0,0,.4)',
  borderRadius: '4px',
  overflow: 'auto'
}

// передаем массив сообщений и функцию для удаления сообщений
export const MessageList = ({ messages, removeMessage }) => {

  const messagesEndRef = useRef(null)
  
  // плавная прокрутка, выполняемая при изменении массива сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [messages])

  return (
    <>
      <div style={listStyles}>
        {messages.map((msg) => (
          <MessageListItem
            key={msg.messageId}
            msg={msg}
            removeMessage={removeMessage}
          />
        ))}
        <span ref={messagesEndRef}></span>
      </div>
    </>
  )
}