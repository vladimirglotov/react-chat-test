import { useState, useRef } from 'react'
// для маршрутизации используется react-router-dom
import { Link } from 'react-router-dom'
// наш хук
import { useLocalStorage } from '../../hooks/useLocalStorage'
import styled from 'styled-components'


const Wrapper = styled.div`
display: flex;
justify-content: center;
flex-direction: column; 
margin-bottom: 10px;
`
const HomeLink = styled(Link)`
display: flex;
width: 200px;
height: 20px;
border: 1px solid grey;
border-radius: 5px;
justify-content: center;
align-items: center;
text-decoration: none;
margin: 20px auto;
background-color: green;
color: white;
`

export function Home() {
  // создаем и записываем в локальное хранилище имя пользователя
  // или извлекаем его из хранилища
  const [username, setUsername] = useLocalStorage('username', 'John')
  // локальное состояние для комнаты
  const [roomId, setRoomId] = useState('default')
  const linkRef = useRef(null)

  // обрабатываем изменение имени пользователя
  const handleChangeName = (e) => {
    setUsername(e.target.value)
  }

  // обрабатываем изменение комнаты
  const handleChangeRoom = (e) => {
    setRoomId(e.target.value)
  }

  // имитируем отправку формы
  const handleSubmit = (e) => {
    e.preventDefault()
    // выполняем нажатие кнопки
    linkRef.current.click()
  }

  const trimmed = username.trim()


  return (
    <>
      <h1>React Chat</h1>
      <form
        style={{ maxWidth: '320px', margin: '0 auto' }}
        onSubmit={handleSubmit}
      >
        <Wrapper>
          <label>Name:</label>
          <input value={username} onChange={handleChangeName} />
        </Wrapper>
        <Wrapper>
          <label>Room:</label>
          <input value={roomId} onInput={handleChangeRoom}>
            {/* <option value='free'>Free</option>
          <option value='job'>
            Job
          </option> */}
          </input>
        </Wrapper>
        {trimmed && (
          <HomeLink to={`/${roomId}`} ref={linkRef}>
            Chat
          </HomeLink>
        )}
      </form>
    </>
  )
}
