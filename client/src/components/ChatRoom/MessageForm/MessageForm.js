import { useState } from 'react'
import { Picker } from 'emoji-mart'
import { FiSend } from 'react-icons/fi'
import { GrEmoji } from 'react-icons/gr'
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    justify-content: space-between;
    height: 30px;
    border-radius: 5px;
  `;
const Input = styled.input`
    width: 100%;
    border-radius: 5px;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
`;

export const MessageForm = ({ username, sendMessage }) => {

  // состояния для текста сообщения и показа и скрытия эмодзи
  const [text, setText] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)

  // управление изменением текста
  const handleChangeText = (e) => {
    setText(e.target.value)
  }

  // показ/скрытие эмодзи
  const handleEmojiShow = () => {
    setShowEmoji((v) => !v)
  }

  // добавляем к тексту выбранный эмодзи
  const handleEmojiSelect = (e) => {
    setText((text) => (text += e.native))
  }

  // управление отправкой сообщения
  const handleSendMessage = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed) {
      sendMessage({ messageText: text, senderName: username })
      setText('')
    }
  }




  return (
    <>
      <Form onSubmit={handleSendMessage}>
          <Button onClick={handleEmojiShow}>
            <GrEmoji />
          </Button>
          <Input
            value={text}
            onChange={handleChangeText}
            type='text'
            placeholder='Message...'
          />
          <Button type='submit'>
            <FiSend />
          </Button>
      </Form>
      <div style={{ position: 'absolute', bottom: '30px'}}>
      {showEmoji && <Picker onSelect={handleEmojiSelect} emojiSize={20} />}
      </div>
    </>
  )
}